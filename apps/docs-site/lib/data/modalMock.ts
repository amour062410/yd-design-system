import {
  modalDesignSpecRows,
  modalPatternSpecRows,
  modalSizeSpecs,
  modalSpacingSpecRows,
  modalStructureSpecRows,
  modalTokens,
  modalUsageTokenNames,
  modalVisualSpecRows,
} from "@yd-ds/tokens";

export const MODAL_INTRO =
  "Modal（对话框）用于在当前页面上方展示需要用户关注或操作的内容，如确认操作、填写表单、展示警告等。品牌色 #165DFF，圆角 6px，遵循 8px 间距网格，企业级 B 端后台风格。";

export const MODAL_USAGE =
  "通过 open 控制显隐，onClose 处理关闭；复杂内容使用 Modal + ModalHeader / ModalBody / ModalFooter 组合；轻量确认使用 ConfirmModal；表单、详情、上传、审批分别使用 FormModal、DetailModal、UploadModal、ApprovalModal；复杂配置使用 FullscreenModal。";

export const MODAL_WHEN_TO_USE = [
  "需要用户确认或取消的重要操作（删除、提交、退出编辑）",
  "在当前页面上方展示表单，避免整页跳转",
  "展示操作结果反馈（成功、失败、警示、信息）",
  "查看只读详情，内容较短且无需新页面",
];

export const MODAL_WHEN_NOT_TO_USE = [
  "内容过多或需要长时间编辑 — 建议使用独立页面或 Drawer",
  "非阻塞性提示 — 建议使用 Message / Notification",
  "连续多步流程 — 建议使用 Steps + 页面",
];

export const MODAL_BEST_PRACTICE_MODAL = [
  "轻量确认：删除、提交、退出编辑等需要阻断操作的场景",
  "短表单：字段 ≤ 8 项，用户可在 1–2 分钟内完成",
  "只读详情：字段不多，无需与背景页面频繁对照",
  "结果反馈：Info / Success / Warning / Error 等状态提示",
  "居中聚焦：需要用户立即做出决策，打断当前任务流",
];

export const MODAL_BEST_PRACTICE_DRAWER = [
  "内容较多：表单字段多、需要分区或 Tab 切换",
  "需要参照背景：编辑列表行数据时对照表格内容",
  "非阻断操作：筛选、配置、辅助工具面板",
  "从边缘滑入：详情 + 关联操作，用户可能频繁开关",
  "移动端或窄屏：Drawer 更符合侧滑交互习惯",
];

export const MODAL_BEST_PRACTICE_COMPARE = [
  { scenario: "删除 1 条记录", modal: "✓ Delete Modal (400px)", drawer: "—" },
  { scenario: "新增用户 (6 字段)", modal: "✓ Form Modal (600px)", drawer: "可选" },
  { scenario: "编辑订单 (20+ 字段)", modal: "—", drawer: "✓ Drawer / 独立页" },
  { scenario: "系统配置 (多区块)", modal: "✓ Fullscreen Modal", drawer: "✓ 大 Drawer" },
  { scenario: "查看行详情", modal: "✓ Detail Modal", drawer: "✓ 右侧 Drawer" },
  { scenario: "上传附件", modal: "✓ Upload Modal", drawer: "可选" },
];

export const DELETE_MODAL_CONTENT =
  "确认删除用户「张明 (YD-20240312)」？删除后其关联的 3 条审批记录、2 份证照附件将一并移除，此操作不可撤销。";

export const WARNING_MODAL_CONTENT =
  "当前配置尚未保存，切换环境将导致未保存的修改丢失。是否继续切换至「生产环境」？";

export const MODAL_CODE_EXAMPLE = `import { Modal, ConfirmModal, ModalFooter } from "@yd-ds/ui/modal";

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="基础对话框"
  maskClosable
  keyboard
  destroyOnClose
  loading={submitting}
  footer={<ModalFooter loading={submitting} onCancel={close} onOk={submit} />}
>
  内容
</Modal>

<ConfirmModal type="error" title="删除" content="不可撤销" onOk={onDelete} />`;

export { modalUsageTokenNames as MODAL_USAGE_TOKEN_NAMES };
export { modalDesignSpecRows as MODAL_DESIGN_SPEC_ROWS };
export { modalStructureSpecRows as MODAL_STRUCTURE_SPEC_ROWS };
export { modalSpacingSpecRows as MODAL_SPACING_SPEC_ROWS };
export { modalVisualSpecRows as MODAL_VISUAL_SPEC_ROWS };
export { modalPatternSpecRows as MODAL_PATTERN_SPEC_ROWS };
export { modalTokens, modalSizeSpecs };
