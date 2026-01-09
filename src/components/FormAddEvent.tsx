import { useState } from "react";
import type { Event } from "../types/Event";
import { apiService } from "../api/ApiService";

export function FormAddEvent({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<Event["status"]>("a venir");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);

  const handleSubmit = async () => {
    if (!name || !dateDebut || !dateFin || !location) {
      setMessage({ type: "error", text: "Tous les champs sont obligatoires" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // génère id
      const events = await apiService.getAllEvents();
      const lastId = events.length ? Math.max(...events.map((e) => e.id)) : 0;

      const newEvent: Event = {
        id: lastId + 1,
        name,
        dateDebut,
        dateFin,
        location,
        status,
        description,
        participants: [],
      };

      await apiService.createEvent(newEvent);
      onSuccess();

      setMessage({ type: "success", text: "Évènement créé avec succès 🎉" });

      // reset form
      setName("");
      setDateDebut("");
      setDateFin("");
      setLocation("");
      setStatus("a venir");
      setDescription("");
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Erreur lors de la création" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px" }}
    >
      <h3>Ajouter un évènement</h3>

      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        type="text"
        placeholder="Lieu"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
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
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Création..." : "Créer"}
      </button>

      {message && (
        <p style={{ color: message.type === "success" ? "green" : "red" }}>
          {message.text}
        </p>
      )}
    </div>
  );
}
