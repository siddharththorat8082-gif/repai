export const Select = ({ children, onChange }) => {
  return <select onChange={onChange}>{children}</select>;
};

export const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

export default Select;