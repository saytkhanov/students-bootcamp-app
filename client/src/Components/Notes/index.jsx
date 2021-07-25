import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { loadNotes, postNote, selectNotes } from "../../redux/features/notes";
import { useParams } from "react-router-dom";

import { loadStudents } from "../../redux/features/students";
import { loadStatuses } from "../../redux/features/statuses";
import { makeStyles } from "@material-ui/core/styles";
import Edit from "./Edit";
import styles from "../Students/styles.module.css";
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 900,
    marginRight: 25,
    marginTop: 20,
  },
  tableContainer: {
    marginTop: 30,
  },
  color: {
    color: "#4c4dc3",
  },
  button: {
    backgroundColor: "#4c4dc3",
    width: 185,
    marginTop: 7,
  },
}));

function Notes(props) {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const statuses = useSelector((state) => state.statuses.items);
  const notes = useSelector(selectNotes);

  useEffect(() => dispatch(loadNotes(id)), [dispatch]);

  useEffect(() => dispatch(loadStatuses()), [dispatch]);
  useEffect(() => dispatch(loadStudents(id)), [dispatch]);
  //ищем сравнение с помощью find, что бы мы при выводе могли вывести студента,
  //которые относится к данным комментам, и с помощью константы получаем 1 раз его данные
  const students = useSelector((state) => {
    return state.students.items.find((item) => item._id === id);
  });

  const handleAdd = (id) => {
    if (text !== "" || status !== "") {
      dispatch(postNote(id, { text, status }));
    } else {
      return "Заполните поля";
    }
  };

  const handleChangeComment = (e) => {
    setText(e.target.value);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  return (
    <Container>
      <Grid container spacing={4} style={{ marginLeft: 10 }}>
        <Grid item>
          <img src={students?.avatar} width="220px" alt={"avatar"} />
        </Grid>
        <Grid item>
          <Box>
            <Typography variant={"h4"} classes={{ root: classes.color }}>
              {students?.firstName} {students?.lastName}
            </Typography>
            <Typography
              variant={"h4"}
              color={"primary"}
              classes={{ root: classes.color }}
            >
              {students?.patronymic}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <form>
        <Container maxWidth={"lg"}>
          <Grid container>
            <Grid item>
              <TextField
                classes={{ root: classes.root }}
                placeholder="Комментарий..."
                name="text"
                rows={4}
                multiline
                fullWidth
                value={text}
                onChange={handleChangeComment}
                variant={"outlined"}
              />
            </Grid>
            <Grid item>
              <Box>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  InputLabelProps={{ shrink: true }}
                  label="Статус"
                  name="status"
                  style={{ marginTop: 25 }}
                  value={status}
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
                    <option key={option.value} value={option._id}>
                      {option.status}
                    </option>
                  ))}
                </TextField>
              </Box>
              <Box>
                <Button
                  style={{ marginTop: 7, width: 185 }}
                  classes={{ root: classes.button }}
                  onClick={() => handleAdd(students._id)}
                  type="submit"
                  color={"primary"}
                  variant={"contained"}
                >
                  Добавить
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </form>
      <TableContainer
        classes={{ root: classes.tableContainer }}
        component={Paper}
      >
        <Table className={styles.table}>
          <TableBody>
            {notes.map((note) => {
              const stat = statuses.find((item) => {
                if (item._id === note.status) {
                  return item;
                }
                return null;
              });
              return <Edit stat={stat} note={note} key={note._id} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Student</title>
        <link rel="canonical" href="http://localhost:3000/" />
      </Helmet>
    </Container>
  );
}

export default Notes;
