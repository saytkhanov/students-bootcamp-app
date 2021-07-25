import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core'
import { useDispatch } from "react-redux";
import { postStatus } from "../../../redux/features/statuses";
import styles from './styles.module.css'



function getModalStyle() {
  const top = 50
  const left = 50
  const width = '460px'
  const height = '280px'

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: `${width}`,
    height: `${height}`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    top: 50,
    left: 50,
    transform: `translate(-${50}%, -${50}%)`
  },
  button: {
    marginTop: 20,
    width: 140
  }
}));

function ModalsForStatus({ open, handleClose }) {
  const [color, setColor] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const handleAdd = async () => {
    await dispatch(postStatus({ status, color }));
  };

  const handleAddColor = (e) => {
    setColor(e.target.value);
  };

  const handleAddStatus = (e) => {
    setStatus(e.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper} >
        <Typography style={{marginTop: 20}} color={'primary'}  variant={'h3'} id="simple-modal-title">Статус</Typography>
        <form>
          <Box style={{marginTop: 20}}>
          <TextField
            name="status"
            style={{width: 300}}
            multiline
            rows={2}
            value={status}
            placeholder={'Напишите статус...'}
            onChange={handleAddStatus}
            variant={'outlined'}
          />
          <input
            type="color"
            className={styles.input}
            name="color"
            value={color}
            onChange={handleAddColor}
          />
          </Box>
          <Box>
          <Button color={'primary'} classes={{root: classes.button}} variant={'contained'} onClick={handleAdd} type="submit">
            Добавить
          </Button>
          </Box>
        </form>
        <ModalsForStatus />
      </div>
    </Modal>
  );
}

export default ModalsForStatus;
