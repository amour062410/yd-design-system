import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InspectionCoverageProgress } from "./inspection-coverage-progress";
import { InspectionStageProgress } from "./inspection-stage-progress";
import { RectificationProgress } from "./rectification-progress";
import { RiskHandlingProgress } from "./risk-handling-progress";
import { StoreHealthProgress } from "./store-health-progress";
import {
  calcPercent,
  deriveStageSteps,
  resolveHealthGrade,
  resolveRateStatus,
} from "./business-progress-utils";

describe("business-progress-utils", () => {
  it("calcPercent", () => {
    expect(calcPercent(41, 50)).toBe(82);
    expect(calcPercent(0, 0)).toBe(0);
  });

  it("resolveRateStatus", () => {
    expect(resolveRateStatus(95)).toBe("good");
    expect(resolveRateStatus(70)).toBe("warning");
    expect(resolveRateStatus(40)).toBe("danger");
  });

  it("resolveHealthGrade", () => {
    expect(resolveHealthGrade(91)).toBe("A");
    expect(resolveHealthGrade(75)).toBe("C");
  });

  it("deriveStageSteps", () => {
    const steps = deriveStageSteps("rectifying");
    expect(steps[3].status).toBe("process");
    expect(steps[2].status).toBe("finish");
  });
});

describe("RectificationProgress", () => {
  it("renders percent with business status", () => {
    render(
      <RectificationProgress
        rectifiedCount={41}
        pendingCount={9}
        status="warning"
        trend={{ label: "较上周", value: 12, direction: "up" }}
      />
    );
    expect(screen.getByText("82%")).toBeTruthy();
    expect(screen.getByText(/较上周/)).toBeTruthy();
  });
});

describe("StoreHealthProgress", () => {
  it("shows grade and business status override", () => {
    render(<StoreHealthProgress score={75} status="warning" grade="C" />);
    expect(screen.getAllByText("75%").length).toBeGreaterThan(0);
    expect(screen.getByText("C")).toBeTruthy();
  });
});

describe("InspectionCoverageProgress", () => {
  it("renders coverage stats", () => {
    render(
      <InspectionCoverageProgress
        inspectedCount={43}
        uninspectedCount={7}
        variant="card"
      />
    );
    expect(screen.getByText("巡检覆盖率")).toBeTruthy();
    expect(screen.getByText(/已巡检 43 家/)).toBeTruthy();
  });
});

describe("RiskHandlingProgress", () => {
  it("uses explicit danger status", () => {
    render(
      <RiskHandlingProgress
        highRiskCount={12}
        inProgressCount={5}
        pendingCount={7}
        percent={40}
        status="danger"
      />
    );
    expect(screen.getByText("40%")).toBeTruthy();
  });
});

describe("InspectionStageProgress", () => {
  it("renders stage labels", () => {
    render(<InspectionStageProgress currentStage="executing" />);
    expect(screen.getByText("创建")).toBeTruthy();
    expect(screen.getByText("完成")).toBeTruthy();
  });
});
