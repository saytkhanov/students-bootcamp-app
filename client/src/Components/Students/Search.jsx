import React from 'react'
import { Box, TableCell, TableRow } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'
import dayjs from 'dayjs'
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  th: {
    fontSize: 20,
  },
  tr: {
    height: 100,
  },
  td: {
    textAlign: "center",
    color: "#4c4dc3",
    fontSize: 22,
  },
  status: {
    height: 40,
    color: "white",
    textAlign: 'center',
    borderRadius: 4,
    lineHeight: "40px",
    fontSize: 16
  },
}));

function Search ({student, key, elem}) {
  const classes = useStyles();

  return (
    <TableRow key={key} classes={{ root: classes.tr }} >
      <TableCell>
        <img
          src={student.avatar}
          alt={"avatar"}
          width="100px"
          style={{ borderRadius: 100 }}
        />
      </TableCell>
      <TableCell classes={{ root: classes.th }}>
        <NavLink
          student={student}
          to={`/student/${student._id}/note`}
          className={styles.a}
        >
          {student.firstName} {student.lastName} {student.patronymic}
        </NavLink>
      </TableCell>
      <TableCell classes={{ root: classes.td }}>
        {dayjs(student.lastNote?.createdAt).format("DD.MM.YY   HH:mm")}
      </TableCell>
      <TableCell>
        <Box bgcolor={elem?.color} classes={{ root: classes.status }}>
          {elem?.status}
        </Box>
      </TableCell>
      <TableCell classes={{ root: classes.td }}>
        {student.notes?.length}
      </TableCell>
    </TableRow>
  )
}

export default Search