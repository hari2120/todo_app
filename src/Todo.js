import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Modal } from '@material-ui/core'
import React, { useState } from 'react'
import { db } from './firebase'
import { makeStyles } from '@material-ui/core/styles';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const Todo = ({todo}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = useState('')

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const updateTodo = () => {
        db.collection('todos').doc(todo.id).set({
            todo:input
        }, {merge:true}
        )
        setOpen(false)
        

    }

    return (
        <>
            <div>
            
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Editing Your Todo</h2>
                    <input placeholder={todo.todo} value={input} type="text" onChange={e => setInput(e.target.value)}/>
                    <Button onClick={updateTodo}>Update Todo</Button>
                </div>
                </Fade>
            </Modal>
            </div>
            <List>
                <ListItem>
                    <ListItemText primary="Todo" secondary={todo.todo} />
                </ListItem>
                <DeleteForeverIcon style={{cursor:"pointer"}} onClick={(event) => (db.collection('todos').doc(todo.id).delete())} />
                <EditIcon style={{cursor:"pointer"}}  onClick={handleOpen} />
                
            </List>
        </>
    )
}


export default Todo
