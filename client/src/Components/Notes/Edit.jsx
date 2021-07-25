import React, { useState } from 'react'
import NoteWithInputs from "./NoteWithInputs";
import Note from "./Note";



function Edit({ stat, note, key }) {
  const [isEditing, setIsEditing] = useState(false);



  return isEditing ? (
    <NoteWithInputs
      setIsEditing={setIsEditing}
      note={note}
      stat={stat}
      key={key}
    />
  ) : (
    <Note setIsEditing={setIsEditing} note={note} stat={stat} key={key} />
  );
}

export default Edit;
