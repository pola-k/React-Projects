import Main from "./components/Main"
import Sidebar from "./components/Sidebar"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"

export default function App() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [addNote, setAddNote] = useState(false)
  const [notesList, setNotesList] = useState(() => {
    const savedNotes = localStorage.getItem("notesList")
    return savedNotes ? JSON.parse(savedNotes) : []
  })
  const [note, setNote] = useState({})
  const [notification, setNotification] = useState("")

  useEffect(() => 
  {
    localStorage.setItem("notesList", JSON.stringify(notesList))
  }, [notesList])

  function createNote() 
  {
    setNote({ Title: "", Note_Content: "" })
    setAddNote(true)
  }

  function showNotification(type) 
  {
    let message = ""
    if (type === "Delete") 
    {
      message = "Note Deleted Successfully"
    } 
    else if (type === "Create") 
    {
      message = "Note Created Successfully"
    } else if (type === "Edit") 
    {
      message = "Note Edited Successfully"
    }
    setNotification(message)

    setTimeout(() => 
    {
      setNotification("")
    }, 2000)
  }

  function toggleSidebar() 
  {
    setIsMinimized(!isMinimized)
  }

  function goToHome() 
  {
    setAddNote(false)
  }

  function deleteNote(noteToDelete) 
  {
    setNotesList(notesList.filter((note) => note.id !== noteToDelete.id))
    if (noteToDelete.id === note.id) 
    {
      setNote({})
      setAddNote(false)
    }
    showNotification("Delete")
  }

  function viewNote(noteToEdit) 
  {
    setNote(noteToEdit)
    setAddNote(true)
  }

  function saveNote(noteToSave) 
  {
    if (!noteToSave.id) 
    {
      const newNote = {
        Title: noteToSave.Title,
        Note_Content: noteToSave.Note_Content,
        id: nanoid(),
      }
      setNotesList((prevNotes) => [...prevNotes, newNote])
      setNote(newNote)
      showNotification("Create")
    } 
    else 
    {
      setNotesList((prevNotes) => prevNotes.map((note) => note.id === noteToSave.id? {...note, Title: noteToSave.Title, Note_Content: noteToSave.Note_Content,} : note))
      showNotification("Edit")
      setNote(note)
    }
  }

  console.log(notesList)

  return (
    <>
      {notification && (
        <div className="notification-container" id="notification-container">
          {notification}
        </div>
      )}
      <div className={isMinimized ? "container-minimized" : "container"}>
        <Sidebar
          onClick={toggleSidebar}
          isMinimized={isMinimized}
          goToHome={goToHome}
          notesList={notesList}
          deleteNote={deleteNote}
          viewNote={viewNote}
        />
        <Main
          addNote={addNote}
          createNote={createNote}
          notesList={notesList}
          note={note}
          save={saveNote}
        />
      </div>
    </>
  )
}
