import ContentParagraph from "./ContentParagraph.jsx";
import ContentList from "./ContentList.jsx";
import ContentTable from "./ContentTable.jsx";
import LoadingIcon from "../../misc/LoadingIcon.jsx";

export default function MainContent({ selected, contentLoading, user }) {
  if (selected === "default") {
    return <h2>Please select a user</h2>;
  }

  if (contentLoading) {
    return <LoadingIcon />;
  }

  return (
    <div>
      <ContentParagraph title="Name" value={user["name"]} />
      <ContentParagraph title="Role" value={user["role"]} />
      <ContentParagraph title="Region" value={user["region"]} />
      <ContentList title="Skills" list={user} keyword="skills" />

      <ContentTable
        title="Deals"
        data={user?.deals}
        columns={["Client", "Value", "Status"]}
      />
      <ContentTable
        title="Clients"
        data={user?.clients}
        columns={["Name", "Industry", "Contact"]}
      />
    </div>
  );
}
