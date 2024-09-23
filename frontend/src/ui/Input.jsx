import "./Input.css";

function Input({ type, onChange, placeholder, name, value, required }) {
  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      value={value}
      required={required}
    />
  );
}

export default Input;
