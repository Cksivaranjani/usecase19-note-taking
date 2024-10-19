// client/src/App.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        socket.on('newNote', (note) => {
            setNotes((prevNotes) => [...prevNotes, note]);
        });

        return () => {
            socket.off('newNote');
        };
    }, []);

    const handleInputChange = (event) => {
        setNewNote(event.target.value);
    };

    const handleAddNote = () => {
        if (newNote.trim()) {
            socket.emit('addNote', newNote);
            setNotes((prevNotes) => [...prevNotes, newNote]);
            setNewNote(''); // Clear the input after adding
        }
    };

    return (
        <div>
            <h1>Collaborative Note-Taking App</h1>
            <input
                type="text"
                value={newNote}
                onChange={handleInputChange}
                placeholder="Type your note here"
            />
            <button onClick={handleAddNote}>Add Note</button>
            <h2>Notes:</h2>
            <ul>
                {notes.map((note, index) => (
                    <li key={index}>{note}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
