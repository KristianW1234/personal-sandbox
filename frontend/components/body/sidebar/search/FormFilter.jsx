import FormSelect from "./FormSelect.jsx";
import FormSelectArray from "./FormSelectArray.jsx";

export default function FormFilter({
  formData,
  handleChange,
  handleSubmit,
  optionLoading,
  roles,
  regions,
  clients,
  industries,
}) {
  const formFields = [
    {
      type: "input",
      component: "input",
      label: "Sales Rep Name",
      name: "name",
      placeholder: "Enter rep name here",
    },
    {
      type: "select",
      component: FormSelect,
      label: "Sales Rep Role",
      name: "role",
      states: roles,
      preview: "Search by role",
    },
    {
      type: "select",
      component: FormSelect,
      label: "Sales Rep Region",
      name: "region",
      states: regions,
      preview: "Search by region",
    },
    {
      type: "selectArray",
      component: FormSelectArray,
      label: "Active Client",
      name: "activeClient",
      states: clients,
      preview: "Search based on clients currently having a deal",
      valueKey: "name",
      displayKey: "name",
    },
    {
      type: "selectArray",
      component: FormSelectArray,
      label: "Past Client",
      name: "pastClient",
      states: clients,
      preview: "Search past historical clients",
      valueKey: "name",
      displayKey: "name",
    },
    {
      type: "select",
      component: FormSelect,
      label: "Client Industry",
      name: "industry",
      states: industries,
      preview: "Search by industry",
    },
    {
      type: "input",
      component: "input",
      label: "Minimum value",
      name: "minValue",
      placeholder: "Enter the min. value dealt to any clients",
      inputType: "number",
    },
    {
      type: "input",
      component: "input",
      label: "Maximum value",
      name: "maxValue",
      placeholder: "Enter the max. value dealt to any clients",
      inputType: "number",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {formFields.map((field, index) => {
        if (field.type === "input") {
          return (
            <div key={index}>
              <label>{field.label}:</label>
              <input
                type={field.inputType || "text"} // Handles number or default text
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder || ""}
              />
            </div>
          );
        }

        const Component = field.component;

        const commonProps = {
          key: index,
          label: field.label,
          name: field.name,
          value: formData[field.name],
          onChange: handleChange,
          states: field.states,
          loadState: optionLoading,
          preview: field.preview,
        };

        const extraProps =
          field.type === "selectArray"
            ? {
                valueKey: field.valueKey,
                displayKey: field.displayKey,
              }
            : {};

        return <Component {...commonProps} {...extraProps} />;
      })}

      <button type="submit">Filter</button>
    </form>
  );
}
