import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStatuses, selectStatuses } from "../../redux/features/statuses";
import { editNote, selectEditingNotes } from "../../redux/features/notes";
import { TableCell, TableRow, TextField } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme) => ({
  tr: {
    height: 80,
  },
}));

function NoteWithInputs({ note, key, setIsEditing }) {
  const [status, setStatus] = useState(note.status);
  const [text, setText] = useState(note.text);
  const dispatch = useDispatch();
  const statuses = useSelector(selectStatuses);

  const editing = useSelector(selectEditingNotes);
  const classes = useStyles();

  useEffect(() => dispatch(loadStatuses()), [dispatch]);

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleEdit = () => {
    // ждем пока выполнится диспетч...
    dispatch(editNote(note._id, { status, text }));

    // и затем переключаемся на компонент
    setIsEditing(false);
  };

  return (
    <>
      <TableRow classes={{ root: classes.tr }}>
        <TableCell style={{ width: 120 }}>
          <TextField
            id="outlined-select-currency-native"
            select
            name="status"
            value={status}
            style={{ width: 190 }}
            onChange={handleChangeStatus}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            <option value="" disabled selected>
              Выберите статус
            </option>
            {statuses.map((option) => (
              <option key={option._id} value={option._id}>
                {option.status}
              </option>
            ))}
          </TextField>
        </TableCell>
        <TableCell key={key}>
          <TextField
            variant={"outlined"}
            style={{ paddingLeft: 8 }}
            margin="normal"
            multiline
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={text}
            onChange={handleChangeText}
          >
            {note.text}
          </TextField>
        </TableCell>
        <TableCell style={{ width: 150, textAlign: "center" }}>
          <Fab
            style={{ backgroundColor: "#4c4dc3", color: "white" }}
            aria-label="edit"
            onClick={handleEdit}
            disabled={editing}
          >
            <SaveIcon />
          </Fab>
        </TableCell>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Редактирование</title>
          <link rel="canonical" href="http://localhost:3000/" />
        </Helmet>
      </TableRow>
    </>
  );
}

export default NoteWithInputs;
