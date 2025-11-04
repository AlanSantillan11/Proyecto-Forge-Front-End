import { useState } from "react";
import styles from './../css/NotesForm.module.css'
const NotesForm = ({listNotes, setListNotes}) => {

    const [note,setNote] = useState('')
    const [priority,setPriority] = useState('')
    const [errors, setErrors] = useState({note: '', priority: ''})

    const addNote = (e) =>{

        e.preventDefault()
        const errorsCopy = {... errors}
        !note? errorsCopy.note = "Empty input" : errorsCopy.note = '';
        !priority? errorsCopy.priority = 'Select not selected': errorsCopy.priority='';
        if(!note || !priority){
            setErrors(errorsCopy)
            return;
        }


        setListNotes([...listNotes,{note, priority}])

        setNote('')
        setPriority('')
        setErrors({note: '', priority: ''})

    }
    

    return(
        <div>

            <form onSubmit={(e)=>addNote(e)}>
                <div>
                    <input type="text" placeholder='Escribe tu nota' className="input-group-text" name="note" id={styles.note} value={note} onChange={e=> setNote(e.target.value)} />
                    {errors.note && <p style={{color: "red"}}>{errors.note}</p>}
                </div>
                <div>
                    <select className="form-select" name="priority" id={styles.priority} value={priority} onChange={e=> setPriority(e.target.value)}>
                        <option value="---">---</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <button className={`btn btn-primary ${styles.addBtn}`} >Agregar Nota</button>
            </form>


        </div>
    )

}

export default NotesForm;
