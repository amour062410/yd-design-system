import { EMPTY_ILLUSTRATION_COLORS as C } from "./empty-illustration-colors";
import { EmptyIllustrationFrame } from "./empty-illustration-frame";

function TextLines({ x, y }: { x: number; y: number }) {
  return (
    <>
      <rect x={x} y={y} width={36} height={3} rx={1.5} fill={C.white} />
      <rect x={x} y={y + 8} width={28} height={3} rx={1.5} fill={C.white} />
      <rect x={x} y={y + 16} width={32} height={3} rx={1.5} fill={C.white} />
    </>
  );
}

function DocBlock({
  x,
  y,
  w,
  h,
  green = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  green?: boolean;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill={green ? C.mint : C.gray} />
      <TextLines x={x + 10} y={y + 14} />
      <circle cx={x + w - 12} cy={y + h - 12} r={4} fill={C.white} />
    </g>
  );
}

/** 填充式 Wi-Fi 弧带（无描边） */
function WifiBands({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <path
        d={`M${cx - 24} ${cy} Q${cx} ${cy - 28} ${cx + 24} ${cy} L${cx + 20} ${cy - 2} Q${cx} ${cy - 22} ${cx - 20} ${cy - 2} Z`}
        fill={C.gray}
      />
      <path
        d={`M${cx - 16} ${cy} Q${cx} ${cy - 18} ${cx + 16} ${cy} L${cx + 13} ${cy - 2} Q${cx} ${cy - 14} ${cx - 13} ${cy - 2} Z`}
        fill={C.grayDark}
      />
      <path
        d={`M${cx - 8} ${cy} Q${cx} ${cy - 10} ${cx + 8} ${cy} L${cx + 6} ${cy - 2} Q${cx} ${cy - 8} ${cx - 6} ${cy - 2} Z`}
        fill={C.gray}
      />
      <circle cx={cx} cy={cy} r={4} fill={C.grayDark} />
    </>
  );
}

/** 参考稿：Communication Empty */
export function CommunicationEmptyIllustration() {
  return (
    <EmptyIllustrationFrame>
      <rect x="38" y="34" width="72" height="48" rx="2" fill={C.gray} />
      <path d="M50 82 L38 82 L44 72 Z" fill={C.gray} />
      <TextLines x={50} y={48} />
      <rect x="98" y="78" width="64" height="42" rx="2" fill={C.grayDark} />
      <path d="M110 120 L98 120 L104 110 Z" fill={C.grayDark} />
      <circle cx={112} cy={96} r={3} fill={C.white} />
      <circle cx={122} cy={96} r={3} fill={C.white} />
      <circle cx={132} cy={96} r={3} fill={C.white} />
    </EmptyIllustrationFrame>
  );
}

/** 参考稿：Network Empty */
export function NetworkEmptyIllustration() {
  return (
    <EmptyIllustrationFrame accent="green">
      <rect x="72" y="108" width="56" height="10" rx="2" fill={C.gray} />
      <rect x="78" y="118" width="8" height="6" rx="1" fill={C.grayDark} />
      <rect x="114" y="118" width="8" height="6" rx="1" fill={C.grayDark} />
      <WifiBands cx={100} cy={98} />
      <path d="M96 62 L104 78 L92 78 Z" fill={C.blue} />
      <rect x="50" y="94" width="14" height="4" rx="2" fill={C.grayDark} transform="rotate(-35 57 96)" />
    </EmptyIllustrationFrame>
  );
}

/** 参考稿：Task Empty */
export function TaskEmptyIllustration() {
  return (
    <EmptyIllustrationFrame accent="green" showDecor={false}>
      <DocBlock x={58} y={44} w={52} h={64} />
      <DocBlock x={96} y={72} w={58} h={44} />
      <rect x="118" y="28" width="34" height="28" rx="2" fill={C.mint} />
      <path
        d="M132 58 C138 52 148 48 158 44 C162 58 158 68 148 74 C140 78 134 72 132 58 Z"
        fill={C.white}
      />
      <path d="M141 46 L145 50 L153 40 L155 42 L145 54 L139 48 Z" fill={C.grayDark} />
      <path
        d="M54 118 C62 110 72 104 84 100 C92 112 88 124 76 128 C66 132 58 126 54 118 Z"
        fill={C.white}
      />
      <path d="M148 88 C156 84 164 88 168 96 L166 100 C160 96 154 94 148 96 Z" fill={C.blue} />
    </EmptyIllustrationFrame>
  );
}

export function DefaultEmptyIllustration() {
  return (
    <EmptyIllustrationFrame>
      <rect x="62" y="48" width="76" height="58" rx="4" fill={C.gray} />
      <rect x="72" y="104" width="56" height="4" rx="2" fill={C.grayDark} />
      <rect x="88" y="62" width="24" height="4" rx="2" fill={C.white} />
      <rect x="82" y="72" width="36" height="4" rx="2" fill={C.white} />
      <rect x="86" y="82" width="28" height="4" rx="2" fill={C.white} />
    </EmptyIllustrationFrame>
  );
}

export function SearchEmptyIllustration() {
  return (
    <EmptyIllustrationFrame>
      <circle cx="92" cy="72" r="28" fill={C.gray} />
      <circle cx="92" cy="72" r="18" fill={C.white} />
      <rect x="108" y="88" width="28" height="8" rx="4" fill={C.grayDark} transform="rotate(45 122 92)" />
      <rect x="78" y="66" width="28" height="4" rx="2" fill={C.grayDark} />
      <circle cx="138" cy="118" r="5" fill={C.blue} />
    </EmptyIllustrationFrame>
  );
}

export function FilterEmptyIllustration() {
  return (
    <EmptyIllustrationFrame accent="green">
      <path d="M68 44 H132 L108 78 V108 L92 116 L76 108 V78 Z" fill={C.gray} />
      <rect x="86" y="56" width="28" height="4" rx="2" fill={C.white} />
      <rect x="90" y="66" width="20" height="4" rx="2" fill={C.white} />
      <circle cx="100" cy="88" r="6" fill={C.blue} />
    </EmptyIllustrationFrame>
  );
}

export function DocumentEmptyIllustration() {
  return (
    <EmptyIllustrationFrame>
      <DocBlock x={70} y={40} w={60} h={76} />
      <rect x="118" y="52" width="18" height="10" rx="1" fill={C.blue} />
    </EmptyIllustrationFrame>
  );
}

export function FolderEmptyIllustration() {
  return (
    <EmptyIllustrationFrame accent="green">
      <path d="M58 58 H92 L100 68 H142 V118 H58 Z" fill={C.gray} />
      <path d="M58 58 H92 L100 68 H142 V72 H58 Z" fill={C.grayDark} />
      <rect x="72" y="82" width="52" height="4" rx="2" fill={C.white} />
      <rect x="72" y="92" width="40" height="4" rx="2" fill={C.white} />
      <circle cx="126" cy="104" r="5" fill={C.mint} />
    </EmptyIllustrationFrame>
  );
}

export function InspectionEmptyIllustration() {
  return (
    <EmptyIllustrationFrame accent="green">
      <rect x="68" y="38" width="64" height="84" rx="4" fill={C.gray} />
      <rect x="82" y="30" width="36" height="12" rx="2" fill={C.grayDark} />
      <TextLines x={80} y={56} />
      <path d="M88 92 L96 100 L116 78 L118 82 L96 106 L86 94 Z" fill={C.green} />
    </EmptyIllustrationFrame>
  );
}

export function RectificationEmptyIllustration() {
  return (
    <EmptyIllustrationFrame>
      <rect x="78" y="44" width="44" height="72" rx="4" fill={C.gray} />
      <rect x="96" y="36" width="8" height="12" rx="2" fill={C.grayDark} />
      <path d="M92 88 L108 104 L124 72 L120 70 L106 98 L94 86 Z" fill={C.blue} />
      <circle cx="118" cy="56" r="6" fill={C.mint} />
    </EmptyIllustrationFrame>
  );
}

export function RiskEmptyIllustration() {
  return (
    <EmptyIllustrationFrame>
      <path d="M100 42 L132 98 H68 Z" fill={C.gray} />
      <path d="M100 46 L126 94 H74 Z" fill={C.grayDark} opacity="0.35" />
      <rect x="96" y="68" width="8" height="16" rx="2" fill={C.white} />
      <circle cx="100" cy="90" r="4" fill={C.blue} />
    </EmptyIllustrationFrame>
  );
}

export function StoreEmptyIllustration() {
  return (
    <EmptyIllustrationFrame accent="green">
      <rect x="70" y="70" width="60" height="44" fill={C.gray} />
      <path d="M64 70 L100 46 L136 70 Z" fill={C.grayDark} />
      <rect x="88" y="86" width="24" height="28" fill={C.white} />
      <rect x="78" y="78" width="12" height="12" fill={C.white} />
      <rect x="110" y="78" width="12" height="12" fill={C.white} />
      <circle cx="124" cy="58" r="5" fill={C.blue} />
    </EmptyIllustrationFrame>
  );
}

export function DeviceEmptyIllustration() {
  return (
    <EmptyIllustrationFrame>
      <rect x="62" y="48" width="76" height="52" rx="4" fill={C.gray} />
      <rect x="70" y="56" width="60" height="36" rx="2" fill={C.white} />
      <rect x="88" y="104" width="24" height="6" rx="2" fill={C.grayDark} />
      <rect x="80" y="110" width="40" height="4" rx="2" fill={C.gray} />
      <circle cx="132" cy="68" r="5" fill={C.green} />
    </EmptyIllustrationFrame>
  );
}

export function PermissionEmptyIllustration() {
  return (
    <EmptyIllustrationFrame>
      <rect x="82" y="72" width="36" height="40" rx="4" fill={C.gray} />
      <path
        d="M90 72 V60 C90 52 96 46 100 46 C104 46 110 52 110 60 V72 H90 Z"
        fill={C.grayDark}
      />
      <circle cx="100" cy="90" r="5" fill={C.white} />
      <rect x="98" y="94" width="4" height="10" rx="1" fill={C.blue} />
    </EmptyIllustrationFrame>
  );
}

export function OfflineEmptyIllustration() {
  return (
    <EmptyIllustrationFrame accent="green">
      <path
        d="M64 96 C78 80 92 72 100 72 C108 72 122 80 136 96 L132 94 C120 82 110 76 100 76 C90 76 80 82 68 94 Z"
        fill={C.gray}
      />
      <path
        d="M76 104 C86 94 94 90 100 90 C106 90 114 94 124 104 L120 102 C112 96 106 94 100 94 C94 94 88 96 80 102 Z"
        fill={C.grayDark}
      />
      <rect x="95" y="54" width="6" height="64" rx="3" fill={C.blue} transform="rotate(-35 98 86)" />
      <circle cx="132" cy="52" r="5" fill={C.mint} />
    </EmptyIllustrationFrame>
  );
}

export function ErrorEmptyIllustration() {
  return (
    <EmptyIllustrationFrame>
      <rect x="70" y="44" width="60" height="76" rx="4" fill={C.gray} />
      <TextLines x={80} y={58} />
      <circle cx="100" cy="96" r="10" fill={C.white} />
      <rect x="96" y="90" width="8" height="14" rx="2" fill={C.blue} />
      <circle cx="100" cy="108" r="2" fill={C.blue} />
    </EmptyIllustrationFrame>
  );
}
