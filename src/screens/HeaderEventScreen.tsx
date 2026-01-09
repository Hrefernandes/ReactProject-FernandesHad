import { useState } from "react";
import { FormAddEvent } from "../components/FormAddEvent";
import { FormEditEvent } from "../components/FormEditEvent";
import { DeleteEvent } from "../components/DeleteEvent";
import { SelectEventToEdit } from "../components/SelectEventToEdit";
import type { Event } from "../types/Event";

export function HeaderEventScreen({
  onEventAdded,
}: {
  onEventAdded: () => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

  return (
    <div>
      <button onClick={() => setShowAddForm((prev) => !prev)}>
        {showAddForm ? "Fermer" : "Ajouter"}
      </button>

      <button
        onClick={() => {
          setShowEditForm((prev) => !prev);
          setEventToEdit(null);
        }}
      >
        {showEditForm ? "Fermer" : "Editer"}
      </button>

      <button onClick={() => setShowDeleteForm((prev) => !prev)}>
        {showDeleteForm ? "Fermer" : "Supprimer"}
      </button>

      {showAddForm && (
        <FormAddEvent
          onSuccess={() => {
            setShowAddForm(false);
            onEventAdded();
          }}
        />
      )}

      {showEditForm && !eventToEdit && (
        <SelectEventToEdit onSelect={(event) => setEventToEdit(event)} />
      )}

      {showEditForm && eventToEdit && (
        <FormEditEvent
          event={eventToEdit}
          onSuccess={() => {
            setShowEditForm(false);
            setEventToEdit(null);
            onEventAdded();
          }}
        />
      )}

      {showDeleteForm && (
        <DeleteEvent
          onSuccess={() => {
            setShowDeleteForm(false);
            onEventAdded();
          }}
        />
      )}
    </div>
  );
}
