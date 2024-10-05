import React, { forwardRef } from "react";
import Select from "react-select";

const People = forwardRef((props, ref) => {
  const { attend, customAttend, setCustomAttend, errors, handleSelectChange } =
    props;

  const optionData = [
    { value: "1", label: "1명" },
    { value: "2", label: "2명" },
    { value: "3", label: "3명" },
    { value: "4", label: "4명" },
    { value: "5", label: "5명" },
    { value: "직접 입력", label: "직접 입력" },
  ];

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "gray",
      "&:hover": {
        borderColor: "#2B0585",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "lightgray" : "#ffffff",
      color: state.isSelected ? "black" : "#333333",
      "&:hover": {
        backgroundColor: "lightgray",
        color: "black",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#A0A0A0",
    }),
  };

  return (
    <div className="w-full z-1">
      <Select
        options={optionData}
        onChange={(selectedOption) => handleSelectChange(selectedOption)}
        placeholder="몇 명에게 판매하고 싶은가요?"
        className="text-sm z-1"
        classNamePrefix="react-select"
        styles={customSelectStyles}
        value={optionData.find((option) => option.value === attend) || null}
      />
      {attend === "직접 입력" && (
        <input
          className="w-full mt-2 text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400"
          type="text"
          placeholder="직접 입력 값을 작성해주세요. (숫자만 작성)"
          value={customAttend}
          onChange={(e) => setCustomAttend(e.target.value)}
        />
      )}
      {errors.attend && (
        <div className="mt-1 text-red-500 text-sm">
          <span>{errors.attend.message}</span>
        </div>
      )}
    </div>
  );
});

export default People;
