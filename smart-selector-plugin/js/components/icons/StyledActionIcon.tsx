import React from 'react';

const StyledActionIcon = ({
  children,
  onClick,
}: {
  children: React.ReactNode;

  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center rounded-md justify-center w-7 h-7 p-[.3rem] cursor-pointer text-wht-100 hover:text-wht-0 hover:bg-blk-200`}
    >
      {children}
    </div>
  );
};

export default StyledActionIcon;
