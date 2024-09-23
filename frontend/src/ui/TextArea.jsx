import "./TextArea.css";

function TextArea({
  rows = 5,
  maxLength = 200,
  placeholder,
  name,
  onChange,
  value,
  required,
}) {
  return (
    <textarea
      className="textarea"
      rows={rows}
      maxLength={maxLength}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
      required={required}
    ></textarea>
  );
}

export default TextArea;
