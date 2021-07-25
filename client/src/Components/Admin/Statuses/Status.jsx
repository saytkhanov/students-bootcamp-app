import React from "react";
import {
  Box,
  makeStyles, TableCell, TableRow,
  Typography,
} from '@material-ui/core'
import { Helmet } from 'react-helmet'


const useStyles = makeStyles((theme) => ({
  statusName: {
    color: '#4c4dc3',
    fontSize: 25,
    fontWeight: 'bold'
  }
}))

function Status({ status, key }) {
  const classes = useStyles();


  return (
  <TableRow key={key} >
    <TableCell style={{fontSize: 18}}>
      <Typography classes={{root: classes.statusName}}>{status.status}</Typography>
    </TableCell>
    <TableCell style={{width: 150, textAlign: 'center'}}>
      <Box bgcolor={status.color} style={{borderRadius: 100, width: 60, height: 60}}/>
    </TableCell>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Статусы</title>
      <link rel="canonical" href="http://localhost:3000/" />
    </Helmet>
  </TableRow>
  );
}

export default Status;
