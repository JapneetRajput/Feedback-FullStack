import React from "react";

const TextBox = (props) => {
  return (
    <div
      className={`flex justify-center items-center ${props.width} ${props.div}`}
    >
      <label className={`relative cursor-text  ${props.width}`}>
        <input
          type={props.type}
          placeholder={props.hint}
          value={props.value}
          onChange={(e) => props.setState(e.target.value)}
          className={`${props.input} ${props.height} ${props.width} ${props.textInput} ${props.backgroundColor} ${props.border} placeholder-bg-gradient-to-r from-[#161b22] to-[#0d1117] rounded-lg border-opacity-50 outline-none focus:border-[#2d3642] placeholder-gray-300 placeholder-opacity-0 transition duration-200 `}
        />
        <span
          className={`${props.span} ${props.textLabel} cursor-text ${props.textLabel} ${props.backgroundColor} absolute left-5 ${props.position} transition duration-200 input-text `}
        >
          {props.hint}
        </span>
      </label>
    </div>
  );
};

export default TextBox;