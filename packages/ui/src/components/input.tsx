"use client";

import { Eye, EyeOff, Search, X } from "lucide-react";
import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "../lib/utils";

export type InputVisualState =
  | "default"
  | "hover"
  | "focus"
  | "active"
  | "disabled";

const FIELD_BASE =
  "flex w-full items-center gap-2 rounded-input border text-sm transition-all duration-base ease-out";

function getFieldStateClass(state: InputVisualState, filledBg = false) {
  if (state === "disabled") {
    return cn(
      "cursor-not-allowed border-transparent bg-surface-card-soft text-text-disabled shadow-none",
      filledBg && "bg-[#f2f3f5] dark:bg-surface-card-soft"
    );
  }
  if (state === "hover") {
    return cn(
      "border-brand bg-surface-input text-text-primary shadow-[0_0_0_1px_rgba(22,93,255,0.16)]",
      filledBg && "border-transparent bg-[#f2f3f5] dark:bg-surface-card-soft"
    );
  }
  if (state === "focus" || state === "active") {
    return cn(
      "focus-ring border-brand bg-surface-input text-text-primary",
      filledBg && "border-brand bg-[#f2f3f5] dark:bg-surface-card-soft"
    );
  }
  return cn(
    "border-border bg-surface-input text-text-primary shadow-input",
    filledBg && "border-transparent bg-[#f2f3f5] shadow-none dark:bg-surface-card-soft"
  );
}

function Caret() {
  return (
    <span
      className="ml-0.5 inline-block h-[14px] w-[1px] animate-pulse bg-brand"
      aria-hidden
    />
  );
}

function resolveInteractiveState(
  disabled: boolean,
  focused: boolean,
  hovered: boolean
): InputVisualState {
  if (disabled) return "disabled";
  if (focused) return "focus";
  if (hovered) return "hover";
  return "default";
}

function FieldLabel({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-left text-[13px] font-medium text-text-primary"
    >
      {children}
    </label>
  );
}

function StateHint({
  state,
  hint = "移动鼠标或点击输入框，查看默认 / Hover / 聚焦状态",
}: {
  state: InputVisualState;
  hint?: string;
}) {
  const labels: Record<InputVisualState, string> = {
    default: "默认",
    hover: "Hover",
    focus: "聚焦",
    active: "输入中",
    disabled: "禁用",
  };

  return (
    <div className="mt-3 space-y-2 text-left">
      <p className="text-[11px] leading-relaxed text-text-tertiary">{hint}</p>
      <span className="inline-flex items-center rounded-full border border-brand/25 bg-brand-muted/70 px-2.5 py-0.5 text-[11px] font-medium text-brand">
        当前：{labels[state]}
      </span>
    </div>
  );
}

/** 基础输入：默认 / Hover / 聚焦 合一，可真实输入 */
export function InteractiveBasicInput({
  label = "请输入",
  placeholder = "请输入",
  allowClear = false,
  className,
  widthClassName = "w-full max-w-[320px]",
}: {
  label?: string;
  placeholder?: string;
  allowClear?: boolean;
  className?: string;
  widthClassName?: string;
}) {
  const id = "interactive-basic-input";
  const [value, setValue] = useState("");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const fieldState = resolveInteractiveState(false, focused, hovered);
  const showClear = allowClear && value.length > 0;

  return (
    <div className={cn("flex flex-col items-start", widthClassName, className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div
        className="relative w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={cn(
            FIELD_BASE,
            "h-8 min-h-8 px-3",
            getFieldStateClass(fieldState),
            showClear && "pr-8"
          )}
        >
          <input
            id={id}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-placeholder"
          />
          {showClear && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setValue("")}
              className="inline-flex shrink-0 rounded-input p-0.5 text-text-tertiary transition-colors hover:bg-brand-hover hover:text-text-secondary"
              aria-label="清空"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      <StateHint state={fieldState} />
    </div>
  );
}

/** 密码输入：默认 / Hover / 聚焦 合一，支持显隐切换与强度提示 */
export function InteractivePasswordInput({
  label = "密码",
  placeholder = "密码",
  className,
  widthClassName = "w-full max-w-[320px]",
}: {
  label?: string;
  placeholder?: string;
  className?: string;
  widthClassName?: string;
}) {
  const id = "interactive-password-input";
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [eyePulse, setEyePulse] = useState(false);

  const fieldState = resolveInteractiveState(false, focused, hovered);
  const strength =
    value.length === 0
      ? 0
      : value.length < 6
        ? 1
        : /[A-Z]/.test(value) && /[0-9]/.test(value)
          ? 3
          : 2;
  const strengthLabel = ["", "弱", "中", "强"][strength];

  const toggleVisible = () => {
    setVisible((v) => !v);
    setEyePulse(true);
    window.setTimeout(() => setEyePulse(false), 320);
  };

  return (
    <div className={cn("flex flex-col items-start", widthClassName, className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div
        className="relative w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={cn(
            FIELD_BASE,
            "h-8 min-h-8 px-3 pr-9",
            getFieldStateClass(fieldState)
          )}
        >
          <input
            id={id}
            type={visible ? "text" : "password"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-placeholder"
          />
        </div>
        <button
          type="button"
          tabIndex={-1}
          onMouseDown={(e) => e.preventDefault()}
          onClick={toggleVisible}
          className={cn(
            "absolute right-2 top-1/2 inline-flex -translate-y-1/2 rounded-input p-0.5 text-text-tertiary transition-all duration-base hover:bg-brand-hover hover:text-brand",
            eyePulse && "scale-110 text-brand"
          )}
          aria-label={visible ? "隐藏密码" : "显示密码"}
        >
          {visible ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>

      {value.length > 0 && (
        <div className="mt-3 w-full space-y-1.5">
          <div className="flex gap-1">
            {[1, 2, 3].map((level) => (
              <span
                key={level}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-base",
                  strength >= level ? "bg-brand" : "bg-border"
                )}
              />
            ))}
          </div>
          <p className="text-[11px] text-text-tertiary">
            密码强度：<span className="font-medium text-brand">{strengthLabel}</span>
            {visible ? " · 明文预览中" : " · 点击眼睛切换可见性"}
          </p>
        </div>
      )}

      <StateHint
        state={fieldState}
        hint="输入密码并点击眼睛图标，体验 Hover / 聚焦与显隐切换"
      />
    </div>
  );
}

/** 多行文本：默认 / Hover / 聚焦 合一，修复字数统计重叠 */
export function InteractiveTextArea({
  label = "文字请输入",
  placeholder = "文字请输入",
  maxLength = 500,
  className,
  widthClassName = "w-full max-w-[360px]",
}: {
  label?: string;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  widthClassName?: string;
}) {
  const id = "interactive-textarea";
  const [value, setValue] = useState("");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const fieldState = resolveInteractiveState(false, focused, hovered);

  return (
    <div className={cn("flex flex-col items-start", widthClassName, className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div
        className="relative w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <textarea
          id={id}
          value={value}
          maxLength={maxLength}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={cn(
            "min-h-[100px] w-full resize-y rounded-input border px-3 py-2.5 pb-8 text-sm outline-none transition-all duration-base",
            "bg-transparent placeholder:text-text-placeholder",
            getFieldStateClass(fieldState)
          )}
        />
        <span
          className={cn(
            "pointer-events-none absolute bottom-2.5 right-3 text-[11px] tabular-nums",
            "text-text-tertiary"
          )}
        >
          {value.length}/{maxLength}
        </span>
      </div>
      <StateHint state={fieldState} />
    </div>
  );
}

/** 静态展示：标签在上、输入在下，左对齐 */
export function StaticFieldShowcase({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex w-full max-w-[320px] flex-col items-start">
      <FieldLabel>{label}</FieldLabel>
      {children}
      {hint && (
        <p className="mt-2 text-[11px] text-text-tertiary">{hint}</p>
      )}
    </div>
  );
}

export interface InputShowcaseProps {
  state?: InputVisualState;
  placeholder?: string;
  value?: string;
  allowClear?: boolean;
  className?: string;
  widthClassName?: string;
}

export function InputShowcase({
  state = "default",
  placeholder = "请输入",
  value,
  allowClear = false,
  className,
  widthClassName = "w-[200px]",
}: InputShowcaseProps) {
  const disabled = state === "disabled";
  const displayValue =
    value ?? (state === "active" ? "" : allowClear ? "已输入内容" : "");
  const showClear = allowClear && displayValue && !disabled;
  const showCaret = state === "active" && !displayValue;

  return (
    <div className={cn("relative", widthClassName, className)}>
      <div
        className={cn(
          FIELD_BASE,
          "h-8 min-h-8 px-3",
          getFieldStateClass(state)
        )}
      >
        {displayValue ? (
          <span className="min-w-0 flex-1 truncate text-text-primary">
            {displayValue}
            {showCaret && <Caret />}
          </span>
        ) : (
          <span className="min-w-0 flex-1 text-text-placeholder">
            {placeholder}
            {showCaret && <Caret />}
          </span>
        )}
        {showClear && (
          <button
            type="button"
            tabIndex={-1}
            className="inline-flex shrink-0 rounded-input p-0.5 text-text-tertiary transition-colors hover:bg-brand-hover hover:text-text-secondary"
            aria-label="清空"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

export function PasswordInputShowcase({
  state = "default",
  placeholder = "密码",
  className,
  widthClassName = "w-[200px]",
}: Omit<InputShowcaseProps, "allowClear" | "value">) {
  const disabled = state === "disabled";
  const visible = state === "active";
  const masked = state === "focus" || state === "hover";

  return (
    <div className={cn("relative", widthClassName, className)}>
      <div
        className={cn(
          FIELD_BASE,
          "h-8 min-h-8 px-3",
          getFieldStateClass(state)
        )}
      >
        <span
          className={cn(
            "min-w-0 flex-1",
            disabled
              ? "text-text-disabled"
              : masked
                ? "tracking-[0.2em] text-text-primary"
                : visible
                  ? "text-text-primary"
                  : "text-text-placeholder"
          )}
        >
          {disabled
            ? placeholder
            : masked
              ? "••••••"
              : visible
                ? "password"
                : placeholder}
          {visible && <Caret />}
        </span>
        <button
          type="button"
          tabIndex={-1}
          className={cn(
            "inline-flex shrink-0 text-text-tertiary transition-colors",
            !disabled && "hover:text-text-secondary"
          )}
          aria-label={visible ? "隐藏密码" : "显示密码"}
        >
          {visible ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  );
}

export function TextAreaShowcase({
  state = "default",
  placeholder = "文字请输入",
  maxLength = 500,
  value = "",
  className,
  widthClassName = "w-[280px]",
}: InputShowcaseProps & { maxLength?: number }) {
  const disabled = state === "disabled";
  const length = value.length;
  const showCaret = state === "active";

  return (
    <div className={cn("relative w-full", widthClassName, className)}>
      <div
        className={cn(
          "relative min-h-[100px] w-full rounded-input border px-3 py-2.5 pb-8 text-sm transition-all duration-base",
          getFieldStateClass(state)
        )}
      >
        {value ? (
          <p className="whitespace-pre-wrap text-text-primary">
            {value}
            {showCaret && <Caret />}
          </p>
        ) : (
          <p className="text-text-placeholder">
            {placeholder}
            {showCaret && <Caret />}
          </p>
        )}
        <span
          className={cn(
            "pointer-events-none absolute bottom-2.5 right-3 text-[11px] tabular-nums",
            disabled ? "text-text-disabled" : "text-text-tertiary"
          )}
        >
          {length}/{maxLength}
        </span>
      </div>
    </div>
  );
}

export type SearchInputVariant = "icon" | "button-icon" | "button-text";

export function SearchInputShowcase({
  state = "default",
  variant = "icon",
  filled = false,
  placeholder = "请输入",
  className,
  widthClassName = "w-[240px]",
}: {
  state?: InputVisualState;
  variant?: SearchInputVariant;
  filled?: boolean;
  placeholder?: string;
  className?: string;
  widthClassName?: string;
}) {
  const disabled = state === "disabled";
  const fieldClass = getFieldStateClass(state, filled);

  const inputShell = (
    <div
      className={cn(
        FIELD_BASE,
        "h-8 min-h-8 flex-1 px-3",
        variant === "icon" ? "rounded-r-none border-r-0 pr-2" : "rounded-r-none border-r-0",
        fieldClass
      )}
    >
      <span className="flex-1 text-text-placeholder">{placeholder}</span>
      {variant === "icon" && (
        <Search
          size={14}
          className={cn(
            "shrink-0",
            disabled ? "text-text-disabled" : "text-text-tertiary"
          )}
        />
      )}
    </div>
  );

  if (variant === "icon") {
    return (
      <div className={cn(widthClassName, className)}>
        <div className={cn(FIELD_BASE, "h-8 min-h-8 px-3", fieldClass)}>
          <span className="flex-1 text-text-placeholder">{placeholder}</span>
          <Search
            size={14}
            className={cn(
              "shrink-0",
              disabled ? "text-text-disabled" : "text-text-tertiary"
            )}
          />
        </div>
      </div>
    );
  }

  const btnDisabled = disabled ? "opacity-50 pointer-events-none" : "";

  return (
    <div className={cn("flex", widthClassName, className)}>
      {inputShell}
      {variant === "button-icon" ? (
        <button
          type="button"
          className={cn(
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-r-input border border-brand bg-brand text-white shadow-selected transition-colors hover:bg-[var(--color-brand-button-hover)]",
            btnDisabled
          )}
          aria-label="搜索"
        >
          <Search size={14} />
        </button>
      ) : (
        <button
          type="button"
          className={cn(
            "inline-flex h-8 shrink-0 items-center justify-center rounded-r-input border border-brand bg-brand px-4 text-sm font-medium text-white shadow-selected transition-colors hover:bg-[var(--color-brand-button-hover)]",
            btnDisabled
          )}
        >
          搜索
        </button>
      )}
    </div>
  );
}

/* —— Interactive primitives for Usage / Dark sections —— */

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  allowClear?: boolean;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    allowClear,
    value,
    defaultValue,
    onClear,
    disabled,
    onChange,
    ...props
  },
  ref
) {
  const [inner, setInner] = useState(() => String(defaultValue ?? ""));
  const controlled = value !== undefined;
  const current = controlled ? String(value ?? "") : inner;
  const showClear = allowClear && current.length > 0 && !disabled;

  return (
    <div className={cn("relative flex w-full max-w-xs items-center", className)}>
      <input
        ref={ref}
        disabled={disabled}
        value={current}
        onChange={(e) => {
          if (!controlled) setInner(e.target.value);
          onChange?.(e);
        }}
        className={cn(
          FIELD_BASE,
          "h-8 min-h-8 px-3 outline-none placeholder:text-text-placeholder",
          "border-border bg-surface-input shadow-input",
          "focus:focus-ring disabled:cursor-not-allowed disabled:border-transparent disabled:bg-surface-card-soft disabled:text-text-disabled disabled:shadow-none",
          showClear && "pr-8"
        )}
        {...props}
      />
      {showClear && (
        <button
          type="button"
          onClick={() => {
            if (!controlled) setInner("");
            onClear?.();
          }}
          className="absolute right-2 inline-flex rounded-input p-0.5 text-text-tertiary hover:bg-brand-hover hover:text-text-secondary"
          aria-label="清空"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
});

export interface PasswordInputProps extends InputProps {
  defaultVisible?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    { className, defaultVisible = false, disabled, ...props },
    ref
  ) {
    const [visible, setVisible] = useState(defaultVisible);

    return (
      <div className={cn("relative flex w-full max-w-xs items-center", className)}>
        <input
          ref={ref}
          type={visible ? "text" : "password"}
          disabled={disabled}
          className={cn(
            FIELD_BASE,
            "h-8 min-h-8 px-3 pr-9 outline-none placeholder:text-text-placeholder",
            "border-border bg-surface-input shadow-input",
            "focus:focus-ring disabled:cursor-not-allowed disabled:border-transparent disabled:bg-surface-card-soft disabled:text-text-disabled disabled:shadow-none"
          )}
          {...props}
        />
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-2 text-text-tertiary hover:text-text-secondary disabled:pointer-events-none"
          aria-label={visible ? "隐藏密码" : "显示密码"}
        >
          {visible ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    );
  }
);

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  showCount?: boolean;
}

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: SearchInputVariant;
  filled?: boolean;
  onSearch?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    { className, variant = "icon", filled = false, placeholder, disabled, onSearch, ...props },
    ref
  ) {
    const fieldClass = cn(
      FIELD_BASE,
      "h-8 min-h-8 flex-1 px-3 outline-none placeholder:text-text-placeholder",
      filled
        ? "border-transparent bg-[#f2f3f5] shadow-none dark:bg-surface-card-soft"
        : "border-border bg-surface-input shadow-input",
      "focus:focus-ring disabled:cursor-not-allowed disabled:border-transparent disabled:bg-surface-card-soft disabled:shadow-none"
    );

    if (variant === "icon") {
      return (
        <div className={cn("relative flex w-full max-w-xs items-center", className)}>
          <input ref={ref} disabled={disabled} placeholder={placeholder} className={cn(fieldClass, "pr-9")} {...props} />
          <button
            type="button"
            disabled={disabled}
            onClick={onSearch}
            className="absolute right-2 text-text-tertiary hover:text-brand disabled:pointer-events-none"
            aria-label="搜索"
          >
            <Search size={14} />
          </button>
        </div>
      );
    }

    return (
      <div className={cn("flex w-full max-w-xs", className)}>
        <input
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(fieldClass, "rounded-r-none border-r-0")}
          {...props}
        />
        {variant === "button-icon" ? (
          <button
            type="button"
            disabled={disabled}
            onClick={onSearch}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-r-input border border-brand bg-brand text-white hover:bg-[var(--color-brand-button-hover)] disabled:opacity-50"
            aria-label="搜索"
          >
            <Search size={14} />
          </button>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={onSearch}
            className="inline-flex h-8 shrink-0 items-center justify-center rounded-r-input border border-brand bg-brand px-4 text-sm font-medium text-white hover:bg-[var(--color-brand-button-hover)] disabled:opacity-50"
          >
            搜索
          </button>
        )}
      </div>
    );
  }
);

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      className,
      maxLength = 500,
      showCount = true,
      value,
      defaultValue,
      disabled,
      onChange,
      ...props
    },
    ref
  ) {
    const [inner, setInner] = useState(String(defaultValue ?? ""));
    const controlled = value !== undefined;
    const current = controlled ? String(value ?? "") : inner;
    const length = current.length;

    return (
      <div className={cn("relative w-full max-w-md", className)}>
        <textarea
          ref={ref}
          disabled={disabled}
          maxLength={maxLength}
          value={current}
          onChange={(e) => {
            if (!controlled) setInner(e.target.value);
            onChange?.(e);
          }}
          className={cn(
            "min-h-[88px] w-full resize-y rounded-input border px-3 py-2.5 text-sm outline-none transition-all duration-base",
            "border-border bg-surface-input shadow-input placeholder:text-text-placeholder",
            "focus:focus-ring disabled:cursor-not-allowed disabled:border-transparent disabled:bg-surface-card-soft disabled:text-text-disabled",
            showCount && "pb-7"
          )}
          {...props}
        />
        {showCount && (
          <span className="pointer-events-none absolute bottom-2.5 right-3 text-[11px] tabular-nums text-text-tertiary">
            {length}/{maxLength}
          </span>
        )}
      </div>
    );
  }
);
