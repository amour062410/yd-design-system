import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Input",
  description: "Input Design System Showcase Page",
};

export default function InputLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
