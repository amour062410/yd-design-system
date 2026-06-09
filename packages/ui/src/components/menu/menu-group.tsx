"use client";

import { useMenuContext } from "./menu-context";
import { menuGroupTitleClass } from "./menu.tokens";
import type { MenuGroupProps } from "./menu.types";

export function MenuGroup({ title, className }: MenuGroupProps) {
  const { collapsed } = useMenuContext();

  return (
    <li role="presentation" className={className}>
      <div className={menuGroupTitleClass(collapsed)} role="presentation">
        {title}
      </div>
    </li>
  );
}
