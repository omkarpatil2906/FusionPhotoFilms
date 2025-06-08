import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const CommonButton = ({
  type,
  onClick,
  label,
  className,
  disabled,
  searchIcon,
}) => {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      disabled={disabled}
      className={
        !disabled
          ? `h-9 px-6 w-max rounded-lg text-sm font-medium ${className}`
          : `h-9 px-6 w-max rounded-lg text-sm font-medium bg-gray-400  text-white`
      }
    >
      {label}
      {searchIcon && <SearchIcon className="cursor-pointer" />}
    </button>
  );
};

export default CommonButton;