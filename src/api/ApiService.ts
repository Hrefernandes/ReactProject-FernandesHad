import { ApiClient } from "./ApiClient";
import type { Event } from "../types/Event";
import type { Participant } from "../types/Participant";

export const apiService = {
  // Evènements
  getAllEvents: (): Promise<Event[]> => ApiClient.get("/events"),

  getEventById: (id: number): Promise<Event> => ApiClient.get(`/events/${id}`),

  createEvent: (event: Event): Promise<Event> =>
    ApiClient.post("/events", event),

  updateEvent: (event: Event): Promise<Event> =>
    ApiClient.put(`/events/${event.id}`, event),

  deleteEvent: (id: number): Promise<void> => ApiClient.delete(`/events/${id}`),

  // Participants
  getAllParticipants: (): Promise<Participant[]> =>
    ApiClient.get("/participants"),

  createParticipant: (participant: Participant): Promise<Participant> =>
    ApiClient.post("/participants", participant),
};
