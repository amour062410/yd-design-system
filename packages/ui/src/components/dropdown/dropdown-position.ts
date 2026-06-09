import type { DropdownPlacement } from "./dropdown.types";

/**
 * Direct positioning: place the dropdown menu directly below/above the trigger.
 * No viewport flipping, no edge detection — B端菜单就该在按钮正下方。
 */
export function computeDropdownPosition(
  trigger: DOMRect,
  menu: { width: number; height: number },
  placement: DropdownPlacement,
  gap = 4
) {
  switch (placement) {
    case "bottomRight":
      return { x: trigger.right - menu.width, y: trigger.bottom + gap };
    case "topLeft":
      return { x: trigger.left, y: trigger.top - menu.height - gap };
    case "topRight":
      return { x: trigger.right - menu.width, y: trigger.top - menu.height - gap };
    case "bottomLeft":
    default:
      return { x: trigger.left, y: trigger.bottom + gap };
  }
}
