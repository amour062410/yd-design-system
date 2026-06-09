"use client";

import { AlertCircle, AlertTriangle } from "lucide-react";
import type { RefObject } from "react";
import { Button } from "../button";
import { popconfirmFooterClass } from "./popconfirm.styles";
import type { PopconfirmContentProps } from "./popconfirm.types";

function DefaultIcon({ danger }: { danger?: boolean }) {
  const size = 18;
  if (danger) {
    return (
      <AlertCircle
        size={size}
        className="shrink-0 text-[color:var(--popconfirm-danger,#f53f3f)]"
        aria-hidden
      />
    );
  }
  return (
    <AlertTriangle
      size={size}
      className="shrink-0 text-[color:var(--popconfirm-warning,#ff7d00)]"
      aria-hidden
    />
  );
}

export function PopconfirmContent({
  title,
  description,
  icon,
  danger,
  confirmText,
  cancelText,
  loading,
  onConfirm,
  onCancel,
  id,
  cancelButtonRef,
}: PopconfirmContentProps) {
  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-desc` : undefined}
      className="w-[var(--popconfirm-width,260px)]"
    >
      <div className="flex gap-3">
        {icon ?? <DefaultIcon danger={danger} />}
        <div className="min-w-0 flex-1">
          <div
            id={`${id}-title`}
            className="text-sm font-semibold leading-[22px] text-[color:var(--popconfirm-title-color,#1d2129)]"
          >
            {title}
          </div>
          {description ? (
            <p
              id={`${id}-desc`}
              className="mt-1 text-[13px] leading-5 text-[color:var(--popconfirm-description-color,#4e5969)]"
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>
      <div className={popconfirmFooterClass()}>
        <Button
          ref={cancelButtonRef as RefObject<HTMLButtonElement>}
          size="sm"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          {cancelText}
        </Button>
        <Button
          size="sm"
          variant={danger ? "destructive" : "default"}
          loading={loading}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
}
