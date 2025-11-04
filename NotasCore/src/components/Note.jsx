import styles from './../css/Note.module.css'

const Note =({note, priority, setListNotes, listNotes, index})=> {

    const deleteNote =()=> {
        setListNotes(listNotes.filter((note,i)=> i!=index))
    }

    return (
        <div className={`border bg-light ${styles.noteCard}` }>
            <p >{note} - <span className={priority==="High"? styles.high : priority=="Low"? styles.low : styles.medium}> {priority} </span></p> 
            <button className='btn btn-danger' onClick={deleteNote}>Delete</button>
        </div>
    ) 

}

export default Note;