import styles from './styles.module.scss';

type InputFieldProps = {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel'; // More specific string literals
  name: string;
  value?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // Precise event handler type
};

const InputField: React.FC<InputFieldProps> = ({
  type = 'text',
  name,
  value,
  className,
  placeholder,
  required = false,
  onChange,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      className={className || styles.input}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  );
};

export default InputField;
