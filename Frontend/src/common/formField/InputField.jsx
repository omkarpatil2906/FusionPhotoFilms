import React from "react";
import { FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import "./style.css";

const InputField = ({
  sx,
  ref,
  focused,
  variant,
  defaultValue,
  inputProps,
  type,
  disabled,
  inputRef,
  name,
  label,
  error,
  onKeyDown,
  control,
  dontCapitalize,
  color,
  shrink,
  onBlurCapture,
  id,
  placeholder,
  onFocus,
}) => {
  return (
    <FormControl fullWidth size="small" sx={sx}>
      <Controller
        render={({ field }) => (
          <fieldset disabled={disabled}>
            <TextField
              id={id}
              className="h-[35px] text-[14px] bg-white"
              inputRef={inputRef}
              ref={ref ? ref : null}
              autoComplete="off"
              onKeyDown={onKeyDown}
              onBlurCapture={onBlurCapture}
              onFocus={onFocus}
              inputProps={
                dontCapitalize
                  ? (inputProps,
                  {
                    style: {
                      fontSize: "18px",
                      height: "28.5px",
                    },
                  })
                  : (inputProps,
                  {
                    style: {
                      textTransform: "capitalize",
                      fontSize: "18px",
                      height: "30.5px",
                    },
                  })
              }
              sx={{
                "& .MuiFormLabel-root": {
                  fontSize: "20px",
                  color: "#1c7e80",
                  fontFamily: "'Belleza', sans-serif",
                  ...(shrink
                    ? {
                      position: "absolute",
                      top: -4,
                      marginRight: 0,
                      marginLeft:-0.3
                    }
                    : {
                        position: "absolute",
                        top: -1,
                        marginRight: 0,
                        marginLeft:-0.3
                      }),
                },
                "& .MuiOutlinedInput-root": {
                  fontFamily: "'Belleza', sans-serif", 
                  "& input": {
                    fontSize: "18px",
                    fontFamily: "'Belleza', sans-serif", 
                    ...(dontCapitalize
                      ? {
                          textTransform: "none",
                        }
                      : {
                          textTransform: "capitalize",
                        }),
                  },
                  "& fieldset": {
                    borderColor: "#1c7e80",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1c7e80",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1c7e80",
                  },
                },
                "& input::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                },
              }}
              autoFocus={focused ? true : false}
              onWheel={(e) => {
                if (type === "number") {
                  e.target.blur();
                }
              }}
              type={type}
              error={!!error?.message}
              color={color}
              variant={variant}
              label={label}
              placeholder={placeholder ? placeholder : label}
              name={name}
              fullWidth
              {...field}
              size="small"
              shrink={false}
            />
          </fieldset>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
      {/* <FormHelperText style={{ color: "#d32f2f" }}>
        {error?.message}
      </FormHelperText> */}
    </FormControl>
  );
};

export default InputField;
