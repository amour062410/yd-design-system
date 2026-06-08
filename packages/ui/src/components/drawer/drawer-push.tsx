"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DrawerPlacement } from "./drawer.types";

type PushOffsets = Record<DrawerPlacement, number>;

const defaultOffsets: PushOffsets = {
  right: 0,
  left: 0,
  top: 0,
  bottom: 0,
};

type DrawerPushContextValue = {
  setPushOffset: (placement: DrawerPlacement, pixels: number) => void;
};

const DrawerPushContext = createContext<DrawerPushContextValue | null>(null);

export function useDrawerPushContext() {
  return useContext(DrawerPushContext);
}

/** 包裹页面主内容，配合 Drawer `push` 实现推开布局 */
export function DrawerPushContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [offsets, setOffsets] = useState<PushOffsets>(defaultOffsets);

  const setPushOffset = useCallback((placement: DrawerPlacement, pixels: number) => {
    setOffsets((prev) => {
      if (prev[placement] === pixels) return prev;
      return { ...prev, [placement]: pixels };
    });
  }, []);

  const value = useMemo(() => ({ setPushOffset }), [setPushOffset]);

  const style = useMemo(
    () => ({
      marginRight: offsets.right ? `${offsets.right}px` : undefined,
      marginLeft: offsets.left ? `${offsets.left}px` : undefined,
      marginTop: offsets.top ? `${offsets.top}px` : undefined,
      marginBottom: offsets.bottom ? `${offsets.bottom}px` : undefined,
      transition: `margin var(--drawer-animation-duration) ease`,
    }),
    [offsets]
  );

  return (
    <DrawerPushContext.Provider value={value}>
      <div className={className} style={style}>
        {children}
      </div>
    </DrawerPushContext.Provider>
  );
}
