/**
 * The numbered editorial spine used by every major /v2 section (01–04).
 * The ordinal is a decorative wayfinding device, so it is kept out of the
 * accessible name while the label itself is announced normally.
 */
export default function SpineEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <p className="eyebrow v2-spine">
      <span className="v2-spine__index" aria-hidden="true">
        {index}
      </span>
      <span className="v2-spine__rule" aria-hidden="true" />
      <span className="v2-spine__label">{label}</span>
    </p>
  );
}
