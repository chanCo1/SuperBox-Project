import React from 'react';

const ReceptionTitle = ({ title, icon }) => {
  return (
    <div className="reception-title">
      <h3>{title}</h3>
      <span className="reception-arrow">{icon}</span>
    </div>
  );
};

const SendColumn = ({ label, type, name, placeholder, defaultValue, onChange }) => {
  return (
    <div className="search-column">
      <label htmlFor="">{label}</label>
      <input
        className="search-input search-input-middle"
        type="text"
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

const SearchColumn = ({ label, className, type, name, placeholder, value }) => {
  return (
    <div className="search-column">
      <label htmlFor="">{label}</label>
      <input
        className={className}
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly
      />
    </div>
  );
};

const InputColumn = ({ label, className, type, name, placeholder, onChange }) => {
  return (
    <div className="search-column">
      <label htmlFor="">{label}</label>
      <input
        className={className}
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export { ReceptionTitle, SendColumn, SearchColumn, InputColumn };
