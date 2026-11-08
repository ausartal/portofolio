"use client";

import { useEffect, useState } from "react";

/** True once the preloader has lifted (or immediately if there is none). */
export function useIntroReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!document.documentElement.dataset.intro) {
      queueMicrotask(() => setReady(true));
      return;
    }
    const on = () => setReady(true);
    window.addEventListener("intro:done", on, { once: true });
    return () => window.removeEventListener("intro:done", on);
  }, []);
  return ready;
}
