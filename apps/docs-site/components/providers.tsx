"use client";

import { ThemeProvider } from "@yd-ds/themes";
import { MessageProvider } from "@yd-ds/ui/message";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system">
      <MessageProvider>{children}</MessageProvider>
    </ThemeProvider>
  );
}
