import { useState } from 'react';

interface LabeledInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  isVisible?: boolean;
  type?: string;
}

export default function LabeledInput({
  value,
  onChange,
  label,
  type = 'text',
  isVisible = true,
}: LabeledInputProps) {
  if (!isVisible) return null;

  return (
    <div className="flex w-full gap-2 group items-center justify-center">
      <label
        className="text-xs text-wht-200 whitespace-nowrap"
        style={{ userSelect: 'none' }}
      >
        {label}
      </label>

      <input
        type={type}
        className={`text-xs pl-2 py-1 h-full w-full input rounded-md bg-transparent group-hover:bg-blk-300 focus:bg-blk-300 text-wht-200 hover:text-wht-100 focus:ring-0 focus:outline-none border-blk-400 border-2`}
        value={value}
        onClick={(e) => {
          e.currentTarget.focus();
        }}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
