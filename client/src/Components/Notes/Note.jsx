import React, { useEffect } from "react";
import {
  Box,
  TableCell, TableRow,
} from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch} from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { loadStatuses} from '../../redux/features/statuses'

import Fab from "@material-ui/core/Fab";
import { Helmet } from 'react-helmet'


const useStyles = makeStyles((theme) => ({
  root: {
    width: "900px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  tr: {
    height: 80
  },
  status: {
    height: 40,
    width: 200,
    color: "white",
    textAlign: 'center',
    borderRadius: 4,
    lineHeight: "40px",
    fontSize: 16
  },
}));

function Note({ note,  stat, setIsEditing }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => dispatch(loadStatuses()), [dispatch]);



  return (
      <TableRow classes={{ root: classes.tr }}>
        <TableCell style={{ width: 120}}>
          <Box bgcolor={stat?.color} classes={{ root: classes.status }}>{stat?.status}</Box>
        </TableCell>
        <TableCell style={{fontSize: 18}} item>{note.text}</TableCell>
        <TableCell style={{width: 150, textAlign: 'center'}}>
          <Fab style={{backgroundColor: '#4c4dc3',

          color: 'white'
          }} aria-label="edit" onClick={() => setIsEditing(true)}>
            <EditIcon  />
          </Fab>
        </TableCell>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Заметки</title>
          <link rel="canonical" href="http://localhost:3000/" />
        </Helmet>
      </TableRow>

  );
}

export default Note;
