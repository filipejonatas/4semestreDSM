import React, { useState } from "react";

type PlayerFormProps = {
  onSubmit: (name: string, topic: string) => void;
  topics: string[];
  loading?: boolean;
};

const PlayerForm: React.FC<PlayerFormProps> = ({ onSubmit, topics, loading }) => {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !topic) return;
    onSubmit(name.trim(), topic);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input
          type="text"
          value={name}
          maxLength={50}
          onChange={e => setName(e.target.value)}
          disabled={loading}
          required
        />
      </label>
      <label>
        Tópico:
        <select
          value={topic}
          onChange={e => setTopic(e.target.value)}
          disabled={loading}
          required
        >
          <option value="">Selecione um tópico...</option>
          {topics.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>
      <button type="submit" disabled={loading || !name.trim() || !topic}>
        {loading ? "Starting..." : "Começar"}
      </button>
    </form>
  );
};

export default PlayerForm;