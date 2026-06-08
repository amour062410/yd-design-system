import { fireEvent, render, screen } from "@testing-library/react";
import { ClipboardList } from "lucide-react";
import { describe, expect, it, vi } from "vitest";
import {
  InspectionSteps,
  RectificationSteps,
} from "../../business-patterns/steps";
import { Steps } from "./index";

describe("Steps", () => {
  const items = [
    { title: "第一步", description: "步骤一说明" },
    { title: "第二步", description: "步骤二说明" },
    { title: "第三步", description: "步骤三说明" },
  ];

  it("renders items with current step highlighted", () => {
    render(<Steps current={1} items={items} />);
    expect(screen.getByText("第一步")).toBeTruthy();
    expect(screen.getByText("第二步")).toBeTruthy();
    expect(screen.getByText("2")).toBeTruthy();
  });

  it("calls onChange when step is clicked", () => {
    const onChange = vi.fn();
    render(<Steps current={0} items={items} onChange={onChange} />);
    fireEvent.click(screen.getByText("第二步"));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("renders error status on current step", () => {
    render(<Steps current={1} status="error" items={items} />);
    expect(screen.getByLabelText("步骤条")).toBeTruthy();
  });

  it("renders custom icon", () => {
    render(
      <Steps
        current={0}
        items={[{ title: "带图标", icon: <ClipboardList data-testid="custom-icon" /> }]}
      />
    );
    expect(screen.getByTestId("custom-icon")).toBeTruthy();
  });

  it("renders vertical direction", () => {
    render(<Steps direction="vertical" current={0} items={items} />);
    expect(screen.getByLabelText("步骤条").getAttribute("data-direction")).toBe(
      "vertical"
    );
  });
});

describe("Business Steps", () => {
  it("renders inspection flow", () => {
    render(<InspectionSteps current={1} />);
    expect(screen.getByText("创建任务")).toBeTruthy();
    expect(screen.getByText("执行巡检")).toBeTruthy();
    expect(screen.getByText("完成归档")).toBeTruthy();
  });

  it("renders rectification flow", () => {
    render(<RectificationSteps current={2} />);
    expect(screen.getByText("待整改")).toBeTruthy();
    expect(screen.getByText("待复检")).toBeTruthy();
  });
});
