// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Connection Status Tracking
const connectionStatus = document.getElementById('connection-status');
const updateConnectionStatus = () => {
    if (navigator.onLine) {
        connectionStatus.textContent = 'Online 🟢';
        connectionStatus.style.color = 'green';
    } else {
        connectionStatus.textContent = 'Offline 🔴';
        connectionStatus.style.color = 'red';
    }
};

window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);
updateConnectionStatus();

// Notes Functionality
const addNoteBtn = document.getElementById('add-note-btn');
const notesContainer = document.getElementById('notes-container');

// Load notes from localStorage
const loadNotes = () => {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <span>${note}</span>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        notesContainer.appendChild(noteElement);
    });
};

// Add a new note
addNoteBtn.addEventListener('click', () => {
    const note = prompt('Enter a new note:');
    if (note) {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    }
});

// Delete a note
window.deleteNote = (index) => {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
};

// Initial load of notes
loadNotes();