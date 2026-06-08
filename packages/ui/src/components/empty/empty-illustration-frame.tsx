import type { ReactNode } from "react";
import { EMPTY_ILLUSTRATION_COLORS, EMPTY_ILLUSTRATION_SIZE } from "./empty-illustration-colors";

export function EmptyIllustrationFrame({
  children,
  accent = "blue",
  showDecor = true,
}: {
  children: ReactNode;
  accent?: "blue" | "green";
  showDecor?: boolean;
}) {
  const accentColor =
    accent === "green"
      ? EMPTY_ILLUSTRATION_COLORS.green
      : EMPTY_ILLUSTRATION_COLORS.blue;

  return (
    <svg
      width={EMPTY_ILLUSTRATION_SIZE}
      height={EMPTY_ILLUSTRATION_SIZE}
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {children}
      {showDecor ? (
        <path
          d="M48 118 C44 124 42 128 48 134 C54 128 52 124 48 118 Z"
          fill={accentColor}
        />
      ) : null}
    </svg>
  );
}
