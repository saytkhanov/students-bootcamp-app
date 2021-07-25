import React from "react";
import {  TableCell, TableRow, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { deleteStudent } from '../../redux/features/students'
import { makeStyles } from "@material-ui/core";
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid grey",
  },
  name: {
    width: 700,
  },
  info: {
    color: 'rgb(76, 77, 195)',
    fontSize: 25
  },
  tr: {
    borderBottom: '2px solid #4c4dc3'
  }
}));

function Student({ student, key }) {
  const dispatch = useDispatch();
  const classes = useStyles();


  return (
    <TableRow classes={{ root: classes.tr }}>
      <TableCell style={{ width: 120}}>
        <img src={student.avatar}
             alt={"avatar"}
             width="100px"
             style={{ borderRadius: 100 }}/>
      </TableCell>
      <TableCell style={{fontSize: 18}}><NavLink to={`/student/${student._id}/note`}>
        <Typography classes={{root: classes.info}}>{student.firstName} {student.lastName} {student.patronymic}</Typography>
      </NavLink>
      </TableCell>
      <TableCell style={{width: 150, textAlign: 'center'}}>
        <Fab style={{backgroundColor: '#4c4dc3',

          color: 'white'
        }} aria-label="edit" onClick={() => dispatch(deleteStudent(student._id))}>
          <DeleteIcon  />
        </Fab>
      </TableCell>
    </TableRow>
  );
}

export default Student;
