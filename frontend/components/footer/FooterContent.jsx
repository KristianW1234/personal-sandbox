export default function FooterSidebar({ answer, questionLoading }) {
  return (
    <div className="footer-content">
      {answer ? (
        <>
          <strong>AI Response:</strong> {answer}
        </>
      ) : questionLoading ? (
        <>
          <strong>The AI is preparing its response...</strong>
        </>
      ) : (
        <strong>Please ask a question first</strong>
      )}
    </div>
  );
}
