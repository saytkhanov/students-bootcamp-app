import React from "react";
import { Route, Switch } from "react-router-dom";
import Students from "../Students";
import { Container, Grid, Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Notes from '../Notes';
import StudentsAdmin from '../Admin'
import Info from '../InfoAboutCompany'
import Statuses from '../Admin/Statuses'
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
}));

function Main(props) {
  const classes = useStyles()
  return (
    <div>
      <Container maxWidth={"lg"} classes={{root: classes.root}}>
        <Paper elevation={3}>
          <Grid container>
            <Switch>
              <Route path="/" exact>
                <Students />
              </Route>
              <Route path='/student/:id/note'>
                 <Notes/>
              </Route>
              <Route path='/aboutUs'>
                <Info/>
              </Route>
              <Route path='/admin'>
                <StudentsAdmin/>
              </Route>
              <Route path='/status'>
                <Statuses/>
              </Route>
            </Switch>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default Main;
