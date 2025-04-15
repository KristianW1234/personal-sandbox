import { useState } from "react";
import FooterContent from "./FooterContent.jsx";
import FooterSidebar from "./FooterSidebar.jsx";

export default function Footer() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionLoading, setQuestionLoading] = useState(false);

  const handleAskQuestion = async () => {
    setQuestionLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      if (data && data.answer) {
          setAnswer(data.answer);
        } else if (data && data.error){
          setAnswer("Apologies, there is an error: " + data.error);
        }
      setQuestionLoading(false);
    } catch (error) {
      console.error("Error in AI request:", error);
    }
  };

  return (
    <section className={"footer"}>
      <FooterSidebar
        question={question}
        onChange={(e) => setQuestion(e.target.value)}
        handleAskQuestion={handleAskQuestion}
      />
      <FooterContent answer={answer} questionLoading={questionLoading} />
    </section>
  );
}
