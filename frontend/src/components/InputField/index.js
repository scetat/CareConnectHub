const InputField = ({ label, type, value, onChange, disabled = false }) => (
  <div className="input-field">
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} disabled={disabled} />
  </div>
);

export default InputField;
