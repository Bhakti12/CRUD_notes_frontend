import { Note } from "../utils/api";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  return (
    <div
      className="note-card p-3"
      style={{
        backgroundColor: "#FFEE99",
        borderRadius: "15px",
        width: "250px",
        height: "300px",
        position: "relative",
      }}
    >
      <h5>{note.title}</h5>
      <p>{note.content}</p>
      <p className="small text-muted">{new Date(note.createdAT ?? new Date()).toLocaleString()}</p>
      <span className="edit-btn" onClick={() => onEdit(note)}>✏️</span>
      <span className="delete-btn" onClick={() => onDelete(note.id)}>🗑️</span>
    </div>
  );
};

export default NoteCard;
