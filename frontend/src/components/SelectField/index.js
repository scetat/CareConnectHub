const SelectField = ({ label, options, value, onChange }) => (
  <div className="input-field">
    <label>{label}</label>
    <select value={value} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
