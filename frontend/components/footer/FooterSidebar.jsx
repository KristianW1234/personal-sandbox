export default function FooterSidebar({
  question,
  onChange,
  handleAskQuestion,
}) {
  return (
    <div className="footer-sidebar">
      <div className="section-title">
        Ask a Question, and the Cohere AI will answer!
      </div>
      <textarea
        className="footer-textarea"
        placeholder="Enter your question..."
        value={question}
        onChange={onChange}
      />
      <button className="footer-button" onClick={handleAskQuestion}>
        Ask
      </button>
    </div>
  );
}
