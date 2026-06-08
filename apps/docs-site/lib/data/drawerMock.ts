import {
  drawerBestPracticeRows,
  drawerDesignSpecRows,
  drawerAnatomySpecRows,
  drawerSizeSpecs,
  drawerTokens,
  drawerUsageTokenNames,
} from "@yd-ds/tokens";

export const DRAWER_INTRO =
  "Drawer 从页面边缘滑入，用于详情查看、复杂编辑与配置。保留背景上下文，品牌色 #165DFF，圆角 6px（与 Modal 一致），交互规范与 Modal 对齐（Esc / 遮罩 / destroyOnClose）。";

export const DRAWER_USAGE = [
  "查看详情",
  "编辑数据",
  "配置系统",
  "多步骤操作",
  "不希望打断当前页面流程",
];

export const DRAWER_WHEN_TO_USE_MODAL = [
  "轻量确认 → Modal",
  "删除 / 提交二次确认",
  "短文本提示",
  "需要居中阻断用户注意力",
];

export const DRAWER_WHEN_TO_USE_DRAWER = [
  "复杂编辑 → Drawer",
  "详情查看 → Drawer",
  "多步骤流程 → Drawer",
  "需要参照背景页面内容",
];

export const DRAWER_BEST_PRACTICE_PAGE = [
  "字段 > 15 项或需多 Tab → 独立页面",
  "流程设计 / 权限树 → 独立页面",
  "需要 URL 分享与书签 → 独立页面",
];

export const DRAWER_CODE_EXAMPLE = `import {
  Drawer,
  DrawerFooter,
  DrawerPushContainer,
  NestedUserDrawerFlow,
} from "@yd-ds/ui/drawer";

<DrawerPushContainer>
  <main>页面内容</main>
  <Drawer
    open={open}
    push
    placement="right"
    keyboard
    maskClosable
    destroyOnClose
    loading={saving}
    header={<CustomHeader />}
    footer={<DrawerFooter onOk={save} />}
    level={2}
  />
</DrawerPushContainer>`;

export { drawerUsageTokenNames as DRAWER_USAGE_TOKEN_NAMES };
export { drawerDesignSpecRows as DRAWER_DESIGN_SPEC_ROWS };
export { drawerAnatomySpecRows as DRAWER_ANATOMY_SPEC_ROWS };
export { drawerBestPracticeRows as DRAWER_BEST_PRACTICE_ROWS };
export { drawerTokens, drawerSizeSpecs };
