
import 'bootstrap/dist/css/bootstrap.min.css'   
import 'bootstrap/dist/js/bootstrap.bundle.min.js' 
import './App.css'
import NotesForm from './components/NotesForm'
import Filter from './components/Filter'
import { useState } from 'react'
import Note from './components/Note'

function App() {
  const [listNotes, setListNotes] = useState([])
  const [filter, setFilter] = useState('')

  const listFiltered = !filter? listNotes : listNotes.filter(note => note.priority == filter)
  


  return (
    <>
    <div className='card' style={{with: '20rem'}}>
      <div className='card-header'>
        <h1>Notas</h1>
        <NotesForm listNotes ={listNotes} setListNotes = {setListNotes}/>

      </div>
      <div className='card-body'>
        <Filter filter ={filter} setFilter = {setFilter}/>
        <hr />
          {listFiltered.map((note,index)=> <Note note={note.note} priority={note.priority} listNotes={listNotes} setListNotes={setListNotes} index={index}/> )}
      </div>
      <div className='card-footer'>

      </div>

    </div>

    </>
  )
}

export default App
