import { useEffect, useState } from "react";
import type { Participant } from "../types/Participant";
import { apiService } from "../api/ApiService";

export function ParticipantsList({
  participantIds,
}: {
  participantIds: number[];
}) {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    if (participantIds.length === 0) {
      return;
    }

    apiService
      .getAllParticipants()
      .then((all) => {
        const eventParticipants = all.filter((p) =>
          participantIds.includes(Number(p.id))
        );
        setParticipants(eventParticipants);
      })
      .catch((err) => console.error(err));
  }, [participantIds]);

  if (participants.length === 0)
    return <p>Aucun participant pour cet évènement</p>;

  return (
    <ul>
      {participants.map((p) => (
        <li key={p.id}>
          {p.name} ({p.email})
        </li>
      ))}
    </ul>
  );
}
