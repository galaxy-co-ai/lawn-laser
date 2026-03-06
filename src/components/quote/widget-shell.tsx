"use client";

import { useEffect, useRef, useCallback } from "react";
import { QuoteWidget } from "./quote-widget";

type Props = {
  preselectedServices?: string[];
  preselectedArea?: string;
  accentColor?: string;
};

export function WidgetShell({
  preselectedServices,
  preselectedArea,
  accentColor,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastHeight = useRef(0);

  const postHeight = useCallback(() => {
    if (!containerRef.current) return;
    const height = containerRef.current.scrollHeight;
    if (height !== lastHeight.current) {
      lastHeight.current = height;
      window.parent.postMessage(
        { type: "lawn-laser:resize", height },
        "*"
      );
    }
  }, []);

  useEffect(() => {
    // Apply accent color override via CSS custom property
    if (accentColor && /^#[0-9a-fA-F]{6}$/.test(accentColor)) {
      document.documentElement.style.setProperty("--primary", accentColor);
    }

    // Observe size changes and post height to parent
    const isIframe = window.self !== window.top;
    if (!isIframe) return;

    // Initial height post
    postHeight();

    // ResizeObserver for dynamic content changes
    const observer = new ResizeObserver(postHeight);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Also post on any DOM mutations (step changes, loading states)
    const mutationObserver = new MutationObserver(postHeight);
    if (containerRef.current) {
      mutationObserver.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    // Notify parent that widget is ready
    window.parent.postMessage({ type: "lawn-laser:ready" }, "*");

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [accentColor, postHeight]);

  function handleQuoteComplete(data: {
    totalPrice: number;
    itemCount: number;
  }) {
    window.parent.postMessage(
      { type: "lawn-laser:quote-complete", ...data },
      "*"
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen items-center justify-center bg-background p-4"
    >
      <QuoteWidget
        preselectedServices={preselectedServices}
        preselectedArea={preselectedArea}
        onQuoteComplete={handleQuoteComplete}
      />
    </div>
  );
}
