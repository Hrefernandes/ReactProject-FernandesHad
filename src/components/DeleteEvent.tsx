import { useState } from "react";
import type { Event } from "../types/Event";
import { apiService } from "../api/ApiService";
import { SelectEventToDelete } from "./SelectEventToDelete";

type Message = {
  type: "success" | "error";
  text: string;
};

export function DeleteEvent({ onSuccess }: { onSuccess: () => void }) {
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const handleDelete = async () => {
    if (!eventToDelete) return;

    setLoading(true);
    setMessage(null);

    try {
      // IMPORTANT : id doit être number, pas string
      await apiService.deleteEvent(eventToDelete.id);

      setMessage({
        type: "success",
        text: "Évènement supprimé avec succès ✅",
      });

      // Rafraîchir après un petit délai pour UX
      setTimeout(() => {
        onSuccess();
        setEventToDelete(null);
      }, 500);
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Erreur lors de la suppression ❌",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!eventToDelete) {
    return <SelectEventToDelete onSelect={setEventToDelete} />;
  }

  return (
    <div>
      <h3>Suppression d'un évènement</h3>

      <p>
        Évènement sélectionné : <strong>{eventToDelete.name}</strong>
      </p>

      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Suppression..." : "Supprimer"}
      </button>

      <button
        onClick={() => {
          setEventToDelete(null);
          setMessage(null);
        }}
        disabled={loading}
      >
        Annuler
      </button>

      {message && (
        <p style={{ color: message.type === "success" ? "green" : "red" }}>
          {message.text}
        </p>
      )}
    </div>
  );
}
