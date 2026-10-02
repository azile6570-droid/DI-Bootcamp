function Input({ label, name, value, onChange, error, autoComplete, inputMode }) {
  const inputId = `form-${name}`
  const errorId = `${inputId}-error`

  return (
    <label className="field" htmlFor={inputId}>
      <span>{label}</span>
      <input
        id={inputId}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <span className="field-error" id={errorId}>{error}</span>}
    </label>
  )
}

export default Input
