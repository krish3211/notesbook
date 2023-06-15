import React, { useContext, useState } from "react";
import noteContext from '../context/notes/NoteContext'


function AddNote(props) {
    const constext = useContext(noteContext);
    const {addNote} = constext;
    const [note,setNote] = useState({title:"",description:"",tag:""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Successfully","success");

    }

    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <h2>Add a Note</h2>
      <form className="my-3 mx-5 py-3 px-5">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onchange}
            value={note.title}
            minLength={5}
            required
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onchange}
            value={note.description}
            minLength={5}
            rows="6" 
            style={{"resize": "none"}}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onchange}
            value={note.tag}
          />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
