import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl } from "@mui/material";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import ReactSelect, { components } from "react-select";
const DropdownField = ({
  className,
  isDisabled,
  placeholdernotVisible,
  isMulti,
  inputRef,
  control,
  error,
  dataArray,
  name,
  handleInputChange,
  placeholder,
  isClearable,
  defaultValue,
  searchIcon,
  isSearchable,
  menuPlacement,
  menuShouldBlockScroll,
}) => {
  const ref = useRef(null);
  const [width, setWidth] = useState("full"); 
  let isError = !!error?.message;
  let bgColor = "rgba(255, 255, 255, 1)";
  // dummyChanges
  if (menuPlacement) {
    // menuPlacement = "";
  } else {
    menuPlacement = "bottom";
  }
  if (menuShouldBlockScroll !== true) {
    menuShouldBlockScroll = false;
  }
  useLayoutEffect(() => {
    if (isClearable) {
      setWidth(ref.current.offsetWidth - 72);
    } else {
      setWidth(ref.current.offsetWidth - 52);
    }
  }, []);
  if (isSearchable !== true) {
    isSearchable = false;
  }

  const selectStyles = {
    menu: (styles) => ({
      ...styles,
      position: "absolute",
      boxShadow: "0 20px 54px 0 rgba(0,0,0,0.2)",
      zIndex: 1300,
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "24px",
      minWidth: ref.current.offsetWidth,
      width: "fit-content",
      fontFamily: "'Belleza', sans-serif", // Apply Belleza font
    }),
    option: (provided, { isDisabled, isFocused, isSelected }) => ({
      ...provided,
      whiteSpace: "nowrap",
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "rgba(222,235,255,1)"
        : isFocused
        ? "rgba(222,235,255,0.5)"
        : undefined,

      color: isDisabled
        ? undefined
        : isSelected
        ? "#000000"
        : isFocused
        ? "#000000"
        : undefined,
      fontFamily: "'Belleza', sans-serif", // Apply Belleza font
    }),
    control: (Colstyles, state) => ({
      ...Colstyles,
      borderRadius: "5px",
      minHeight: "45.3px",
      fontSize: "14px",
      maxHeight: "fit-content",
      textOverflow: "ellipsis",
      display: "flex",
      flexWrap: isMulti ? "wrap" : "nowrap",
      border: isError
        ? state.isSelected
          ? "1px solid #1c7e80"
          : state.isFocused
          ? "1px solid #1c7e80"
          : state.hasValue || state.selectProps.inputValue
          ? "1px solid #1c7e80"
          : "1px solid #1c7e80"
        : state.hasValue || state.selectProps.inputValue
        ? "2px solid #1c7e80"
        : "1px solid #1c7e80",
      "&:hover": {
        cursor: isDisabled ? "not-allowed" : "pointer",
        "& .css-1f1r5zb-singleValue, & div[class*='-singleValue']": {
          color: "# !important",
        },
      },
    }),
    singleValue: (Singstyles, { isDisabled }) => ({
      ...Singstyles,
      display: "flex",
      paddingLeft: "4px",
      maxWidth: width,
      textOverflow: "ellipsis",
      color: "#000000",
      marginLeft:"5px",
      fontSize:"18px",
      opacity: isDisabled ? 0.5 : 1, 
      fontFamily: "'Belleza', sans-serif", 
      "&:hover": {
        color: "#000000",
      },
    }),
    indicatorSeparator: (styles) => ({ display: "none", paddingX: "2px" }),
    valueContainer: (provided, state) => ({
      ...provided,
      position: "relative",
      fontSize: "14px",
      maxWidth: width,
      whiteSpace: "nowrap",
      overflow: "visible",
      color: "#1c7e80", // Changed to gray color to match singleValue
      padding: "0px",
      display: "flex",
      flexWrap: isMulti ? "wrap" : "nowrap",
      maxHeight: "fit-content",
      textOverflow: "ellipsis", // Changed from "clipped" to "ellipsis"
      paddingLeft: state.hasValue || state.selectProps.inputValue ? 3 : 2,
      fontStyle: "normal",
      fontFamily: "'Belleza', sans-serif", // Apply Belleza font
      "&:hover, &:active, &:focus": {
        color: "#1c7e80", // Keep gray color on all states
      }
    }),
    input: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      overflow: "clip",
      fontFamily: "'Belleza', sans-serif", // Apply Belleza font
    }),
    placeholder: (provided, state) => ({
      ...provided,
      display: placeholdernotVisible
        ? state.menuIsOpen ||
          state.selectProps.menuIsOpen ||
          state.hasValue ||
          state.selectProps.inputValue
          ? "none"
          : "block"
        : "block",

      position: "absolute",
      borderRadius: "2px",
      color:
        state.menuIsOpen || state.selectProps.menuIsOpen
          ? isDisabled
            ? "#eaeaea"
            : "#1976D2"
          : isError
          ? "#d32f2f"
          : "#1c7e80",

      fontSize:
        (state.menuIsOpen ||
          state.selectProps.menuIsOpen ||
          state.hasValue ||
          state.selectProps.inputValue) ?
        14:20,
      transition: "top 0.1s, font-size 0.1s",

      top:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? isSearchable
            ? -12
            : -20
          : isSearchable
          ? 6
          : -5,

      paddingLeft:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? 4
          : "",

      paddingRight:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? 4
          : "",

      marginBottom:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? 2
          : "",

      backgroundColor:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? isDisabled
            ? "#f0f0f0"
            : bgColor
          : "",

      zIndex:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? 10
          : "",

      fontStyle: "normal",
      fontFamily: "'Belleza', sans-serif", // Apply Belleza font
      marginLeft:'10px'
    }),
  };
  const { ValueContainer, Placeholder } = components;

  const CustomValueContainer = ({ children, ...props }) => {
    return (
      <ValueContainer {...props}>
        <Placeholder {...props} isFocused={props.isFocused}>
          {props.selectProps.placeholder}
        </Placeholder>
        {React.Children.map(children, (child) =>
          child && child.type !== Placeholder ? child : null
        )}
      </ValueContainer>
    );
  };
  return (
    <div className="w-full font-['Belleza',sans-serif]" ref={ref}>
      <FormControl fullWidth sx={{ overFlowX: "hidden", fontFamily: "'Belleza', sans-serif" }}>
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => (
            <ReactSelect
              hideSelectedOptions={true}
              className={className + "text-[14px] text-gray-800 w-full capitalize"}
              isDisabled={isDisabled}
              inputRef={inputRef}
              {...field}
              ref={null}
              isMulti={isMulti}
              closeMenuOnSelect={isMulti ? false : true}
              options={dataArray}
              isClearable={isClearable}
              clearValue={true}
              isSearchable={isSearchable}
              placeholder={placeholder}
              defaultValue={defaultValue}
              // styles={selectStyles}
              blurInputOnSelect={true}
              menuPlacement={menuPlacement}
              menuShouldBlockScroll={menuShouldBlockScroll}
              menuPortalTarget={document.body}
              styles={{
                ...selectStyles,
                menuPortal: (base) => ({
                  ...base,
                  zIndex:1300,
                  }),
              }}
              components={{
                DropdownIndicator: () =>
                  isMulti ? (
                    <KeyboardArrowDownIcon className="mx-2 text-gray-600" />
                  ) : searchIcon ? (
                    <SearchIcon className="mx-2 text-gray-600" />
                  ) : (
                    <KeyboardArrowDownIcon className="mx-2 text-gray-600" />
                  ),
                ValueContainer: CustomValueContainer,
              }}
            />
          )}
        />
      </FormControl>
    </div>
  );
};

export default DropdownField;