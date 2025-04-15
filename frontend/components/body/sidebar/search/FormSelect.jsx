export default function FormSelect({
  label,
  name,
  value,
  onChange,
  states,
  loadState,
  preview,
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
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
}
