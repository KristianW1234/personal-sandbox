export default function ContentList({ title, list, keyword }) {
  return (
    <div>
      <p>
        <strong>{title}</strong>:
      </p>
      {Array.isArray(list[keyword]) && list[keyword]?.length > 0 && (
        <ul>
          {list[keyword].map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
