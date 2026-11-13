"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** HTML tag to render */
  as?: ElementType;
  /** Trigger earlier/later than the viewport centre */
  margin?: string;
};

/**
 * Adds `.is-visible` when the element scrolls into view.
 * Falls back to "always visible" if IntersectionObserver is unavailable.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  margin = "0px 0px -60px 0px",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // Deferred so the effect body never sets state synchronously.
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: margin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [margin]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
