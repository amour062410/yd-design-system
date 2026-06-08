"use client";

import {
  AlertCircle,
  CheckCircle2,
  Eye,
  ImageIcon,
  Loader2,
  Plus,
  Trash2,
  Upload as UploadIcon,
  FolderUp,
} from "lucide-react";
import {
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type ReactNode,
} from "react";
import { Button } from "./button";
import { cn } from "../lib/utils";

export type UploadFileStatus = "uploading" | "done" | "error";

export interface UploadFile {
  uid: string;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  url?: string;
  thumbUrl?: string;
  originFile?: File;
}

export type UploadListType = "text" | "picture" | "picture-card";

export interface UploadProps {
  listType?: UploadListType;
  dragger?: boolean;
  fileList?: UploadFile[];
  defaultFileList?: UploadFile[];
  onChange?: (info: { fileList: UploadFile[] }) => void;
  onRemove?: (file: UploadFile) => boolean | void | Promise<boolean | void>;
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxCount?: number;
  showUploadList?: boolean;
  className?: string;
  children?: ReactNode;
  /** Trigger label for text / picture modes */
  buttonText?: string;
  /** Avatar style: round picture-card, single image */
  avatar?: boolean;
}

let uidSeed = 0;
function nextUid() {
  uidSeed += 1;
  return `upload-${Date.now()}-${uidSeed}`;
}

function simulateUpload(
  file: UploadFile,
  onProgress: (percent: number) => void,
  onDone: () => void,
  onError: () => void
) {
  let percent = 0;
  const tick = () => {
    percent += 12 + Math.random() * 18;
    if (percent >= 100) {
      onProgress(100);
      if (file.name.toLowerCase().includes("error")) {
        onError();
      } else {
        onDone();
      }
      return;
    }
    onProgress(Math.min(99, Math.round(percent)));
    window.setTimeout(tick, 180);
  };
  window.setTimeout(tick, 120);
}

function useControllableFileList(
  fileList?: UploadFile[],
  defaultFileList: UploadFile[] = [],
  onChange?: (info: { fileList: UploadFile[] }) => void
) {
  const [internal, setInternal] = useState(defaultFileList);
  const merged = fileList ?? internal;

  const setFiles = useCallback(
    (next: UploadFile[] | ((prev: UploadFile[]) => UploadFile[])) => {
      const resolved =
        typeof next === "function" ? next(fileList ?? internal) : next;
      if (fileList === undefined) setInternal(resolved);
      onChange?.({ fileList: resolved });
    },
    [fileList, internal, onChange]
  );

  return [merged, setFiles] as const;
}

function ProgressBar({
  percent,
  thick,
}: {
  percent: number;
  thick?: boolean;
}) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-full",
        thick ? "h-1.5" : "h-0.5"
      )}
      style={{ backgroundColor: "var(--upload-progress-track)" }}
    >
      <div
        className="h-full rounded-full transition-all duration-base"
        style={{
          width: `${percent}%`,
          backgroundColor: "var(--upload-progress-fill)",
        }}
      />
    </div>
  );
}

function RemoveButton({
  onClick,
  error,
  className,
}: {
  onClick: () => void;
  error?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-input text-text-tertiary transition-colors duration-fast hover:bg-surface-card-soft hover:text-text-secondary",
        error && "hover:text-danger",
        className
      )}
      aria-label="删除文件"
    >
      <Trash2 size={16} strokeWidth={1.75} />
    </button>
  );
}

function TextFileItem({
  file,
  onRemove,
}: {
  file: UploadFile;
  onRemove: () => void;
}) {
  const isError = file.status === "error";
  const isUploading = file.status === "uploading";
  const isDone = file.status === "done";

  return (
    <div className="group">
      <div
        className={cn(
          "flex items-center gap-2 py-2",
          isError && "text-danger"
        )}
      >
        {isUploading && (
          <Loader2
            size={14}
            className="shrink-0 animate-spin text-brand"
            strokeWidth={2}
          />
        )}
        {isDone && (
          <CheckCircle2
            size={14}
            className="shrink-0 text-brand"
            strokeWidth={1.75}
          />
        )}
        {isError && (
          <AlertCircle
            size={14}
            className="shrink-0 text-danger"
            strokeWidth={1.75}
          />
        )}
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-sm",
            isError ? "text-danger" : "text-text-primary"
          )}
        >
          {file.name}
        </span>
        <RemoveButton onClick={onRemove} error={isError} />
      </div>
      {isUploading && (
        <div className="pb-1 pl-5 pr-9">
          <ProgressBar percent={file.percent ?? 0} />
        </div>
      )}
    </div>
  );
}

function PictureFileItem({
  file,
  onRemove,
}: {
  file: UploadFile;
  onRemove: () => void;
}) {
  const isError = file.status === "error";
  const isUploading = file.status === "uploading";
  const showTooltip = isError;

  return (
    <div
      className={cn(
        "relative flex items-center gap-3 rounded-input border px-3 py-2.5 transition-colors",
        isError
          ? "border-danger/40 bg-danger-muted/30"
          : "border-border/70 bg-surface-card"
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-input",
          isError ? "bg-danger-muted/50" : "bg-surface-card-soft"
        )}
      >
        {file.thumbUrl && !isError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={file.thumbUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : isUploading ? (
          <Loader2
            size={18}
            className="animate-spin text-brand"
            strokeWidth={1.75}
          />
        ) : (
          <ImageIcon
            size={18}
            className={cn(isError ? "text-danger" : "text-text-tertiary")}
            strokeWidth={1.75}
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-sm",
            isError ? "text-danger" : "text-text-primary"
          )}
        >
          {file.name}
        </p>
        {isUploading && (
          <div className="mt-2">
            <ProgressBar percent={file.percent ?? 0} thick />
          </div>
        )}
      </div>
      <div className="relative">
        {showTooltip && (
          <span className="pointer-events-none absolute -top-9 right-0 whitespace-nowrap rounded-sm bg-text-primary px-2 py-1 text-[11px] text-white shadow-ds-lg">
            上传失败
            <span className="absolute -bottom-1 right-3 h-2 w-2 rotate-45 bg-text-primary" />
          </span>
        )}
        <RemoveButton onClick={onRemove} error={isError} />
      </div>
    </div>
  );
}

function PictureCardItem({
  file,
  onRemove,
  onPreview,
  avatar,
}: {
  file: UploadFile;
  onRemove: () => void;
  onPreview?: () => void;
  avatar?: boolean;
}) {
  const sizeClass = avatar
    ? "h-[var(--upload-avatar-size)] w-[var(--upload-avatar-size)] rounded-full"
    : "h-20 w-20 rounded-[var(--upload-radius)]";
  const isError = file.status === "error";
  const isUploading = file.status === "uploading";

  if (isUploading) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center border border-dashed border-[color:var(--upload-border-default)] bg-surface-card-soft p-2",
          sizeClass
        )}
      >
        <p className="mb-2 text-center text-[10px] leading-tight text-text-tertiary">
          正在上传...
        </p>
        <ProgressBar percent={file.percent ?? 0} thick />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={cn(
          "group relative overflow-hidden border bg-surface-card",
          avatar ? "border-[color:var(--upload-color-error)]" : "border-danger",
          sizeClass
        )}
      >
        <div className="flex h-full flex-col items-center justify-center gap-1.5 px-2 pb-2 pt-2.5">
          <ImageIcon
            size={22}
            className="shrink-0 text-danger"
            strokeWidth={1.5}
          />
          <span className="w-full truncate text-center text-[11px] leading-tight text-danger">
            {file.name}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-base group-hover:opacity-100">
          <button
            type="button"
            onClick={onRemove}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
            aria-label="删除"
          >
            <Trash2 size={14} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden border border-[color:var(--upload-border-default)] bg-surface-card-soft",
        sizeClass
      )}
    >
      {file.thumbUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={file.thumbUrl}
          alt={file.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <ImageIcon size={24} className="text-text-tertiary" strokeWidth={1.5} />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/45 opacity-0 transition-opacity duration-base group-hover:opacity-100">
        {onPreview && file.thumbUrl && (
          <button
            type="button"
            onClick={onPreview}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/20"
            aria-label="预览"
          >
            <Eye size={14} strokeWidth={1.75} />
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          className="flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/20"
          aria-label="删除"
        >
          <Trash2 size={14} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}

function DraggerZone({
  disabled,
  inputId,
  onFiles,
  onDrag,
}: {
  disabled?: boolean;
  inputId: string;
  onFiles: (files: FileList) => void;
  onDrag: (e: DragEvent) => void;
}) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <label
      htmlFor={inputId}
      onDragEnter={(e) => {
        e.preventDefault();
        if (!disabled) setDragOver(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        onDrag(e);
        if (!disabled) setDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (!disabled && e.dataTransfer.files.length) {
          onFiles(e.dataTransfer.files);
        }
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-ds border border-dashed px-6 py-10 text-center transition-colors duration-base",
        disabled && "cursor-not-allowed opacity-50",
        dragOver
          ? "border-[color:var(--upload-border-active)] bg-brand-muted/40"
          : "border-[color:var(--upload-border-hover)] bg-surface-card-soft hover:border-[color:var(--upload-border-active)] hover:bg-brand-hover/30"
      )}
      style={{ borderRadius: "var(--upload-dragger-radius)" }}
    >
      <FolderUp
        size={48}
        strokeWidth={1.25}
        className="mb-4 text-brand"
      />
      <p className="text-sm text-text-primary">
        点击或将文件拖拽到此区域上传
      </p>
      <p className="mt-2 max-w-md text-[12px] leading-relaxed text-text-tertiary">
        支持单个或批量上传。严禁上传公司数据或其他禁止文件。
      </p>
    </label>
  );
}

export function Upload({
  listType = "text",
  dragger = false,
  fileList,
  defaultFileList = [],
  onChange,
  onRemove,
  beforeUpload,
  accept,
  multiple = false,
  disabled = false,
  maxCount,
  showUploadList = true,
  className,
  children,
  buttonText,
  avatar = false,
}: UploadProps) {
  const effectiveListType = avatar ? "picture-card" : listType;
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useControllableFileList(
    fileList,
    defaultFileList,
    onChange
  );

  const atMax = maxCount !== undefined && files.length >= maxCount;
  const canUpload = !disabled && !atMax;

  const updateFile = useCallback(
    (uid: string, patch: Partial<UploadFile>) => {
      setFiles((prev) =>
        prev.map((f) => (f.uid === uid ? { ...f, ...patch } : f))
      );
    },
    [setFiles]
  );

  const startUpload = useCallback(
    (entry: UploadFile) => {
      simulateUpload(
        entry,
        (percent) => updateFile(entry.uid, { percent, status: "uploading" }),
        () =>
          updateFile(entry.uid, {
            status: "done",
            percent: 100,
            thumbUrl: entry.originFile?.type.startsWith("image/")
              ? URL.createObjectURL(entry.originFile)
              : entry.thumbUrl,
          }),
        () => updateFile(entry.uid, { status: "error", percent: 0 })
      );
    },
    [updateFile]
  );

  const processFiles = useCallback(
    async (list: FileList) => {
      const incoming = Array.from(list);
      let slots =
        maxCount !== undefined ? Math.max(0, maxCount - files.length) : incoming.length;
      for (const file of incoming) {
        if (slots <= 0) break;
        if (beforeUpload) {
          const ok = await beforeUpload(file);
          if (!ok) continue;
        }
        const entry: UploadFile = {
          uid: nextUid(),
          name: file.name,
          status: "uploading",
          percent: 0,
          originFile: file,
        };
        setFiles((prev) => [...prev, entry]);
        startUpload(entry);
        slots -= 1;
        if (!multiple) break;
      }
    },
    [beforeUpload, files.length, maxCount, multiple, setFiles, startUpload]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) void processFiles(e.target.files);
    e.target.value = "";
  };

  const handleRemove = async (file: UploadFile) => {
    if (onRemove) {
      const result = await onRemove(file);
      if (result === false) return;
    }
    setFiles((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const openPicker = () => {
    if (canUpload) inputRef.current?.click();
  };

  const triggerLabel =
    buttonText ??
    (avatar
      ? "上传头像"
      : effectiveListType === "picture-card"
        ? "上传图片"
        : effectiveListType === "picture"
          ? "上传图片"
          : "上传文件");

  const input = (
    <input
      ref={inputRef}
      id={inputId}
      type="file"
      className="sr-only"
      accept={accept}
      multiple={multiple}
      disabled={!canUpload}
      onChange={handleInputChange}
    />
  );

  const showTrigger =
    effectiveListType !== "picture-card" && !dragger && !children;

  const trigger =
    children ??
    (showTrigger &&
      (effectiveListType === "picture" ? (
        <Button
          variant="default"
          size="default"
          disabled={!canUpload}
          onClick={openPicker}
        >
          <UploadIcon size={16} />
          {triggerLabel}
        </Button>
      ) : (
        <Button
          variant="outline"
          size="default"
          disabled={!canUpload}
          onClick={openPicker}
        >
          <UploadIcon size={16} />
          {triggerLabel}
        </Button>
      )));

  const cardAddClass = avatar
    ? "h-[var(--upload-avatar-size)] w-[var(--upload-avatar-size)] rounded-full"
    : "h-20 w-20 rounded-[var(--upload-radius)]";

  const pictureCardAdd = effectiveListType === "picture-card" && canUpload && (
    <button
      type="button"
      onClick={openPicker}
      className={cn(
        "flex flex-col items-center justify-center gap-1 border border-dashed border-[color:var(--upload-border-hover)] bg-surface-card text-text-tertiary transition-colors duration-base hover:border-[color:var(--upload-border-active)] hover:text-brand",
        cardAddClass
      )}
    >
      <Plus size={18} strokeWidth={1.75} />
      <span className="text-[10px]">{triggerLabel}</span>
    </button>
  );

  const fileListNode = showUploadList && files.length > 0 && (
    <div
      className={cn(
        effectiveListType === "text" && "mt-2",
        effectiveListType === "picture" && "mt-3 space-y-2",
        effectiveListType === "picture-card" && "flex flex-wrap gap-2",
        dragger && "mt-3"
      )}
    >
      {effectiveListType === "text" &&
        files.map((file) => (
          <TextFileItem
            key={file.uid}
            file={file}
            onRemove={() => void handleRemove(file)}
          />
        ))}
      {effectiveListType === "picture" &&
        files.map((file) => (
          <PictureFileItem
            key={file.uid}
            file={file}
            onRemove={() => void handleRemove(file)}
          />
        ))}
      {effectiveListType === "picture-card" && (
        <>
          {files.map((file) => (
            <PictureCardItem
              key={file.uid}
              file={file}
              avatar={avatar}
              onRemove={() => void handleRemove(file)}
              onPreview={
                file.thumbUrl
                  ? () => window.open(file.thumbUrl, "_blank")
                  : undefined
              }
            />
          ))}
          {pictureCardAdd}
        </>
      )}
      {dragger &&
        files.map((file) => (
          <TextFileItem
            key={file.uid}
            file={file}
            onRemove={() => void handleRemove(file)}
          />
        ))}
    </div>
  );

  if (effectiveListType === "picture-card" && files.length === 0 && canUpload) {
    return (
      <div className={cn("inline-flex flex-wrap gap-2", className)}>
        {input}
        {pictureCardAdd}
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-full", className)}>
      {input}
      {dragger ? (
        <>
          <DraggerZone
            disabled={!canUpload}
            inputId={inputId}
            onFiles={processFiles}
            onDrag={() => {}}
          />
          {fileListNode}
        </>
      ) : (
        <>
          {trigger}
          {effectiveListType === "picture-card" ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {files.map((file) => (
                <PictureCardItem
                  key={file.uid}
                  file={file}
                  avatar={avatar}
                  onRemove={() => void handleRemove(file)}
                  onPreview={
                    file.thumbUrl
                      ? () => window.open(file.thumbUrl, "_blank")
                      : undefined
                  }
                />
              ))}
              {pictureCardAdd}
            </div>
          ) : (
            fileListNode
          )}
        </>
      )}
    </div>
  );
}

/** Static showcase — displays predefined file list without upload simulation */
export function UploadShowcase({
  listType = "text",
  dragger = false,
  avatar = false,
  disabled = false,
  files,
  className,
}: {
  listType?: UploadListType;
  dragger?: boolean;
  avatar?: boolean;
  disabled?: boolean;
  files: UploadFile[];
  className?: string;
}) {
  const noop = () => {};

  if (dragger) {
    return (
      <div className={className}>
        <div className="pointer-events-none">
          <DraggerZone
            disabled
            inputId="showcase-dragger"
            onFiles={() => {}}
            onDrag={() => {}}
          />
        </div>
        <div className="mt-3">
          {files.map((file) => (
            <TextFileItem key={file.uid} file={file} onRemove={noop} />
          ))}
        </div>
      </div>
    );
  }

  if (listType === "text") {
    return (
      <div className={className}>
        <Button variant="outline" size="default" disabled={disabled}>
          <UploadIcon size={16} />
          上传文件
        </Button>
        <div className="mt-2">
          {files.map((file) => (
            <TextFileItem key={file.uid} file={file} onRemove={noop} />
          ))}
        </div>
      </div>
    );
  }

  if (listType === "picture") {
    return (
      <div className={className}>
        <Button variant="default" size="default" disabled={disabled}>
          <UploadIcon size={16} />
          上传图片
        </Button>
        <div className="mt-3 space-y-2">
          {files.map((file) => (
            <PictureFileItem key={file.uid} file={file} onRemove={noop} />
          ))}
        </div>
      </div>
    );
  }

  const cardClass = avatar
    ? "h-[var(--upload-avatar-size)] w-[var(--upload-avatar-size)] rounded-full"
    : "h-20 w-20 rounded-[var(--upload-radius)]";

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {files.map((file) => (
        <PictureCardItem
          key={file.uid}
          file={file}
          avatar={avatar}
          onRemove={noop}
          onPreview={file.thumbUrl ? noop : undefined}
        />
      ))}
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-1 border border-dashed border-[color:var(--upload-border-hover)] bg-surface-card text-text-tertiary",
          cardClass
        )}
      >
        <Plus size={18} strokeWidth={1.75} />
        <span className="text-[10px]">上传图片</span>
      </div>
    </div>
  );
}
