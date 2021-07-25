import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadStudents,
  selectLoadingStudents, selectStudents,
} from '../../redux/features/students'
import Preloader from "../Preloader";
import Student from "./Student";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TextField,
  Typography,
} from "@material-ui/core";
import styles from "./styles.module.css";
import { makeStyles } from "@material-ui/core/styles";
import TableHeader from "./TableHead";
import { loadStatuses, selectStatuses } from "../../redux/features/statuses";
import Fuse from 'fuse.js';
import { Helmet } from 'react-helmet'
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './Search'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tableContainer: {
    marginTop: 30,
  },
}));

function Students(props) {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  const dispatch = useDispatch();
  const students = useSelector(selectStudents)



  const loading = useSelector(selectLoadingStudents);
  const statuses = useSelector(selectStatuses);

  useEffect(() => dispatch(loadStudents()), [dispatch]);

  useEffect(() => dispatch(loadStatuses()), [dispatch]);

  const fuse = new Fuse(students, {
    keys: [
      "firstName",
      "lastName",
      "patronymic"
    ],
    includeScore: true
  });
  const results = fuse.search(query)
  const studentsResult = results.map(result => result.item)
  if (loading) {
    return <Preloader />;
  }

  const handleChangeTrue = ({currentTarget = {}}) => {
    const { value } = currentTarget;
    setQuery(value)
    setSearch(true);
  };
  const handleChangeFalse = () => {
    setSearch(false)
  };

  return (
    <>
      {search ? (
        <Container>
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
            onChange={handleChangeTrue}
            value={query}
            variant={"outlined"}
            style={{ paddingLeft: 8 }}
            margin="normal"
            multiline
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
            <TableContainer
              classes={{ root: classes.tableContainer }}
              component={Paper}
            >
              <Table className={styles.table}>
            <TableBody>
              {studentsResult.map((student) => {
                //делаем сравнение есть ли у студентов статус,
                //который совпадает со статусом, в заметках,
                //если да выводим с помощью константы
                const elem = statuses.find((item) => {
                  if (item._id === student.lastNote?.status) {
                    return item;
                  }
                  return null;
                });

                return (
                  <Search student={student} key={student._id} elem={elem} />
                );
              })}
            </TableBody>
              </Table>
            </TableContainer>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Search..</title>
            <link rel="canonical" href="http://localhost:3000/" />
          </Helmet>
        </Container>
      ) : (
        <Container>
        <Box style={{ marginTop: 10 }}>
          <Typography style={{ marginBottom: 12 }} color="primary" variant="h4">
            Поиск студента
          </Typography>
          <Button
            color={"primary"}
            variant={"contained"}
            onClick={() => setSearch(true)}
          >
            Показать фильтр
          </Button>
        </Box>
        <TableContainer
        classes={{ root: classes.tableContainer }}
        component={Paper}
        >
        <Table className={styles.table}>
        <TableHeader />
        <TableBody>

      {students.map((student) => {
        //делаем сравнение есть ли у студентов статус,
        //который совпадает со статусом, в заметках,
        //если да выводим с помощью константы
        const elem = statuses.find((item) => {
        if (item._id === student.lastNote?.status) {
        return item;
      }
        return null;
      });

        return (
        <Student student={student} key={student._id} elem={elem} />
        );
      })}
        </TableBody>
        </Table>
        </TableContainer>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Главная</title>
            <link rel="canonical" href="http://localhost:3000/" />
          </Helmet>
        </Container>
      )}
    </>
  );
}

export default Students;
