"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { cn } from "../../lib/utils";
import {
  getInputNumberControlClass,
  getInputNumberRootClass,
  getInputNumberUnitClass,
  getStepButtonClass,
  inputNumberCssVars,
} from "./input-number.styles";
import type { InputNumberProps } from "./input-number.types";
import {
  clampNumber,
  formatNumberValue,
  getValidStepValue,
  parseNumberValue,
  roundToPrecision,
} from "./input-number.utils";

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  function InputNumber(
    {
      value: controlledValue,
      defaultValue,
      min,
      max,
      step = 1,
      precision,
      disabled = false,
      readOnly = false,
      status,
      size = "default",
      prefix,
      suffix,
      unit,
      placeholder,
      controls = true,
      formatter,
      parser,
      onChange,
      onBlur,
      onFocus,
      className,
      style,
      id,
      name,
    },
    ref
  ) {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<number | null>(
      defaultValue ?? null
    );
    const [inputText, setInputText] = useState(() =>
      formatNumberValue(defaultValue ?? null, precision, formatter)
    );
    const [focused, setFocused] = useState(false);
    const innerRef = useRef<HTMLInputElement | null>(null);

    const value = isControlled ? controlledValue ?? null : internalValue;

    useEffect(() => {
      if (!focused) {
        setInputText(formatNumberValue(value, precision, formatter));
      }
    }, [focused, formatter, precision, value]);

    const emitChange = useCallback(
      (next: number | null) => {
        if (!isControlled) setInternalValue(next);
        onChange?.(next);
      },
      [isControlled, onChange]
    );

    const commitValue = useCallback(
      (raw: string) => {
        const parsed = parseNumberValue(raw, parser);
        if (parsed === null) {
          emitChange(null);
          setInputText("");
          return;
        }
        const rounded = roundToPrecision(parsed, precision);
        const clamped = clampNumber(rounded, min, max);
        emitChange(clamped);
        setInputText(formatNumberValue(clamped, precision, formatter));
      },
      [emitChange, formatter, max, min, parser, precision]
    );

    const handleStep = useCallback(
      (direction: 1 | -1) => {
        if (disabled || readOnly) return;
        const next = getValidStepValue(value, step, direction, min, max, precision);
        emitChange(next);
        setInputText(formatNumberValue(next, precision, formatter));
        innerRef.current?.focus();
      },
      [disabled, emitChange, formatter, max, min, precision, readOnly, step, value]
    );

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;
      if (event.key === "ArrowUp") {
        event.preventDefault();
        handleStep(1);
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        handleStep(-1);
      }
    };

    const assignRef = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const upDisabled = disabled || (max !== undefined && value !== null && value >= max);
    const downDisabled =
      disabled || (min !== undefined && value !== null && value <= min);

    return (
      <div
        className={getInputNumberRootClass({ size, status, disabled, focused, className })}
        style={{ ...inputNumberCssVars, ...style }}
      >
        {prefix ? (
          <span className="flex shrink-0 items-center border-r border-[color:var(--input-number-border-default,#d9d9d9)] px-2">
            {prefix}
          </span>
        ) : null}

        <div className="flex min-w-0 flex-1 items-center px-2">
          <input
            ref={assignRef}
            id={id}
            name={name}
            type="text"
            inputMode="decimal"
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            value={inputText}
            onFocus={() => {
              setFocused(true);
              onFocus?.();
            }}
            onBlur={() => {
              setFocused(false);
              commitValue(inputText);
              onBlur?.();
            }}
            onChange={(event) => setInputText(event.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              "min-w-0 flex-1 bg-transparent text-right outline-none placeholder:text-[color:var(--input-number-text-placeholder,rgba(0,0,0,0.25))]",
              disabled && "cursor-not-allowed",
              status === "error" && "text-[color:var(--input-number-text-error,#ff4d4f)]",
              status === "warning" && "text-[color:var(--input-number-text-warning,#faad14)]",
              !status && !disabled && "text-[color:var(--input-number-text,#181818)]"
            )}
            aria-invalid={status === "error" ? true : undefined}
          />
          {unit ? <span className={getInputNumberUnitClass()}>{unit}</span> : null}
          {suffix ? (
            <span className="shrink-0 pl-[var(--input-number-unit-gap,8px)] text-[color:var(--input-number-unit-color,rgba(0,0,0,0.45))]">
              {suffix}
            </span>
          ) : null}
        </div>

        {controls ? (
          <div className={getInputNumberControlClass(size)}>
            <button
              type="button"
              tabIndex={-1}
              disabled={upDisabled}
              aria-label="增加"
              className={cn(
                getStepButtonClass(upDisabled, disabled),
                "border-b border-[color:var(--input-number-border-default,#d9d9d9)]"
              )}
              onClick={() => handleStep(1)}
            >
              <ChevronUp className="size-3" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              tabIndex={-1}
              disabled={downDisabled}
              aria-label="减少"
              className={getStepButtonClass(downDisabled, disabled)}
              onClick={() => handleStep(-1)}
            >
              <ChevronDown className="size-3" strokeWidth={2.5} />
            </button>
          </div>
        ) : null}
      </div>
    );
  }
);
