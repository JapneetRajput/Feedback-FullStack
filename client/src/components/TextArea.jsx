import React from "react";
import "../styles/login.css";

const TextArea = (props) => {
  return (
    <div
      className={`flex justify-center items-center ${props.width} ${props.div}`}
    >
      <label className={`relative cursor-text ${props.width}`}>
        <textarea
          rows={3} // Set the number of rows to 3
          placeholder={props.hint}
          value={props.value}
          onChange={(e) => props.setState(e.target.value)}
          className={`${props.input} ${props.height} ${props.width} ${props.textInput} ${props.backgroundColor} ${props.border} pt-2 rounded-lg border-opacity-50 outline-none focus:border-[#2d3642] placeholder-gray-300 placeholder-opacity-0 transition duration-200`}
        />
        <span
          className={`${props.span} ${props.textLabel} cursor-text text-opacity-80 ${props.backgroundColor} absolute left-5 ${props.position} transition duration-200 textarea-text`}
        >
          {props.hint}
        </span>
      </label>
    </div>
  );
};

export default TextArea;