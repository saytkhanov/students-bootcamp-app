import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core'
import { useDispatch } from "react-redux";
import { createStudent} from '../../redux/features/students'
import { Helmet } from 'react-helmet'



function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 490,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    marginBottom: 13,
    marginTop: 10
  }
}));

function Modals({ open, handleClose }) {
  const dispatch = useDispatch();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [avatar, setAvatar] = useState("");
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const handleAddFirstName = (e) => {
    setFirstname(e.target.value);
  };

  const handleAddLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleAddPatronymic = (e) => {
    setPatronymic(e.target.value);
  };

  const handleAddAvatar = (e) => {
    setAvatar(e.target.value);
  };

  const handleAddStudent = () => {
    dispatch(
      createStudent({
        firstName,
        lastName,
        patronymic,
        avatar,
      })
    ).then(() => {
      handleClose()
    })
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper} >
        <Typography variant={'h4'} align={'center'} color={'primary'} id="simple-modal-title">Студент</Typography>
        <form>
          <TextField
            fullWidth
            multiline
            variant={'outlined'}
            classes={{root: classes.textField}}
            placeholder={'Введите фамилию'}
            name="firstName"
            value={firstName}
            onChange={handleAddFirstName}
          />
          <TextField
            name="lastName"
            fullWidth
            multiline
            variant={'outlined'}
            placeholder={'Введите имя'}
            classes={{root: classes.textField}}
            value={lastName}
            onChange={handleAddLastName}
          />
          <TextField
            name="patronymic"
            fullWidth
            multiline
            classes={{root: classes.textField}}
            variant={'outlined'}
            placeholder={'Введите отчество'}
            value={patronymic}
            onChange={handleAddPatronymic}
          />
          <TextField fullWidth classes={{root: classes.textField}}
                     multiline
                     variant={'outlined'}
                     placeholder={'Вставьте ссылку'} name="avatar" value={avatar} onChange={handleAddAvatar} />
          <Box textAlign={'center'}>
          <Button variant={'contained'} color={'primary'} onClick={handleAddStudent} type="submit">Добавить</Button>
          </Box>
        </form>
        <Modals />
      </div>
    </Modal>
  );
}

export default Modals;
