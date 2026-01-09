import { useState } from "react";
import type { Event } from "../types/Event";
import { apiService } from "../api/ApiService";

export function RegisterForm({
  event,
  onRegister,
}: {
  event: Event;
  onRegister: (id: number) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email) {
      setMessage({ type: "error", text: "Nom et email obligatoires" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Prends le dernier id
      const participants = await apiService.getAllParticipants();
      const lastId = participants.length
        ? Math.max(...participants.map((p) => p.id))
        : 0;

      const id = lastId + 1;

      // Créer le participant
      const participant = await apiService.createParticipant({
        id,
        name,
        email,
      });

      // Mettre à jour l’événement
      await apiService.updateEvent({
        ...event,
        participants: [...event.participants, Number(participant.id)],
      });

      onRegister(participant.id);

      setMessage({ type: "success", text: "Inscription réussie 🎉" });
      setName("");
      setEmail("");
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Erreur lors de l'inscription" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>S'inscrire à l'évènement</h4>

      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Inscription..." : "S'inscrire"}
      </button>

      {message && (
        <p style={{ color: message.type === "success" ? "green" : "red" }}>
          {message.text}
        </p>
      )}
    </div>
  );
}
