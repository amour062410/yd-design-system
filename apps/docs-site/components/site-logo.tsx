import Image from "next/image";
import Link from "next/link";
import { cn } from "@yd-ds/ui";

/** Source asset is 36×38 — keep display size ≤38px for best sharpness */
const MARK_WIDTH = 36;
const MARK_HEIGHT = 38;

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
  showWordmark?: boolean;
  variant?: "header" | "sidebar" | "hero";
};

export function SiteLogo({
  className,
  priority = false,
  showWordmark = true,
  variant = "header",
}: SiteLogoProps) {
  const isHero = variant === "hero";
  const isSidebar = variant === "sidebar";

  const markClass = cn(
    "shrink-0 object-contain",
    isHero ? "h-[38px] w-[36px]" : "h-8 w-[30px] sm:h-9 sm:w-[34px]"
  );

  return (
    <Link
      href="/"
      aria-label="YD Design System 首页"
      className={cn(
        "group inline-flex shrink-0 items-center gap-3 rounded-md outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isHero && "gap-4",
        className
      )}
    >
      <Image
        src="/logo-mark.png"
        alt=""
        width={MARK_WIDTH}
        height={MARK_HEIGHT}
        priority={priority}
        unoptimized
        className={markClass}
      />

      {showWordmark ? (
        <span
          className={cn(
            "flex min-w-0 flex-col",
            isSidebar && "hidden xl:flex"
          )}
        >
          <span
            className={cn(
              "leading-tight tracking-tight",
              isHero
                ? "text-xl font-semibold sm:text-2xl"
                : "text-sm font-semibold"
            )}
          >
            <span className="text-foreground">YD</span>
            <span className="font-normal text-muted-foreground"> 设计系统</span>
          </span>
          {!isSidebar ? (
            <span
              className={cn(
                "text-muted-foreground",
                isHero
                  ? "mt-1.5 text-xs font-medium tracking-wide"
                  : "mt-0.5 text-[10px] font-medium tracking-[0.12em]"
              )}
            >
              云盯企业级设计系统
            </span>
          ) : null}
        </span>
      ) : null}
    </Link>
  );
}
