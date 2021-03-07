/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: 'Текст первой заметки',
    },
    {
      id: nanoid(),
      text: 'Вторая заметка',
    },
  ]);

  const [newNoteText, setNewNoteText] = useState('');

  const removeNote = (id) => setNotes((prev) => prev.filter((note) => note.id !== id));

  const Header = (
    <>
      <h1 className="head-title">Заметки</h1>
      <span className="head-refresh-icon material-icons">refresh</span>
    </>
  );

  const getNotes = () => notes.map((note) => (
    <li className="note" key={note.id}>
      <span>{note.text}</span>
      <span className="note-delete material-icons" onClick={() => removeNote(note.id)}>clear</span>
    </li>
  ));

  const NoteList = (notes.length
    ? <ul className="notes-list">{getNotes()}</ul>
    : <div className="notes-no-notes">Заметок нет</div>
  );

  const handleTextChange = ({ target }) => setNewNoteText(target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newNoteText) {
      return;
    }
    setNotes((prev) => {
      const newNotes = [...prev];
      newNotes.push({ id: nanoid(), text: newNoteText });
      return newNotes;
    });
    setNewNoteText(() => '');
  };

  const Form = (
    <form className="form" onSubmit={handleFormSubmit}>
      <textarea className="form-textarea" rows="5" onChange={handleTextChange} value={newNoteText} />
      <button className="form-send" type="submit">
        <span className="material-icons">send</span>
      </button>
    </form>
  );

  return (
    <div className="App">
      <div className="app-header">
        {Header}
      </div>

      <div className="app-notes">
        {NoteList}
      </div>

      <div className="app-form">
        {Form}
      </div>
    </div>
  );
}

export default App;
