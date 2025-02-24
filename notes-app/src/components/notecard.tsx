import { Note } from "../utils/api";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  return (
    <div className="card border-0 shadow-sm rounded-3">
      <div className="card-body">
        <h5 className="card-title text-primary fw-bold">{note.title}</h5>
        <p className="card-text text-muted">{note.content}</p>
        <p className="small text-muted">{new Date(note.createdAT ?? new Date()).toLocaleString()}</p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-sm btn-outline-secondary" onClick={() => onEdit(note)}>
            ✏️ Edit
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(note.id)}>
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
