"use client";

import { useEffect, useRef, useState } from "react";
import Arrow from "@/components/ui/Arrow";
import { useBooking } from "@/lib/booking-context";

type HeroMode = "sequence" | "static";
type VideoState = "false" | "true" | "pending" | "failed";

const POSTER_SRC = "/ce-hero-poster-v2.webp";

/** Horizontal camera drift, applied at every breakpoint. */
const FOCAL_X: Array<[number, number]> = [
  [0, 53],
  [0.25, 51.6],
  [0.5, 50.2],
  [0.75, 49],
  [1, 48],
];

/** Vertical camera drift, applied from 1050px up where the framing is wide. */
const FOCAL_Y: Array<[number, number]> = [
  [0, 38],
  [0.35, 35.5],
  [0.7, 32.5],
  [1, 30.5],
];

function trackedValue(track: Array<[number, number]>, progress: number) {
  for (let index = 1; index < track.length; index += 1) {
    const previous = track[index - 1];
    const next = track[index];
    if (progress <= next[0]) {
      const local = (progress - previous[0]) / (next[0] - previous[0]);
      const eased = local * local * (3 - 2 * local);
      return previous[1] + (next[1] - previous[1]) * eased;
    }
  }
  return track[track.length - 1][1];
}

function rangeProgress(progress: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}

function smoothProgress(progress: number) {
  return progress * progress * (3 - 2 * progress);
}

export default function HeroSequence() {
  const { openBooking } = useBooking();
  const sequenceRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroMode, setHeroMode] = useState<HeroMode>("sequence");
  const [videoState, setVideoState] = useState<VideoState>("false");
  const [posterReady, setPosterReady] = useState(false);

  // Stage 1's entrance is held until the poster has painted, so the headline
  // never animates in over the flat placeholder field on a slow connection.
  useEffect(() => {
    const poster = new window.Image();
    const settle = () => setPosterReady(true);
    poster.onload = settle;
    poster.onerror = settle;
    poster.src = POSTER_SRC;
    if (poster.complete) settle();
    const failsafe = window.setTimeout(settle, 2500);
    return () => {
      poster.onload = null;
      poster.onerror = null;
      window.clearTimeout(failsafe);
    };
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      if (motionQuery.matches) setHeroMode("static");
    };
    syncMotionPreference();
    motionQuery.addEventListener("change", syncMotionPreference);
    return () => motionQuery.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    const sequence = sequenceRef.current;
    const video = videoRef.current;
    if (!sequence || !video) return;

    if (heroMode === "static") {
      video.pause();
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      setHeroMode("static");
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 1050px)");

    let target = 0;
    let current = 0;
    let frame = 0;
    let lastTime = performance.now();
    let ready = false;
    let priming = false;
    let handoffTimer = 0;
    let unlockTimer = 0;
    let watchdog = 0;

    const setVisuals = (progress: number) => {
      // Stage windows match docs/ux/homepage-v2.md §6:
      // hold → stage1 exit → stage2 enter → hold → stage2 exit → release frame.
      const primaryExit = smoothProgress(rangeProgress(progress, 0.2, 0.34));
      const secondaryLead = smoothProgress(rangeProgress(progress, 0.3, 0.42));
      const secondaryFollow = smoothProgress(rangeProgress(progress, 0.34, 0.46));
      const secondaryExit = smoothProgress(rangeProgress(progress, 0.7, 0.8));
      const bottomExit = smoothProgress(rangeProgress(progress, 0.94, 1));
      const cueExit = smoothProgress(rangeProgress(progress, 0.02, 0.1));
      const secondaryHold = 1 - secondaryExit;

      sequence.style.setProperty("--v2-progress", progress.toFixed(4));
      sequence.style.setProperty("--v2-focal-x", `${trackedValue(FOCAL_X, progress).toFixed(2)}%`);
      sequence.style.setProperty("--v2-focal-y", `${trackedValue(FOCAL_Y, progress).toFixed(2)}%`);

      sequence.style.setProperty("--v2-primary-opacity", (1 - primaryExit).toFixed(4));
      sequence.style.setProperty("--v2-primary-y", `${(-primaryExit * 2.6).toFixed(3)}rem`);
      sequence.style.setProperty("--v2-primary-blur", `${(primaryExit * 8).toFixed(2)}px`);

      sequence.style.setProperty("--v2-secondary-opacity", secondaryHold.toFixed(4));
      sequence.style.setProperty(
        "--v2-secondary-blur",
        `${((1 - secondaryLead) * 8 + secondaryExit * 5).toFixed(2)}px`,
      );
      sequence.style.setProperty(
        "--v2-secondary-eyebrow-opacity",
        (secondaryLead * secondaryHold).toFixed(4),
      );
      sequence.style.setProperty(
        "--v2-secondary-one-opacity",
        (secondaryLead * secondaryHold).toFixed(4),
      );
      sequence.style.setProperty(
        "--v2-secondary-two-opacity",
        (secondaryFollow * secondaryHold).toFixed(4),
      );
      sequence.style.setProperty(
        "--v2-secondary-one-y",
        `${((1 - secondaryLead) * 3 - secondaryExit * 1.9).toFixed(3)}rem`,
      );
      sequence.style.setProperty(
        "--v2-secondary-two-y",
        `${((1 - secondaryFollow) * 3.8 - secondaryExit * 1.9).toFixed(3)}rem`,
      );

      sequence.style.setProperty("--v2-bottom-opacity", (1 - bottomExit).toFixed(4));
      sequence.style.setProperty("--v2-cue-label-opacity", (1 - cueExit).toFixed(4));
    };

    const render = (time: number) => {
      const delta = Math.min(64, time - lastTime);
      lastTime = time;
      current += (target - current) * (1 - Math.exp(-delta * 0.0095));

      if (Math.abs(target - current) < 0.0001) current = target;
      setVisuals(current);

      if (ready && Number.isFinite(video.duration)) {
        const finalFrame = Math.max(0, video.duration - 1 / 24);
        const desiredTime = current * finalFrame;
        if (Math.abs(video.currentTime - desiredTime) > 1 / 60) {
          video.currentTime = desiredTime;
        }
      }

      if (Math.abs(target - current) > 0.0001) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const update = () => {
      const bounds = sequence.getBoundingClientRect();
      const distance = Math.max(1, bounds.height - window.innerHeight);
      target = Math.min(1, Math.max(0, -bounds.top / distance));
      if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(render);
      }
    };

    // A dead video plane must never leave the visitor inside a tall scroll
    // track over a frozen frame, so the sequence collapses to the static
    // composition — but only while the sequence is still untouched, so a late
    // failure can never yank the page out from under an active scroll.
    const collapse = () => {
      setVideoState("failed");
      if (current > 0.04 || target > 0.04) return;
      setHeroMode("static");
    };

    const handoffToScroll = () => {
      if (ready) return;
      window.clearTimeout(handoffTimer);
      video.pause();
      ready = true;
      priming = false;
      setVideoState("true");
      update();
    };

    const prime = () => {
      if (ready || priming) return;
      priming = true;
      video.muted = true;
      video.playsInline = true;

      const playback = video.play();
      handoffTimer = window.setTimeout(handoffToScroll, 160);
      if (playback) {
        playback.catch(() => {
          // Autoplay refusal alone is survivable: frame-accurate seeking still
          // works, and the touch-unlock path below recovers iOS.
          setVideoState((state) => (state === "true" ? state : "pending"));
        });
      }
    };

    const unlockOnTouch = () => {
      if (!ready) {
        prime();
        return;
      }
      const playback = video.play();
      unlockTimer = window.setTimeout(() => {
        video.pause();
        update();
      }, 80);
      if (playback) playback.catch(() => {});
    };

    video.pause();
    video.addEventListener("loadedmetadata", prime, { once: true });
    video.addEventListener("error", collapse);
    window.addEventListener("pointerdown", unlockOnTouch, { passive: true, once: true });
    window.addEventListener("touchstart", unlockOnTouch, { passive: true, once: true });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    desktopQuery.addEventListener("change", update);

    watchdog = window.setTimeout(() => {
      if (video.readyState < 2 || !Number.isFinite(video.duration)) collapse();
    }, 9000);

    if (video.readyState >= 1) prime();
    update();

    return () => {
      window.clearTimeout(handoffTimer);
      window.clearTimeout(unlockTimer);
      window.clearTimeout(watchdog);
      if (frame) cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", prime);
      video.removeEventListener("error", collapse);
      window.removeEventListener("pointerdown", unlockOnTouch);
      window.removeEventListener("touchstart", unlockOnTouch);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      desktopQuery.removeEventListener("change", update);
      video.pause();
    };
  }, [heroMode]);

  return (
    <div
      ref={sequenceRef}
      className="v2-hero-sequence"
      id="top"
      data-hero-mode={heroMode}
      data-video-ready={videoState}
      data-poster-ready={posterReady ? "true" : "false"}
    >
      <noscript>
        {/* Without scripting there is no scrub, so the hero resolves to the
            static composition rather than a frozen frame in a tall track. */}
        <style>{`
          .v2-hero-sequence{height:100svh!important}
          .v2-hero__stage--secondary,.v2-hero__cue{display:none!important}
          .v2-hero__anim{opacity:1!important;animation:none!important;transform:none!important}
        `}</style>
      </noscript>

      <section className="v2-hero v2-field--media" aria-label="C|E Clothier introduction">
        <video
          ref={videoRef}
          className="v2-hero__video"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          poster={POSTER_SRC}
          aria-label="A C|E Clothier client moving in a bespoke pinstripe suit."
        >
          <source src="/ce-hero-scroll-v2.mp4" type="video/mp4" />
        </video>
        <div className="v2-hero__shade" aria-hidden="true" />
        <div className="v2-hero__ring" aria-hidden="true" />

        <div className="v2-hero__rail" aria-hidden="true">
          <p>Private tailoring</p>
          <span />
          <p>Toronto · Est. 2014</p>
        </div>

        <div className="v2-hero__content">
          <div className="v2-hero__stages">
            <div className="v2-hero__stage v2-hero__stage--primary">
              <p className="eyebrow v2-hero__eyebrow v2-hero__anim v2-hero__anim--eyebrow">
                C|E Clothier · Toronto
              </p>
              <h1 className="v2-hero__tagline">
                <span className="v2-hero__tagline-line v2-hero__anim v2-hero__anim--line-1">
                  Driven by <em>passion,</em>
                </span>
                <span className="v2-hero__tagline-line v2-hero__anim v2-hero__anim--line-2">
                  delivered with <em>style.</em>
                </span>
              </h1>
            </div>

            {heroMode === "sequence" && (
              <div className="v2-hero__stage v2-hero__stage--secondary">
                <p className="eyebrow v2-hero__eyebrow">The C|E standard</p>
                <h2>
                  <span className="v2-hero__word-line">Made to be</span>{" "}
                  <span className="v2-hero__word-line v2-hero__word-line--indent">
                    remembered.
                  </span>
                </h2>
              </div>
            )}
          </div>

          <div className="v2-hero__bottom">
            <div className="v2-hero__bottom-inner v2-hero__anim v2-hero__anim--bottom">
              <p className="v2-hero__support">
                Bespoke garments for men who understand that style is more than what you wear.
              </p>
              {/* One target, one composition: the label and the circle are a
                  single link so the page's primary action is never a guess. */}
              <button type="button" className="v2-hero__cta" onClick={openBooking}>
                <span className="v2-hero__cta-label">Book a private fitting</span>
                <span className="v2-hero__cta-circle" aria-hidden="true">
                  <Arrow diagonal />
                </span>
              </button>
            </div>
          </div>
        </div>

        <a href="#story" className="v2-hero__cue">
          <span className="v2-hero__cue-label">Scroll to play</span>
          <i aria-hidden="true">
            <b />
          </i>
        </a>
      </section>
    </div>
  );
}
