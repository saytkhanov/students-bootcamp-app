import React from "react";
import {
  Box,
  Container,
  Paper,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, NavLink } from 'react-router-dom'
import {useLocation} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: 30,
    color: '#4c4dc3',
    fontWeight: "bold",
    '&:hover': {
      textDecoration: 'none'
    }
  },
  header: {
    height: 80,
    display: 'flex',
    fontSize: 30,
    justifyContent: 'space-between',
    color: '#4c4dc3'
  },
  navlink: {
    color: '#4c4dc3',
    fontSize: 21,
    width: '120px',
    borderRadius: 5,
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#4c4dc3',
      color: 'white'
    }
  },
  active: {
    backgroundColor: '#4c4dc3',
    color: 'white'
  }
}));

function Header() {
  const classes = useStyles();
  const location = useLocation();



  return (
    <Container fixed maxWidth={"lg"}>
      <Paper elevation={5}>
        <Toolbar classes={{root: classes.header}} variant={"regular"}>
          <NavLink to='/'
            color={"primary"}
            variant={"h4"}
            className={classes.root }
          >
            BootCamp-Students
          </NavLink>
          <Box>
            <Button>
              <NavLink to='/'  exact={true} activeClassName={classes.active} className={classes.navlink} >
                Главная
              </NavLink>
            </Button>
            <Button>
              <NavLink activeClassName={classes.active} className={classes.navlink}  to='/admin'>
              Админка
              </NavLink>
            </Button>
            {location.pathname === '/admin' || location.pathname === '/status' ? <Button>
              <NavLink activeClassName={classes.active} className={classes.navlink}  to='/status'>
                Статусы
              </NavLink>
            </Button> : null}
            <Button>
            <NavLink activeClassName={classes.active} className={classes.navlink}  to='/aboutUs'>
                О нас
            </NavLink>
            </Button>
          </Box>
        </Toolbar>
      </Paper>
    </Container>
  );
}

export default Header;

//useLocationStorage;
//pathName
//if(pathName === /admin)
