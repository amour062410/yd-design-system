import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DashboardSection } from "./index";

describe("DashboardSection", () => {
  it("renders title, description, extra, content and actions", () => {
    render(
      <DashboardSection
        title="运营驾驶舱"
        description="实时经营概览"
        extra={<button type="button">导出</button>}
        actions={<button type="button">查看全部</button>}
      >
        <p>内容区</p>
      </DashboardSection>
    );

    expect(screen.getByText("运营驾驶舱")).toBeTruthy();
    expect(screen.getByText("实时经营概览")).toBeTruthy();
    expect(screen.getByRole("button", { name: "导出" })).toBeTruthy();
    expect(screen.getByText("内容区")).toBeTruthy();
    expect(screen.getByRole("button", { name: "查看全部" })).toBeTruthy();
  });

  it("omits the header when no title, description or extra is provided", () => {
    const { container } = render(
      <DashboardSection>
        <p>仅内容</p>
      </DashboardSection>
    );

    expect(container.querySelector("header")).toBeNull();
    expect(screen.getByText("仅内容")).toBeTruthy();
  });

  it("omits the footer when no actions are provided", () => {
    const { container } = render(
      <DashboardSection title="标题">内容</DashboardSection>
    );

    expect(container.querySelector("footer")).toBeNull();
  });

  it("renders subtitle and filters in the header", () => {
    const { container } = render(
      <DashboardSection
        title="运营驾驶舱"
        subtitle="华东一区"
        filters={<button type="button">今日</button>}
      >
        内容
      </DashboardSection>
    );

    const header = container.querySelector("header");
    expect(header).not.toBeNull();
    expect(screen.getByText("华东一区")).toBeTruthy();
    const filterButton = screen.getByRole("button", { name: "今日" });
    expect(header?.contains(filterButton)).toBe(true);
  });

  it("keeps actions in the footer by default (non-breaking)", () => {
    const { container } = render(
      <DashboardSection title="标题" actions={<button type="button">导出</button>}>
        内容
      </DashboardSection>
    );

    const footer = container.querySelector("footer");
    const actionButton = screen.getByRole("button", { name: "导出" });
    expect(footer?.contains(actionButton)).toBe(true);
  });

  it("moves actions into the header when actionsPlacement is header", () => {
    const { container } = render(
      <DashboardSection
        title="标题"
        actionsPlacement="header"
        actions={<button type="button">导出</button>}
      >
        内容
      </DashboardSection>
    );

    expect(container.querySelector("footer")).toBeNull();
    const header = container.querySelector("header");
    const actionButton = screen.getByRole("button", { name: "导出" });
    expect(header?.contains(actionButton)).toBe(true);
  });

  it("renders a header when only filters are provided", () => {
    const { container } = render(
      <DashboardSection filters={<button type="button">本周</button>}>
        内容
      </DashboardSection>
    );

    expect(container.querySelector("header")).not.toBeNull();
  });

  it("applies card chrome for the default variant", () => {
    const { container } = render(
      <DashboardSection title="卡片">内容</DashboardSection>
    );

    const section = container.querySelector("section");
    expect(section?.className).toContain("border");
    expect(section?.className).toContain("bg-card");
  });

  it("drops card chrome for the plain variant", () => {
    const { container } = render(
      <DashboardSection variant="plain" title="纯净">
        内容
      </DashboardSection>
    );

    const section = container.querySelector("section");
    expect(section?.className).not.toContain("bg-card");
  });

  it("changes zone padding by the padding prop", () => {
    const { container: small } = render(
      <DashboardSection padding="small" title="标题">
        内容
      </DashboardSection>
    );
    const { container: large } = render(
      <DashboardSection padding="large" title="标题">
        内容
      </DashboardSection>
    );

    expect(small.querySelector("header")?.className).toContain("py-3");
    expect(large.querySelector("header")?.className).toContain("py-5");
  });

  it("forwards arbitrary props and className to the section element", () => {
    const { container } = render(
      <DashboardSection className="custom-class" data-testid="section" title="t">
        内容
      </DashboardSection>
    );

    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
    expect(section?.getAttribute("data-testid")).toBe("section");
  });
});
