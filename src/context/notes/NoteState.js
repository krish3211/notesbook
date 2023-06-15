import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/";

  const [notes, setNotes] = useState([]);
  const [userdata,setUserdata]= useState([]);
  const getuser = async () => {
    const response = await fetch(`${host}api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')   
        },
    });
    const json = await response.json();
    setUserdata(json);
  };

  //get note
  const getNotes = async () => {
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')   
        },
    });
    const json = await response.json();
    setNotes(json);
  };

  // add note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')      
        },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };
  // delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        },
    });
    const json = await response.json();
    console.log(json);
    const denote = notes.filter((note) => {return note._id !== id;});
    setNotes(denote);
  };
  // update note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')     
       },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json = response.json();
    let newNotes =  JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break
      }
    }
    setNotes(newNotes);
    const json = await response.json();
    console.log(json);
  };

  return (
    <NoteContext.Provider
      value={{ notes,userdata, addNote, deleteNote, editNote, getNotes, getuser }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
