import { useEffect, useState } from "react";
import { apiService } from "../api/ApiService";
import type { Event } from "../types/Event";
import { EventCard } from "../components/EventCard";
import { HeaderEventScreen } from "./HeaderEventScreen";

export function EventListScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await apiService.getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <p>Chargement des évènements ...</p>;
  }

  return (
    <div>
      <HeaderEventScreen onEventAdded={fetchEvents} />

      <h2>Listes des évènements</h2>

      {events.length === 0 && <p>Aucun évènements</p>}

      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
