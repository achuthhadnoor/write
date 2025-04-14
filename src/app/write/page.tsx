"use client"
import { useState, useEffect, useRef } from "react";
import cl from 'classnames'
import { v4 as uuidv4 } from 'uuid';
// Helper function to format date
const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    }).format(date);
};


function App() {
    const [note, setNote] = useState('');
    const [history, setHistory] = useState(false);
    const [noteHistory, setNoteHistory] = useState<{ id: string, text: string, createdAt: string, lastModifiedAt: string }[]>([]);
    // const [fontFamily, setFontFamily] = useState('sys');
    const [fontSize, setFontSize] = useState('18');
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailInput, setEmailInput] = useState('');

    const placeholders = [
        "Jot down your thoughts...",
        "Meeting notes go here",
        "A brilliant idea? Write it down!",
        "Start your next big story..."
    ];

    const setRandomPlaceholder = () => {
        const randomIndex = Math.floor(Math.random() * placeholders.length);
        if (textareaRef.current) { textareaRef.current.placeholder = placeholders[randomIndex] };
    }

    // Toggle history view
    const handleHistoryView = () => setHistory(prev => !prev);

    // Handle note input change
    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value);
    };

    // Save the new note
    const handleSaveNote = () => {
        if (note.trim() !== '') {
            const timestamp = formatDate(new Date());  // Format the current timestamp
            const newNote = {
                id: uuidv4(),
                text: note,
                createdAt: timestamp,  // Set the creation timestamp
                lastModifiedAt: timestamp  // Set the modified timestamp
            };
            const updatedNotes = [newNote, ...noteHistory];

            // Save to localStorage
            localStorage.setItem('notes', JSON.stringify(updatedNotes));

            setNoteHistory(updatedNotes);  // Update state with new note
            setNote('');  // Clear the note input field
        }
    };

    // Handle clicking on a note to edit it
    const handleEditNote = (id: string) => {
        const selectedNote = noteHistory.find(note => note.id === id);
        if (selectedNote) {
            setNote(selectedNote.text);
            setEditingId(id);
        }
    };


    // Save the edited note
    const handleSaveEditedNote = () => {
        if (note.trim() !== '' && editingId !== null) {
            const timestamp = formatDate(new Date());
            const updatedNotes = noteHistory.map(item =>
                item.id === editingId
                    ? { ...item, text: note, lastModifiedAt: timestamp }
                    : item
            );

            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            setNoteHistory(updatedNotes);
            setNote('');
            setEditingId(null);
        }
    };


    // Handle font family change
    // const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setFontFamily(e.target.value);
    // };

    // Handle font size change
    const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFontSize(e.target.value);
    };

    // Format time for the timer
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // Toggle the timer state
    const toggleTimer = () => {
        if (isTimerRunning) {
            // Pause the timer
            if (timerRef.current) clearInterval(timerRef.current);
            setIsTimerRunning(false);
        } else {
            // Start the timer
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!);
                        setIsTimerRunning(false);
                        alert("Focus time up!");
                        setTimeLeft(15 * 60)
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            setIsTimerRunning(true);
        }
    };

    // Handle fullscreen toggle
    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };
    const handleEmailSubmit = async () => {
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (emailRegex.test(emailInput)) {
        //     localStorage.setItem('userEmail', emailInput);
        //     setShowEmailModal(false);
        // } else {
        //     alert("Please enter a valid email address.");
        // }
        if (!emailInput.includes('@')) {
            alert('Enter a valid email');
            return;
        }

        try {
            const res = await fetch(' http://localhost:3001/api/focusSub', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailInput })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('userEmail', emailInput);
                setShowEmailModal(false);
                alert('Thanks for subscribing!');
            } else {
                alert(data.message || 'Something went wrong');
            }
        } catch (err) {
            console.error(err);
            // alert('Error connecting to server');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(emailInput)) {
                localStorage.setItem('userEmail', emailInput);
                setShowEmailModal(false);
            } else {
                alert("Please enter a valid email address.");
            }
        }
    };

    // Load notes from localStorage on component mount
    useEffect(() => {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            setNoteHistory(JSON.parse(savedNotes));  // Set state with loaded notes
        }
        // const userEmail = localStorage.getItem('userEmail');
        // if (!userEmail) {
        //     setShowEmailModal(true);
        // }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // Cleanup timer on component unmount or when timer is reset
    useEffect(() => {
        textareaRef?.current?.focus();
        setRandomPlaceholder()
    }, [note]);

    // Reset the timer to initial state
    const handleReset = () => {
        if (timerRef.current) clearInterval(timerRef.current); // Stop the timer if it's running
        setTimeLeft(15 * 60); // Reset to 15 minutes
        setIsTimerRunning(false); // Stop the timer
    };

    // Clear all notes from history
    const handleClearHistory = () => {
        localStorage.removeItem('notes');
        setNoteHistory([]);  // Reset the note history state
    };

    // Handle delete of a specific note
    const handleDeleteNote = (id: string) => {
        const updatedNotes = noteHistory.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setNoteHistory(updatedNotes);
        if (editingId === id) setNote('');
        textareaRef.current?.focus();
    };


    return (
        <div className="relative h-screen overflow-hidden">
            <div className="flex flex-col h-full ">
                {showEmailModal && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center rounded-md">
                        <div className="bg-white dark:bg-neutral-900 rounded-md shadow-lg p-8 w-full max-w-md">
                            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Welcome to Focus ✍️</h2>
                            <p className="mb-4 text-black/70 dark:text-white/50">
                                This app helps you focus and write distraction-free.<br />
                                Enter your email to get updates about our upcoming apps!
                            </p>
                            <form onSubmit={handleEmailSubmit}>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    className="w-full mb-4 p-2 border border-teal-800 rounded-md bg-white dark:bg-neutral-800 dark:text-white outline-none"
                                />
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleEmailSubmit}
                                        className="bg-teal-400 hover:bg-teal-800 hover:text-teal-400 transition-all ease-in-out text-teal-700 px-4 py-2 rounded-md"
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="p-4 drag" />
                <div className="flex flex-1 overflow-hidden">
                    <div className="flex-3 flex overflow-y-auto">
                        <textarea
                            placeholder="Start typing...."
                            ref={textareaRef}
                            autoFocus
                            value={note}
                            onChange={handleNoteChange}
                            style={{
                                fontSize: `${fontSize}px`
                            }}
                            className={cl(`flex-1 pt-24 dark:text-neutral-200 relative p-0 m-0 container ml-auto mr-2 px-4 outline-none
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:bg-black/20
                        [&::-webkit-scrollbar-thumb]:rounded-md
                        dark:[&::-webkit-scrollbar-thumb]:bg-white/10
                        `,
                                // fontSize === '18' ? 'text-xs' : fontSize === '24' ? 'text-sm' : ''
                            )}
                        />
                    </div>
                    <div className={cl(
                        history ? 'right-0' : '-right-full',
                        "absolute flex-1 flex flex-col overflow-y-auto  h-full top-0 max-w-md w-full transition-all ease-in-out p-6 pb-12 dark:bg-neutral-800 bg-neutral-200 select-none")}>
                        <div className="flex justify-between p-2  text-neutral-700 dark:text-neutral-300 ">
                            <h2 className="text-lg font-semibold mb-2">Saved Notes</h2>
                            <button
                                className="p-2 transition ease-in-out text-sm dark:text-red-400 text-red-800 hover:text-red-200 hover:bg-red-500/70 rounded-md"
                                onClick={handleClearHistory}
                                disabled={noteHistory.length === 0}
                            >
                                Clear History
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto h-full">
                            {noteHistory.length === 0 ? (
                                <div className="text-black/40 dark:text-white/20 h-full flex text-center items-center justify-center ">No notes saved yet.</div>
                            ) : (
                                noteHistory.map((item) => (
                                    <div key={item.id} className="relative rounded cursor-pointer text-left w-full  text-neutral-700 dark:text-neutral-300 group">
                                        <button
                                            key={item.id}
                                            className="mb-2 p-2 border border-transparent transition-all ease-linear group-hover:dark:border-neutral-600 group-hover:border-neutral-300 text-neutral-700 dark:text-neutral-300 rounded cursor-pointer text-left w-full dark:group-hover:bg-neutral-750 group-hover:bg-black/5"
                                            onClick={() => handleEditNote(item.id)} // Edit note on click
                                        >
                                            <p className="truncate pr-5">{item.text}</p>
                                            <div className="text-xs text-neutral-500">
                                                Created: {item.createdAt}
                                            </div>
                                            <div className="text-xs text-neutral-500">
                                                Last Modified: {item.lastModifiedAt}
                                            </div>
                                        </button>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();  // Prevent triggering the edit on delete button click
                                                handleDeleteNote(item.id);
                                            }}
                                            className="absolute top-2 right-2 p-1 bg-neutral-300 dark:bg-neutral-700 text-neutral-400 rounded-full opacity-0 group-hover:opacity-100 ease-linear transition-all"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="w-4 h-4"
                                            >
                                                <path d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex p-2 gap-4 text-xs justify-between z-20">
                    {/* <div className="flex gap-5">
                    <button className="px-2 transition ease-in-out text-black/40 dark:text-white/20 hover:text-black/80 dark:hover:text-white/80 dark:hover:bg-white/10 hover:bg-black/5 rounded-md">
                        <select name="font" id="font" className="py-1 outline-none" onChange={handleFontFamilyChange} value={fontFamily}>
                            <option value="sys">System</option>
                            <option value="light">Light</option>
                            <option value="Dark">Dark</option>
                        </select>
                    </button>
                <button className="px-2 transition ease-in-out text-black/40 dark:text-white/20 hover:text-black/80 dark:hover:text-white/80 dark:hover:bg-white/10 hover:bg-black/5 rounded-md">
                        <select name="fontSize" id="fontSize" className="py-1 outline-none" onChange={handleFontSizeChange} value={fontSize}>
                            <option value="18">Small</option>
                            <option value="24">Medium</option>
                            <option value="36">Large</option>
                        </select>
                    </button>

                </div> */}
                    <div className="flex flex-1 items-center">
                        <button
                            className={cl(isTimerRunning && 'animate-pulse', "px-2 transition ease-in-out text-black/80 dark:text-white/50 dark:hover:text-white/80  dark:hover:black/60 hover:text-black/60 rounded-md")}
                            onClick={toggleTimer}
                        >
                            {formatTime(timeLeft)}
                        </button>
                        {isTimerRunning && <button
                            className="px-2 transition ease-in-out text-black/40 dark:text-white/20 hover:text-black/80 dark:hover:text-white/80 dark:hover:bg-white/10 hover:bg-black/5 rounded-md py-1"
                            onClick={handleReset}
                        >
                            Reset
                        </button>}
                    </div>
                    <div className="flex gap-4">
                        {editingId !== null ? (
                            <button
                                className="px-2 transition ease-in-out text-black/40 dark:text-white/20 hover:text-black/80 dark:hover:text-white/80 dark:hover:bg-white/10 hover:bg-black/5 rounded-md"
                                onClick={handleSaveEditedNote}
                            >
                                Save Edit
                            </button>) : (
                            <button
                                className="px-2 transition ease-in-out text-black/40 dark:text-white/20 hover:text-black/80 dark:hover:text-white/80 dark:hover:bg-white/10 hover:bg-black/5 rounded-md"
                                disabled={note.trim().length === 0}
                                onClick={handleSaveNote}
                            >
                                Save Note
                            </button>
                        )}
                        <button className="px-2 transition ease-in-out text-black/40 dark:text-white/20 hover:text-black/80 dark:hover:text-white/80 dark:hover:bg-white/10 hover:bg-black/5 rounded-md">
                            <select name="fontSize" id="fontSize" className="py-1 outline-none" onChange={handleFontSizeChange} value={fontSize}>
                                <option value="18">Small</option>
                                <option value="24">Medium</option>
                                <option value="36">Large</option>
                            </select>
                        </button>
                        <button
                            className="px-2 transition ease-in-out text-black/40 dark:text-white/20 hover:text-black/80 dark:hover:text-white/80 dark:hover:bg-white/10 hover:bg-black/5 rounded-md"
                            onClick={handleFullscreen}
                        >
                            Fullscreen
                        </button>
                        <button
                            className={cl(
                                "px-2 transition ease-in-out rounded-md",
                                history ? 'dark:bg-white/5 dark:text-white/50 bg-black/5 text-black/50' : 'bg-transparent text-black/40 dark:text-white/20 hover:text-black/80 dark:hover:text-white/80 dark:hover:bg-white/10 hover:bg-black/5 ',
                            )}
                            onClick={handleHistoryView}
                        >
                            History
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;
