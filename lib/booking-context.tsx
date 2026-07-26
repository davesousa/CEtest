"use client";

import {
  createContext,
  FormEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type BookingContextValue = {
  openBooking: () => void;
  closeBooking: () => void;
  bookingOpen: boolean;
  sent: boolean;
  submitBooking: (event: FormEvent<HTMLFormElement>) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const openBooking = useCallback(() => {
    setSent(false);
    setBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setBookingOpen(false);
  }, []);

  const submitBooking = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("locked", bookingOpen);
    return () => document.body.classList.remove("locked");
  }, [bookingOpen]);

  const value = useMemo(
    () => ({ openBooking, closeBooking, bookingOpen, sent, submitBooking }),
    [openBooking, closeBooking, bookingOpen, sent, submitBooking],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}
