export default function UserList({ data, onSelect, selected }) {
  return (
    <>
      {data.map((user) => (
        <button
          key={user.id}
          className={`user-button ${selected === user.id ? "selected" : ""}`}
          onClick={() => onSelect(user.id)}
        >
          {user.name} - {user.role}
        </button>
      ))}
    </>
  );
}
