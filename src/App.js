import React, { useEffect, useState } from 'react'
import './App.css';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import Todo from './Todo';
import { db } from './firebase';
import firebase from "firebase"




function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  console.log(todos);
// when the app loads, we need to listen to the database and fetch new todos as they got added/removed
  useEffect(() => {
    // this code will get fired... when app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => doc.data()));
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo:doc.data().todo})))
    })
  }, []);
  

  const addTodo = (e) => {
    e.preventDefault()
    db.collection('todos').add({
      todo:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setTodos([
      ...todos,
      input

    ]);
    setInput('')
  }
  return (
    <div className="App">
      <h1>Hari's todo List</h1>
     
      <form >
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input onChange={(e) => setInput(e.target.value)} value={input}  />
        </FormControl>
        <Button disabled={!input} onClick={addTodo} variant="contained" color="primary">
        Add Todo
        </Button>
      </form>
    
      <ul>
        {
          todos.map((todo) => {
            return(
              <Todo todo={todo}></Todo>
          )
          })
        }
        
      </ul>
    </div>
  );
}

export default App;
