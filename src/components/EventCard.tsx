import { useState } from "react";
import type { Event } from "../types/Event";
import { ParticipantsList } from "./ParticipantsList";
import { RegisterForm } from "./RegisterForm";
import "./EventCard.css";

export function EventCard({ event }: { event: Event }) {
  const [showParticipants, setShowParticipants] = useState(false);
  const [participantIds, setParticipantIds] = useState(event.participants);

  // liste id participants
  const handleNewParticipant = (id: number) => {
    setParticipantIds((prev) => [...prev, id]);
  };

  return (
    <div className="eventCard">
      <h3>{event.name}</h3>
      <p>Date de début : {event.dateDebut}</p>
      <p>Date de fin : {event.dateFin}</p>
      <p>Lieu : {event.location}</p>
      <p>Statut : {event.status}</p>

      <div>
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          {showParticipants ? "Cacher Participants" : "Voir Participants"}
        </button>
      </div>

      {showParticipants && <ParticipantsList participantIds={participantIds} />}

      <RegisterForm event={event} onRegister={handleNewParticipant} />
    </div>
  );
}
