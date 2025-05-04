type TextInputProps = {
    label: string
    name: string
    type?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
  }
  
  export default function TextInput({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
  }: TextInputProps) {
    return (
      <div className="flex flex-col space-y-1">
        <label htmlFor={name} className="text-sm font-medium text-gray-300">
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    )
  }
  