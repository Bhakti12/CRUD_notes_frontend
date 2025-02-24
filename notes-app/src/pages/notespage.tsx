import { useEffect, useState } from "react";
import NoteCard from "../components/notecard";
import NoteForm from "../components/noteform";
import { fetchNotes, addNote, updateNote, deleteNote as deleteNoteApi, Note } from "../utils/api";

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    getNotes();
  }, []);

  const addOrUpdateNote = async (note: Note) => {
    try {
      let updatedNote: Note;
      if (note.id) {
        updatedNote = await updateNote(note.id, note);
      } else {
        updatedNote = await addNote(note);
      }

      setNotes((prevNotes) =>
        prevNotes.some((n) => n.id === updatedNote.id)
          ? prevNotes.map((n) => (n.id === updatedNote.id ? updatedNote : n))
          : [...prevNotes, updatedNote]
      );

      setShowForm(false);
      setNoteToEdit(null);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNoteApi(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center">
        <button
          className="btn btn-outline-dark rounded-circle"
          style={{ width: "80px", height: "80px", fontSize: "40px" }}
          onClick={() => setShowForm(true)}
        >
          +
        </button>
        <h2 className="fw-bold ms-3">Notes</h2>
      </div>

      {showForm && <NoteForm onSave={addOrUpdateNote} noteToEdit={noteToEdit} />}

      <div id="notesContainer" className="d-flex flex-wrap gap-3 mt-3">
        {notes.length === 0 ? (
          <p className="fw-bold mt-3">No Notes Available</p>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={(note) => {
                setNoteToEdit(note);
                setShowForm(true);
              }}
              onDelete={handleDeleteNote}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotesPage;
