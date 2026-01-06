import React from 'react';

interface LabeledCheckboxProps {
  value: boolean;
  handleOnChange: (e: React.MouseEvent<HTMLDivElement>) => void;
  label: string;
}

const LabeledCheckbox: React.FC<LabeledCheckboxProps> = ({
  value,
  handleOnChange,
  label,
}) => {
  return (
    <div
      onClick={handleOnChange}
      className="group flex items-center w-full justify-between cursor-pointer"
    >
      <span className="text-xs text-wht-200">{label}</span>
      <div className="relative inline-block w-[18px] h-[18px] min-w-[18px] min-h-[18px]">
        <input
          type="checkbox"
          checked={value}
          className="absolute top-0 left-0 opacity-0 w-full h-full"
          readOnly
        />
        <span className="absolute top-0 left-0 w-full h-full border border-gray-500 rounded-sm transition-colors"></span>
        <div
          className={`absolute top-[5px] left-[5px] w-[8px] h-[8px] bg-blue-500 transition-all duration-70 ease-in-out transform ${
            value ? 'scale-100' : 'scale-0 group-hover:scale-[.4]'
          } `}
        />
      </div>
    </div>
  );
};

export default LabeledCheckbox;
