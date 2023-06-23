"use client";

import { IconType } from "react-icons";

interface Props {
  onClick: (label: string) => void;
  selected?: boolean;
  icon: IconType;
  label: string;
}

const CategoryInput: React.FC<Props> = ({
  icon: Icon,
  label,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? "border-black" : "border-neutral-200"}
        ${selected ? "bg-neutral-100" : "bg-white"}
        `}
    >
      <Icon size={30} />
      <div className="font-semibold "> {label}</div>
    </div>
  );
};

export default CategoryInput;
