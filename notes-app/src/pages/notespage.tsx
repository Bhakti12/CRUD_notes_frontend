import { useEffect, useState } from "react";
import NoteCard from "../components/notecard";
import NoteForm from "../components/noteform";
import { fetchNotes, addNote, updateNote, deleteNote as deleteNoteApi, Note } from "../utils/api";

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showModal, setShowModal] = useState(false);
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

      setShowModal(false);
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">📝 My Notes</h2>
        <button className="btn btn-primary rounded-pill px-4" onClick={() => setShowModal(true)}>
          ➕ Add Note
        </button>
      </div>

      <div id="notesContainer" className="row row-cols-1 row-cols-md-3 g-4">
        {notes.length === 0 ? (
          <p className="fw-bold mt-3 text-center">No Notes Available</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="col">
              <NoteCard
                note={note}
                onEdit={(note) => {
                  setNoteToEdit(note);
                  setShowModal(true);
                }}
                onDelete={handleDeleteNote}
              />
            </div>
          ))
        )}
      </div>

      {/* Bootstrap Modal for Note Form */}
      {showModal && <NoteForm onSave={addOrUpdateNote} noteToEdit={noteToEdit} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default NotesPage;
