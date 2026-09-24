"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent, type AnalyticsPayload } from "@/lib/analytics";

/** Meldet ein Ereignis einmal beim Anzeigen einer Seite (z. B. view_item). */
export function TrackView({ event, payload }: { event: AnalyticsEvent; payload: AnalyticsPayload }) {
  useEffect(() => {
    track(event, payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);
  return null;
}
