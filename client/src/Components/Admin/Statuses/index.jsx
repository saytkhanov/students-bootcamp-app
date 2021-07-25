import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStatuses, selectStatuses } from '../../../redux/features/statuses'
import Status from "./Status";
import { Grid, Table, TableBody } from '@material-ui/core'
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {makeStyles} from '@material-ui/core'
import styles from '../../Students/styles.module.css'
import ServerModal from './Modals'
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme) => ({
  add: {
    position: 'fixed',
    bottom: 30,
    right: 38
  }
  })
)

function Statuses(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const statuses = useSelector(selectStatuses);

  useEffect(() => dispatch(loadStatuses()), [dispatch]);
  return (
    <Table className={styles.table}>
      <TableBody>
      {statuses.map((status) => {
        return <Status status={status} key={status.id} />;
      })}
      <Grid item classes={{root: classes.add}}>
        <Fab color="primary" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </Grid>
      <Grid item>
        {open ? (
          <ServerModal open={open} handleClose={handleClose} />
        ) : null}
      </Grid>
      </TableBody>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Статусы</title>
        <link rel="canonical" href="http://localhost:3000/" />
      </Helmet>
    </Table>
  );
}

export default Statuses;
