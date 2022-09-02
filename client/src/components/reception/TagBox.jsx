import React from 'react';

const ReceptionTitle = ({ title, img, onClick }) => {
  return (
    <div className="reception-title">
      <h3>{title}</h3>
      {/* <span className="reception-arrow" onClick={onClick}>{icon}</span> */}
      <img className="reception-arrow" src={img} alt='' onClick={onClick} />
    </div>
  );
};

const Input = ({ label, require, className1, className2, type, name, placeholder, defaultValue, onChange }) => {
  return (
    <div className={className1}>
      <label htmlFor="">
        {label}
        <span>{require}</span>
      </label>
      <input
        className={className2}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

const ReadOnlyInput = ({ label, require, className1, className2, type, name, placeholder, value, defaultValue }) => {
  return (
    <div className={className1}>
      <label htmlFor="">
        {label}
        <span>{require}</span>
      </label>
      <input
        className={className2}
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        readOnly
      />
    </div>
  );
};

// const InputColumn = ({ label, className, type, name, placeholder, onChange }) => {
//   return (
//     <div className="search-column">
//       <label htmlFor="">{label}</label>
//       <input
//         className={className}
//         type="text"
//         name={name}
//         placeholder={placeholder}
//         onChange={onChange}
//       />
//     </div>
//   );
// };

export { ReceptionTitle, Input, ReadOnlyInput };
