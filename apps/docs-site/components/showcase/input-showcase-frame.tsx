"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@yd-ds/ui";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { Card } from "@/components/showcase/section";
import {
  ShowcaseThemeContext,
  useShowcaseTheme,
} from "@/components/showcase/showcase-theme";

export function InputShowcaseFrame({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const cached = window.localStorage.getItem("showcase-theme");
    if (cached === "dark") setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("showcase-theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleDark = () => setDark((prev) => !prev);

  return (
    <ShowcaseThemeContext.Provider value={{ dark, toggleDark }}>
      <div className="w-full space-y-12">
        <ComponentDocHeader
          title={title}
          description={subtitle}
          action={
            <button
              type="button"
              onClick={toggleDark}
              className="btn-primary px-4 py-1.5 text-[13px] font-medium"
            >
              {dark ? "浅色模式" : "深色模式"}
            </button>
          }
        />
        <div className="flex w-full flex-col gap-12">{children}</div>
      </div>
    </ShowcaseThemeContext.Provider>
  );
}

export function DarkModePreviewCard({
  children,
  className,
  hint = "切换右上角按钮预览深色主题下的组件表现",
}: {
  children: React.ReactNode;
  className?: string;
  hint?: string;
}) {
  const { dark } = useShowcaseTheme();

  return (
    <Card dark className={cn(dark && "dark", className)}>
      <p className="mb-6 text-[14px] leading-relaxed text-text-secondary">{hint}</p>
      {children}
    </Card>
  );
}
