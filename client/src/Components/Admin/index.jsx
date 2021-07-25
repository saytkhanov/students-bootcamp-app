import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStudents } from "../../redux/features/students";
import {
  Box,
  Button,
  Container,
  Grid, Table, TableBody,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import Student from "./Student";
import Preloader from "../Preloader";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Modals from "./Modal";
import styles from '../Students/styles.module.css'
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  input: {
    width: 1225,
  },
  add: {
    position: 'fixed',
    bottom: 30,
    right: 38
  }
}));

function StudentsAdmin(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(false);
  const state = useSelector((state) => {
    return state.students.items.map((item) => item);
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const students = state.filter((item) => {
    return item.firstName.toLowerCase().includes(value.toLowerCase());
  });
  const dispatch = useDispatch();

  useEffect(() => dispatch(loadStudents()), [dispatch]);
  const loading = useSelector((state) => state.students.loading);
  const handleChangeTrue = () => {
    setSearch(true);
  };
  const handleChangeFalse = () => {
    setSearch(false);
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <Container>
      {search ? (
        <>
          <Box style={{ marginTop: 10 }}>
            <Typography
              color="primary"
              variant="h4"
              style={{ marginBottom: 12 }}
            >
              Поиск студента
            </Typography>
            <Button
              color={"primary"}
              variant={"contained"}
              onClick={handleChangeFalse}
            >
              Скрыть фильтр
            </Button>
          </Box>
          <TextField
            placeholder={"Поиск по имени..."}
            onChange={(e) => setValue(e.target.value)}
            variant={"outlined"}
            style={{ paddingLeft: 8 }}
            margin="normal"
            multiline
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </>
      ) : (
        <Box style={{ marginTop: 10 }}>
          <Typography style={{ marginBottom: 12 }} color="primary" variant="h4">
            Поиск студента
          </Typography>
          <Button
            color={"primary"}
            variant={"contained"}
            onClick={handleChangeTrue}
          >
            Показать фильтр
          </Button>
        </Box>
      )}
      <Table className={styles.table}>
        <TableBody>
      {students.map((student) => {
        return <Student student={student} key={student._id} />;
      })}
        </TableBody>
      </Table>
      <Grid item  classes={{root: classes.add}}>
        <Fab color="primary" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </Grid>
      <Grid item>
        {open ? <Modals open={open} handleClose={handleClose} /> : null}
      </Grid>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin</title>
        <link rel="canonical" href="http://localhost:3000/" />
      </Helmet>
    </Container>
  );
}

export default StudentsAdmin;
