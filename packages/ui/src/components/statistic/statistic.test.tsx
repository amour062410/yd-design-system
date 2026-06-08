import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  InspectionStatistic,
  RectificationStatistic,
  RiskStatistic,
  StoreStatistic,
} from "../../business-patterns/statistic";
import {
  Statistic,
  StatisticCard,
  StatisticCardGroup,
  StatisticGroup,
} from "./index";
import { formatStatisticValue, formatTrendLabel } from "./statistic-styles";

describe("formatStatisticValue", () => {
  it("formats precision", () => {
    expect(formatStatisticValue(98.456, 1)).toBe("98.5");
    expect(formatStatisticValue(128)).toBe("128");
  });
});

describe("formatTrendLabel", () => {
  it("formats up and down", () => {
    expect(formatTrendLabel("up", 12.5)).toBe("↑ 12.5%");
    expect(formatTrendLabel("down", 8.3)).toBe("↓ 8.3%");
  });
});

describe("Statistic", () => {
  it("renders title and value", () => {
    render(<Statistic title="待整改门店" value={128} />);
    expect(screen.getByText("待整改门店")).toBeTruthy();
    expect(screen.getByText("128")).toBeTruthy();
  });

  it("renders prefix suffix and trend", () => {
    render(
      <Statistic
        title="巡检完成率"
        value={98}
        suffix="%"
        trend="up"
        trendValue={12.5}
      />
    );
    expect(screen.getByText("98")).toBeTruthy();
    expect(screen.getByText("%")).toBeTruthy();
    expect(screen.getByText("↑ 12.5%")).toBeTruthy();
  });

  it("renders loading skeleton", () => {
    const { container } = render(<Statistic title="加载中" loading />);
    expect(container.querySelector('[aria-busy="true"]')).toBeTruthy();
  });

  it("renders currency prefix", () => {
    render(<Statistic title="营收" value={12800} prefix="¥" precision={0} />);
    expect(screen.getByText("¥")).toBeTruthy();
    expect(screen.getByText("12800")).toBeTruthy();
  });
});

describe("StatisticGroup", () => {
  it("lays out children in grid", () => {
    const { container } = render(
      <StatisticGroup columns={4}>
        <Statistic title="A" value={1} />
        <Statistic title="B" value={2} />
        <Statistic title="C" value={3} />
        <Statistic title="D" value={4} />
      </StatisticGroup>
    );
    expect(container.querySelector('[role="group"]')).toBeTruthy();
    expect(screen.getByText("A")).toBeTruthy();
  });
});

describe("StatisticCard", () => {
  it("renders title value trend and description", () => {
    render(
      <StatisticCard
        title="门店总数"
        value={256}
        trend="up"
        trendValue={12.5}
        description="较上月新增28家"
        status="primary"
        icon={<span data-testid="icon">店</span>}
      />
    );
    expect(screen.getByText("门店总数")).toBeTruthy();
    expect(screen.getByText("256")).toBeTruthy();
    expect(screen.getByText("↑12.5%")).toBeTruthy();
    expect(screen.getByText("较上月新增28家")).toBeTruthy();
    expect(screen.getByTestId("icon")).toBeTruthy();
  });

  it("renders loading skeleton", () => {
    const { container } = render(<StatisticCard title="加载中" loading />);
    expect(container.querySelector('[aria-busy="true"]')).toBeTruthy();
  });
});

describe("StatisticCardGroup", () => {
  it("lays out cards in grid", () => {
    const { container } = render(
      <StatisticCardGroup columns={4}>
        <StatisticCard title="A" value={1} />
        <StatisticCard title="B" value={2} />
      </StatisticCardGroup>
    );
    expect(container.querySelector('[aria-label="KPI 指标卡"]')).toBeTruthy();
    expect(screen.getByText("A")).toBeTruthy();
  });
});

describe("Statistic presets", () => {
  it("RectificationStatistic", () => {
    render(<RectificationStatistic value={12} />);
    expect(screen.getByText("待整改门店")).toBeTruthy();
  });

  it("RiskStatistic highlights danger", () => {
    render(<RiskStatistic value={8} />);
    expect(screen.getByText("高风险门店")).toBeTruthy();
  });

  it("InspectionStatistic with percent", () => {
    render(<InspectionStatistic value={98} />);
    expect(screen.getByText("巡检完成率")).toBeTruthy();
    expect(screen.getByText("%")).toBeTruthy();
  });

  it("StoreStatistic", () => {
    render(<StoreStatistic value={256} />);
    expect(screen.getByText("门店总数")).toBeTruthy();
  });
});
