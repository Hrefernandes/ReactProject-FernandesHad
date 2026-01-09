import { useEffect, useState } from "react";
import type { Event } from "../types/Event";
import { apiService } from "../api/ApiService";

export function SelectEventToDelete({
  onSelect,
}: {
  onSelect: (event: Event) => void;
}) {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    apiService.getAllEvents().then(setEvents);
  }, []);

  return (
    <div>
      <h3>Choisir un évènement à supprimer</h3>

      {events.map((event) => (
        <label key={event.id} style={{ display: "block" }}>
          <input
            type="radio"
            name="eventToDelete"
            value={event.id}
            checked={selectedId === event.id}
            onChange={() => setSelectedId(event.id)}
          />
          {event.name}
        </label>
      ))}

      <button
        disabled={!selectedId}
        onClick={() => {
          const event = events.find((e) => e.id === selectedId);
          if (event) onSelect(event);
        }}
      >
        Valider
      </button>
    </div>
  );
}
