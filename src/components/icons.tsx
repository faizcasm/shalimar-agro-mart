import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function IconFlask(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3h6M10 3v6.2L4.9 18a2.6 2.6 0 0 0 2.3 3.9h9.6a2.6 2.6 0 0 0 2.3-3.9L14 9.2V3" />
      <path d="M7.4 14.5h9.2" />
    </svg>
  );
}

export function IconLeaf(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 9-9 4.5 0 7 3 7 3s-1 8-7 10a7 7 0 0 1-2 .6" />
      <path d="M4 21c2.5-4.5 6-7.5 10-9.5" />
    </svg>
  );
}

export function IconApple(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 8.4c-1.2-1.6-3-2.4-4.7-2.1C5.2 6.8 4 8.7 4 11c0 4.2 3.1 8.6 5.5 8.6.9 0 1.6-.4 2.5-.4s1.6.4 2.5.4C16.9 19.6 20 15.2 20 11c0-2.3-1.2-4.2-3.3-4.7-1.7-.3-3.5.5-4.7 2.1Z" />
      <path d="M12 8.4V6.2A3.2 3.2 0 0 0 14.6 3M12 6.6c1.4 0 2.8-.7 3.6-1.8" />
    </svg>
  );
}

export function IconSack(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3h6l-1.4 3.1a3 3 0 0 0-.6.1H11a3 3 0 0 0-.6-.1L9 3Z" />
      <path d="M10 6.4c-2.4 1.4-4 4-4 7.1C6 17.1 8.7 21 12 21s6-3.9 6-7.5c0-3.1-1.6-5.7-4-7.1" />
      <path d="M8.5 13.5h7" />
    </svg>
  );
}

export function IconHandshake(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m11 17 2 2a2 2 0 0 0 3-3" />
      <path d="m14 14 2.5 2.5a2 2 0 0 0 3-3L14.5 9" />
      <path d="m18 12 1.5 1.5a2 2 0 0 0 3-3L17 5.5a4 4 0 0 0-5.7 0L9.5 7.3a2.6 2.6 0 0 0 3.7 3.7l1.3-1.3" />
      <path d="m3 14 4-4a2.8 2.8 0 0 1 4 0" />
      <path d="m3 14 2.5 5M7 17l-2 2M11 19l-1.5 1.5" />
    </svg>
  );
}

export function IconChart(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="m7.5 15 3.5-4 3 2.5L20 7" />
      <path d="M20 7h-4M20 7v4" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.6 3.5h2.1l1.5 3.7-1.9 1.4a12 12 0 0 0 5.6 5.6l1.4-1.9 3.7 1.5v2.1a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.8 7 7.1 5a1.6 1.6 0 0 0 1.8 0l7.1-5" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s6.5-5.7 6.5-10.4A6.5 6.5 0 0 0 5.5 10.6C5.5 15.3 12 21 12 21Z" />
      <circle cx="12" cy="10.4" r="2.5" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2V12l3.2 1.9" />
    </svg>
  );
}

export function IconStar({
  filled = true,
  ...props
}: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path d="m12 3.4 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.6l5.9-.9L12 3.4Z" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2.2} {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function IconArrow(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function IconQuote(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M9.4 5.2c-3.4 1.5-5.6 4.7-5.6 8.5 0 3.1 1.7 5.1 4.2 5.1 2.2 0 3.9-1.6 3.9-3.8 0-2.1-1.5-3.6-3.4-3.6-.4 0-.9.1-1.1.2.4-1.7 2-3.4 4-4.4l-2-2ZM19 5.2c-3.4 1.5-5.6 4.7-5.6 8.5 0 3.1 1.7 5.1 4.2 5.1 2.2 0 3.9-1.6 3.9-3.8 0-2.1-1.5-3.6-3.4-3.6-.4 0-.9.1-1.1.2.4-1.7 2-3.4 4-4.4l-2-2Z" />
    </svg>
  );
}

export function IconWhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.54 3.76 1.48 5.32L2 22.4l5.4-1.6a9.9 9.9 0 0 0 4.64 1.16h.01c5.43 0 9.84-4.4 9.84-9.84C21.9 6.4 17.48 2 12.04 2Zm0 17.96h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.07.91.9-3-.2-.31a8.14 8.14 0 0 1-1.25-4.37c0-4.52 3.68-8.19 8.2-8.19 2.19 0 4.25.86 5.8 2.4a8.14 8.14 0 0 1 2.4 5.8c0 4.52-3.68 8.19-8.2 8.19Zm4.5-6.14c-.25-.13-1.46-.72-1.69-.8-.22-.09-.39-.13-.55.12-.16.25-.63.8-.77.96-.14.16-.28.19-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.45-1.37-1.7-.14-.24-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.15-1.17-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function IconTelegram(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.54 1.74z" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconSprout(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21v-7" />
      <path d="M12 14c0-3 2.2-5.4 5.4-5.6.2 3.2-2.2 5.6-5.4 5.6Z" />
      <path d="M12 15.5C9.2 15.3 7 13.2 7 10c2.9.1 5 2.4 5 5.5Z" />
      <path d="M7.5 21h9" />
    </svg>
  );
}

export const serviceIcons = {
  flask: IconFlask,
  leaf: IconLeaf,
  apple: IconApple,
  sack: IconSack,
  handshake: IconHandshake,
  chart: IconChart,
} as const;
