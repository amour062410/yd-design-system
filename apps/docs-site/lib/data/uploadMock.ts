import type { UploadFile } from "@yd-ds/ui/upload";
import { uploadUsageTokenNames } from "@yd-ds/tokens";

const DEMO_THUMB_LANDSCAPE =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect fill="#e8eef8" width="160" height="160"/><path fill="#94b8f7" d="M28 118 L62 72 L88 98 L132 48 L132 118 Z"/><circle fill="#4080ff" cx="52" cy="50" r="14"/></svg>'
  );

const DEMO_THUMB_PORTRAIT =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect fill="#e8eef8" width="80" height="80"/><path fill="#94b8f7" d="M14 58 L32 36 L44 48 L66 24 L66 58 Z"/><circle fill="#4080ff" cx="26" cy="26" r="8"/></svg>'
  );

const DEMO_AVATAR =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><circle fill="#e8f3ff" cx="48" cy="48" r="48"/><circle fill="#4080ff" cx="48" cy="38" r="16"/><ellipse fill="#4080ff" cx="48" cy="78" rx="24" ry="18"/></svg>'
  );

export const UPLOAD_INTRO =
  "Upload 用于文件选择与上传，支持点击选择、拖拽上传、进度展示、预览与校验。提供文本列表、图片卡片、头像与拖拽区等多种展示形态。";

export const UPLOAD_PROGRESS_DEMO: UploadFile[] = [
  { uid: "p1", name: "design-spec.pdf", status: "uploading", percent: 24 },
  { uid: "p2", name: "banner.png", status: "uploading", percent: 62 },
  { uid: "p3", name: "report.xlsx", status: "uploading", percent: 88 },
];

export const UPLOAD_BASIC_DEMO: UploadFile[] = [
  { uid: "b1", name: "document.pdf", status: "done" },
  { uid: "b2", name: "notes.txt", status: "done" },
];

export const UPLOAD_DRAG_DEMO: UploadFile[] = [
  { uid: "d1", name: "archive.zip", status: "done" },
];

export const UPLOAD_PICTURE_DEMO: UploadFile[] = [
  {
    uid: "pic1",
    name: "cover.jpg",
    status: "done",
    thumbUrl: DEMO_THUMB_PORTRAIT,
  },
  {
    uid: "pic2",
    name: "hero.png",
    status: "uploading",
    percent: 45,
  },
  { uid: "pic3", name: "broken.png", status: "error" },
];

export const UPLOAD_PICTURE_CARD_DEMO: UploadFile[] = [
  {
    uid: "pc1",
    name: "photo-1.png",
    status: "done",
    thumbUrl: DEMO_THUMB_LANDSCAPE,
  },
  { uid: "pc2", name: "photo-2.png", status: "uploading", percent: 48 },
  { uid: "pc3", name: "image-error.png", status: "error" },
];

export const UPLOAD_AVATAR_DEMO: UploadFile[] = [
  {
    uid: "av1",
    name: "avatar.png",
    status: "done",
    thumbUrl: DEMO_AVATAR,
  },
];

export const UPLOAD_CODE_EXAMPLE = `import { Upload } from "@yd-ds/ui/upload";

<Upload listType="text" multiple accept="image/*,.pdf" />

<Upload dragger multiple />

<Upload listType="picture-card" accept="image/*" maxCount={4} />

<Upload avatar accept="image/*" maxCount={1} />`;

export { uploadUsageTokenNames as UPLOAD_USAGE_TOKEN_NAMES };
