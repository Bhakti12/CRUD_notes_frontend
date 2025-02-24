import { useState } from "react";
import { Note } from "../utils/api";

interface NoteFormProps {
  onSave: (note: Note) => void;
  noteToEdit?: Note | null;
  onClose: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSave, noteToEdit, onClose }) => {
  const [title, setTitle] = useState(noteToEdit?.title || "");
  const [content, setContent] = useState(noteToEdit?.content || "");

  const handleSave = () => {
    if (!title || !content) {
      alert("Please enter a title and content.");
      return;
    }

    onSave({
      id: noteToEdit?.id as string,
      title,
      content: content,
      createdAT: noteToEdit?.createdAT || new Date().toISOString(),
    });

    setTitle("");
    setContent("");
  };

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{noteToEdit ? "Edit Note" : "New Note"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={4}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
            <button className="btn btn-primary" onClick={handleSave}>
              {noteToEdit ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
