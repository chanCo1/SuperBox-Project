import React, { memo } from 'react';

const InputBox = memo(({ icon, errStyle, type, name, value, placeholder, onChange, errMsg }) => {
  return (
    <>
      <div className="input-with-icon">
        <span className="input-icon" style={errStyle}>
          {icon}
        </span>
        <input
          className="input-area"
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>

      {/* 에러메세지 */}
      <div className="error-msg">{errMsg}</div>
    </>
  );
});

export default InputBox;
