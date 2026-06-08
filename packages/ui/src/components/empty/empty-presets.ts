import type { ComponentType } from "react";
import {
  CommunicationEmptyIllustration,
  DefaultEmptyIllustration,
  DeviceEmptyIllustration,
  DocumentEmptyIllustration,
  ErrorEmptyIllustration,
  FilterEmptyIllustration,
  FolderEmptyIllustration,
  InspectionEmptyIllustration,
  NetworkEmptyIllustration,
  OfflineEmptyIllustration,
  PermissionEmptyIllustration,
  RectificationEmptyIllustration,
  RiskEmptyIllustration,
  SearchEmptyIllustration,
  StoreEmptyIllustration,
  TaskEmptyIllustration,
} from "./empty-illustrations";
import type { EmptyPreset, EmptyType } from "./empty.types";

export const EMPTY_TYPE_PRESETS: Record<EmptyType, EmptyPreset> = {
  default: {
    title: "暂无数据",
    description: "当前列表为空，请稍后再试",
  },
  search: {
    title: "未找到相关结果",
    description: "请尝试更换关键词后重新搜索",
  },
  filter: {
    title: "筛选无结果",
    description: "请调整筛选条件后重试",
  },
  document: {
    title: "暂无文档",
    description: "还没有可查看的文档内容",
  },
  folder: {
    title: "暂无内容",
    description: "该目录下还没有任何文件",
  },
  inspection: {
    title: "暂无巡检任务",
    description: "当前没有待执行的巡检任务",
  },
  rectification: {
    title: "暂无整改任务",
    description: "所有整改项均已处理完成",
  },
  risk: {
    title: "暂无风险告警",
    description: "当前门店运行状态良好",
  },
  store: {
    title: "暂无门店数据",
    description: "请先添加门店或调整筛选范围",
  },
  device: {
    title: "暂无设备数据",
    description: "尚未接入监控设备",
  },
  permission: {
    title: "暂无访问权限",
    description: "请联系管理员开通相应权限",
  },
  offline: {
    title: "服务暂不可用",
    description: "网络连接异常，请检查后重试",
  },
  error: {
    title: "加载失败",
    description: "数据加载出错，请刷新页面重试",
  },
  communication: {
    title: "暂无消息",
    description: "还没有任何沟通记录",
  },
  task: {
    title: "暂无任务",
    description: "当前没有待处理的任务",
  },
  network: {
    title: "网络异常",
    description: "请检查网络连接后重试",
  },
};

export const EMPTY_TYPE_ILLUSTRATIONS: Record<
  EmptyType,
  ComponentType<{ className?: string }>
> = {
  default: DefaultEmptyIllustration,
  search: SearchEmptyIllustration,
  filter: FilterEmptyIllustration,
  document: DocumentEmptyIllustration,
  folder: FolderEmptyIllustration,
  inspection: InspectionEmptyIllustration,
  rectification: RectificationEmptyIllustration,
  risk: RiskEmptyIllustration,
  store: StoreEmptyIllustration,
  device: DeviceEmptyIllustration,
  permission: PermissionEmptyIllustration,
  offline: OfflineEmptyIllustration,
  error: ErrorEmptyIllustration,
  communication: CommunicationEmptyIllustration,
  task: TaskEmptyIllustration,
  network: NetworkEmptyIllustration,
};

export const EMPTY_GALLERY_TYPES: EmptyType[] = [
  "default",
  "search",
  "filter",
  "document",
  "folder",
  "inspection",
  "rectification",
  "risk",
  "store",
  "device",
  "permission",
  "offline",
  "error",
  "communication",
  "task",
  "network",
];
