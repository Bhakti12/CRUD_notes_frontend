import { useState } from "react";
import { Note } from "../utils/api";

interface NoteFormProps {
  onSave: (note: Note) => void;
  noteToEdit?: Note | null;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSave, noteToEdit }) => {
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
    <div className="note-card p-3 d-flex flex-column gap-2" style={{ maxWidth: "300px" }}>
      <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"></textarea>
      <button className="btn btn-dark w-100" onClick={handleSave}>
        {noteToEdit ? "Update" : "Save"}
      </button>
    </div>
  );
};

export default NoteForm;
