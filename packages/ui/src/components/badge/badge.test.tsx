import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";
import { InspectionBadge } from "../../business-patterns/badge/inspection-badge";
import { NotificationBadge } from "../../business-patterns/badge/notification-badge";
import { RectificationBadge } from "../../business-patterns/badge/rectification-badge";
import { RiskBadge } from "../../business-patterns/badge/risk-badge";
import { formatBadgeCount } from "./badge-styles";

describe("formatBadgeCount", () => {
  it("formats overflow", () => {
    expect(formatBadgeCount(120, 99, "99+")).toBe("99+");
    expect(formatBadgeCount(12, 99, "99+")).toBe("12");
  });
});

describe("Badge", () => {
  it("renders count badge", () => {
    render(<Badge count={12} status="warning" />);
    expect(screen.getByRole("status", { name: "12" })).toBeTruthy();
  });

  it("hides zero by default", () => {
    const { container } = render(<Badge count={0} />);
    expect(container.firstChild).toBeNull();
  });

  it("shows zero when showZero", () => {
    render(<Badge count={0} showZero />);
    expect(screen.getByRole("status", { name: "0" })).toBeTruthy();
  });

  it("renders overflow count", () => {
    render(<Badge count={120} maxCount={99} />);
    expect(screen.getByRole("status", { name: "99+" })).toBeTruthy();
  });

  it("renders dot badge", () => {
    const { container } = render(<Badge dot status="danger" />);
    expect(container.querySelector('[role="status"]')).toBeTruthy();
  });

  it("renders status text", () => {
    render(<Badge type="status" status="danger" text="逾" />);
    expect(screen.getByText("逾")).toBeTruthy();
  });

  it("attaches to children", () => {
    render(
      <Badge count={3}>
        <button type="button">消息</button>
      </Badge>
    );
    expect(screen.getByRole("button", { name: "消息" })).toBeTruthy();
    expect(screen.getByRole("status", { name: "3" })).toBeTruthy();
  });

  it("renders arco-style ribbon with clip cut and left notch", () => {
    const { container } = render(
      <Badge type="ribbon" status="danger" text="高风险">
        <div>卡片</div>
      </Badge>
    );
    expect(screen.getByText("高风险")).toBeTruthy();
    expect(screen.getByText("卡片")).toBeTruthy();
    const body = screen.getByText("高风险") as HTMLElement;
    expect(body.style.clipPath).toContain("calc(100% - 6px)");
    expect(body.style.boxShadow).toContain("rgba");
    expect(container.querySelector('[data-ribbon-notch="left"]')).toBeTruthy();
  });
});

describe("Badge presets", () => {
  it("RectificationBadge with label", () => {
    render(<RectificationBadge count={12} showLabel />);
    expect(screen.getByText("待整改")).toBeTruthy();
    expect(screen.getByRole("status", { name: "12" })).toBeTruthy();
  });

  it("RiskBadge high", () => {
    render(<RiskBadge count={8} level="high" />);
    expect(screen.getByRole("status", { name: "8" })).toBeTruthy();
  });

  it("InspectionBadge pending", () => {
    render(<InspectionBadge count={36} variant="pending" />);
    expect(screen.getByRole("status", { name: "36" })).toBeTruthy();
  });

  it("NotificationBadge overflow", () => {
    render(<NotificationBadge unread={120} pulse />);
    expect(screen.getByRole("status", { name: "99+" })).toBeTruthy();
  });
});
