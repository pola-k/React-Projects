import { useState } from "react";
import Note_Header from "./Note_Header";

export default function Sidebar(props) {

    const notesList = props.notesList
    const note_header_components = notesList ? notesList.map(note => <Note_Header key={note.id} note={note} delete={props.deleteNote} view={props.viewNote}/>) : null

    return (
        <div className={`sidebar ${props.isMinimized ? "minimized" : ""}`}>
            <div className="sidebar-header">
                {!props.isMinimized && (
                    <div className="left-header">
                        <img className="logo-img" src="../images/logo.png" alt="Logo" />
                        <h2 className="sidebar-heading">Note Saver</h2>
                    </div>
                )}
                <svg onClick={props.onClick} className="menu-btn" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
            </div>
            {!props.isMinimized && (
                <>
                    <div className="home-container" onClick={props.goToHome}>
                        <h2 className="home-heading">Home</h2>
                        <svg onClick={props.goToHome} className="home-btn" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                        </svg>
                    </div>
                    {note_header_components}
                </>
            )}
        </div>
    );
}
