import { useState } from "react";
import type { Event } from "../types/Event";
import { apiService } from "../api/ApiService";

type Message = {
  type: "success" | "error";
  text: string;
};

export function FormEditEvent({
  event,
  onSuccess,
}: {
  event: Event;
  onSuccess: () => void;
}) {
  const [name, setName] = useState(event.name);
  const [dateDebut, setDateDebut] = useState(event.dateDebut);
  const [dateFin, setDateFin] = useState(event.dateFin);
  const [location, setLocation] = useState(event.location);
  const [status, setStatus] = useState<Event["status"]>(event.status);
  const [description, setDescription] = useState(event.description);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);

    try {
      await apiService.updateEvent({
        ...event,
        id: event.id,
        name,
        dateDebut,
        dateFin,
        location,
        status,
        description,
      });

      setMessage({
        type: "success",
        text: "Évènement modifié avec succès ✅",
      });

      // délai afficher le message et rafraichir la liste
      setTimeout(() => {
        onSuccess();
      }, 5000);
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Erreur lors de la modification ❌",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "15px" }}>
      <h3>Modifier l'évènement</h3>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom de l'évènement"
      />

      <input
        type="date"
        value={dateDebut}
        onChange={(e) => setDateDebut(e.target.value)}
      />

      <input
        type="date"
        value={dateFin}
        onChange={(e) => setDateFin(e.target.value)}
      />

      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Lieu"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as Event["status"])}
      >
        <option value="a venir">À venir</option>
        <option value="en cours">En cours</option>
        <option value="termine">Terminé</option>
      </select>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Enregistrement..." : "Modifier"}
        </button>
      </div>

      {message && (
        <p style={{ color: message.type === "success" ? "green" : "red" }}>
          {message.text}
        </p>
      )}
    </div>
  );
}
