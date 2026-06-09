import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Divider } from "./index";

describe("Divider", () => {
  it("renders horizontal separator", () => {
    const { container } = render(<Divider />);
    const separator = container.querySelector('[role="separator"]');
    expect(separator).toBeTruthy();
    expect(separator?.getAttribute("aria-orientation")).toBe("horizontal");
  });

  it("renders vertical separator", () => {
    const { container } = render(<Divider type="vertical" aria-label="分隔" />);
    const separator = container.querySelector('[role="separator"]');
    expect(separator?.getAttribute("aria-orientation")).toBe("vertical");
    expect(separator?.getAttribute("aria-label")).toBe("分隔");
  });

  it("renders titled divider", () => {
    render(<Divider>基本信息</Divider>);
    expect(screen.getByText("基本信息")).toBeTruthy();
  });

  it("renders dashed divider", () => {
    const { container } = render(<Divider dashed />);
    expect(container.querySelector('[role="separator"]')?.className).toContain("border-dashed");
  });

  it("supports custom margin", () => {
    const { container } = render(<Divider margin={32} />);
    const separator = container.querySelector('[role="separator"]') as HTMLElement;
    expect(separator.style.marginTop).toBe("32px");
    expect(separator.style.marginBottom).toBe("32px");
  });
});
