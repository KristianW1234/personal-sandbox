export default function ContentParagraph({ title, value }) {
  return (
    <div>
      <p>
        <strong>{title}</strong>: {value}
      </p>
    </div>
  );
}
