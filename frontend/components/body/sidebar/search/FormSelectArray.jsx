export default function FormSelectArray({
  label,
  name,
  value,
  onChange,
  states,
  loadState,
  preview,
  valueKey,
  displayKey,
}) {
  return (
    <div>
      <label>{label}:</label>
      <select name={name} value={value} onChange={onChange}>
        {loadState ? (
          <option value="">Loading choices...</option>
        ) : (
          <>
            <option value="">-- {preview} --</option>
            {Array.isArray(states) &&
              states.map((state, index) => (
                <option key={index} value={state[valueKey]}>
                  {state[displayKey]}
                </option>
              ))}
          </>
        )}
      </select>
    </div>
  );
}
