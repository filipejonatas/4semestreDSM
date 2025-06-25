import React, { useState } from "react";
import { Question } from "../types/game";
import { GameService } from "../services/GameService";

type QuestionCardProps = {
  question: Question;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
};

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, disabled }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const options = GameService.getAnswerOptions(
    question.correct_answer,
    question.wrong_answers
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected && !disabled) {
      onAnswer(selected);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{question.question}</h3>
      {options.map(opt => (
        <label key={opt}>
          <input
            type="radio"
            name="answer"
            value={opt}
            checked={selected === opt}
            onChange={() => setSelected(opt)}
            disabled={disabled}
            required
          />
          {opt}
        </label>
      ))}
      <button type="submit" disabled={!selected || disabled}>
        Submit Answer
      </button>
    </form>
  );
};

export default QuestionCard;