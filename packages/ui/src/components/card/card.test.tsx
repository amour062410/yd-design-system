import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  AlertCard,
  Card,
  CardAction,
  CardActions,
  CardCover,
  CardSection,
  DashboardCard,
  OverviewCard,
  StatisticsCard,
  StoreInspectionCard,
  StoreStatusCard,
} from "./index";

describe("Card", () => {
  it("renders title and body", () => {
    render(
      <Card title="门店信息" subTitle="基础资料">
        内容区域
      </Card>
    );

    expect(screen.getByText("门店信息")).toBeTruthy();
    expect(screen.getByText("基础资料")).toBeTruthy();
    expect(screen.getByText("内容区域")).toBeTruthy();
  });

  it("renders footer and extra", () => {
    render(
      <Card title="巡检任务" extra="更多" footer="底部操作">
        任务详情
      </Card>
    );

    expect(screen.getByText("更多")).toBeTruthy();
    expect(screen.getByText("底部操作")).toBeTruthy();
  });

  it("supports clickable interaction", () => {
    const onClick = vi.fn();
    render(
      <Card title="可点击卡片" clickable onClick={onClick}>
        跳转
      </Card>
    );

    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading skeleton", () => {
    render(<Card title="加载中" loading />);
    expect(document.querySelector('[aria-busy="true"]')).toBeTruthy();
  });

  it("renders status and priority badges", () => {
    render(
      <Card title="告警卡片" status="danger" priority="high">
        内容
      </Card>
    );

    expect(screen.getByText("异常")).toBeTruthy();
    expect(screen.getByText("高优先级")).toBeTruthy();
  });

  it("renders cover and bottom actions bar", () => {
    render(
      <Card
        title="封面卡片"
        cover={<CardCover>封面</CardCover>}
        actions={
          <CardActions>
            <CardAction aria-label="编辑">编辑</CardAction>
            <CardAction aria-label="设置">设置</CardAction>
          </CardActions>
        }
      >
        正文
      </Card>
    );

    expect(screen.getByText("封面卡片")).toBeTruthy();
    expect(screen.getByText("封面")).toBeTruthy();
    expect(document.querySelector('[data-card="actions"]')).toBeTruthy();
  });

  it("renders CardSection blocks", () => {
    render(
      <Card title="分组卡片">
        <CardSection title="子项标题">子项内容</CardSection>
      </Card>
    );

    expect(screen.getByText("子项标题")).toBeTruthy();
    expect(screen.getByText("子项内容")).toBeTruthy();
  });
});

describe("StatisticsCard", () => {
  it("renders value, unit and trend", () => {
    render(
      <StatisticsCard title="巡检门店" value="128" unit="家" trend="+12%" trendDirection="up" />
    );

    expect(screen.getByText("巡检门店")).toBeTruthy();
    expect(screen.getByText("128")).toBeTruthy();
    expect(screen.getByText("家")).toBeTruthy();
    expect(screen.getByText("+12%")).toBeTruthy();
  });
});

describe("OverviewCard", () => {
  it("renders overview fields", () => {
    render(
      <OverviewCard
        title="成都万象城店"
        status="正常"
        items={[
          { label: "最近巡检", value: "2026-06-08" },
          { label: "负责人", value: "张三" },
        ]}
      />
    );

    expect(screen.getByText("成都万象城店")).toBeTruthy();
    expect(screen.getByText("正常")).toBeTruthy();
    expect(screen.getByText("2026-06-08")).toBeTruthy();
    expect(screen.getByText("张三")).toBeTruthy();
  });
});

describe("DashboardCard", () => {
  it("renders dashboard sections", () => {
    render(
      <DashboardCard
        title="巡检趋势"
        content={<span>128 家</span>}
        chart={<div data-testid="chart">chart</div>}
        footer="近 7 日数据"
      />
    );

    expect(screen.getByText("巡检趋势")).toBeTruthy();
    expect(screen.getByText("128 家")).toBeTruthy();
    expect(screen.getByTestId("chart")).toBeTruthy();
    expect(screen.getByText("近 7 日数据")).toBeTruthy();
  });
});

describe("Business cards", () => {
  it("renders StoreInspectionCard", () => {
    const { container } = render(
      <StoreInspectionCard
        storeName="成都万象城店"
        score={92}
        inspector="张三"
        inspectionTime="2026-06-08"
      />
    );

    expect(screen.getByText("成都万象城店")).toBeTruthy();
    expect(screen.getByText("92")).toBeTruthy();
    expect(screen.getByText("张三")).toBeTruthy();

    const scoreEl = container.querySelector('[data-card="score"]');
    expect(scoreEl?.getAttribute("data-score-tone")).toBe("excellent");
    expect(scoreEl?.getAttribute("style")).toContain("--card-status-success");
  });

  it("renders StoreStatusCard", () => {
    render(<StoreStatusCard storeName="春熙路店" status="open" />);
    expect(screen.getByText("春熙路店")).toBeTruthy();
    expect(screen.getByText("营业中")).toBeTruthy();
  });

  it("renders AlertCard", () => {
    render(
      <AlertCard
        alertName="设备离线"
        level="high"
        occurredAt="2026-06-08 10:20"
        processStatus="待处理"
      />
    );

    expect(screen.getByText("设备离线")).toBeTruthy();
    expect(screen.getByText("待处理")).toBeTruthy();
  });
});
