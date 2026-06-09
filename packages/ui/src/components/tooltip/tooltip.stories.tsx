import { Button } from "../button";
import { Tooltip } from "./index";
import type { TooltipPlacement } from "./index";

export default {
  title: "YD Design System/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
};

/** 基础：hover 触发，深色默认底 */
export const Basic = {
  render: () => (
    <Tooltip content="文字提示">
      <Button variant="secondary">悬停查看</Button>
    </Tooltip>
  ),
};

/** 12 个方向 */
export const Placements = {
  render: () => {
    const rows: TooltipPlacement[][] = [
      ["top-start", "top", "top-end"],
      ["left-start", "right-start", "left-end"],
      ["bottom-start", "bottom", "bottom-end"],
    ];
    const all: TooltipPlacement[] = [
      "top-start",
      "top",
      "top-end",
      "right-start",
      "right",
      "right-end",
      "bottom-start",
      "bottom",
      "bottom-end",
      "left-start",
      "left",
      "left-end",
    ];
    return (
      <div className="grid grid-cols-3 gap-4 p-20">
        {all.map((p) => (
          <Tooltip key={p} content="文字提示" placement={p}>
            <Button variant="secondary" className="w-[110px]">
              {p}
            </Button>
          </Tooltip>
        ))}
      </div>
    );
  },
};

/** 语义色 + 自定义色 */
export const Colors = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(
        [
          ["default", "默认"],
          ["primary", "品牌"],
          ["success", "成功"],
          ["warning", "警告"],
          ["danger", "危险"],
          ["info", "信息"],
        ] as const
      ).map(([color, label]) => (
        <Tooltip key={color} content="文字提示" color={color} defaultOpen={false}>
          <Button variant="secondary">{label}</Button>
        </Tooltip>
      ))}
      <Tooltip content="自定义紫色" color="#722ED1">
        <Button variant="secondary">紫色</Button>
      </Tooltip>
      <Tooltip content="自定义品红" color="#F5319D">
        <Button variant="secondary">品红</Button>
      </Tooltip>
    </div>
  ),
};

/** 触发方式：click */
export const ClickTrigger = {
  render: () => (
    <Tooltip content="点击切换的提示" trigger="click">
      <Button variant="secondary">点击触发</Button>
    </Tooltip>
  ),
};

/** 无箭头 + 长文本 */
export const NoArrowLongText = {
  render: () => (
    <Tooltip
      arrow={false}
      content="这是一段较长的文字提示，用于演示最大宽度约束下的自动换行表现。"
    >
      <Button variant="secondary">长文本</Button>
    </Tooltip>
  ),
};
