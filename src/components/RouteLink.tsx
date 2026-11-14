"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type RouteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

/**
 * Link to a route, optionally at a `#hash` target.
 *
 * - Cross-route: a Next `<Link>` — client-side navigation that lands on the
 *   target section.
 * - Same-route (or a plain `#hash` href): a native fragment anchor, so the
 *   browser scrolls even when the URL already carries that hash (the router
 *   no-ops on identical URLs).
 */
export default function RouteLink({ href, children, ...rest }: RouteLinkProps) {
  const pathname = usePathname();

  // Plain in-page fragment — always a native anchor.
  if (!href.startsWith("/")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  const hashIndex = href.indexOf("#");
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex);

  if (hash && path === pathname) {
    return (
      <a href={hash} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
