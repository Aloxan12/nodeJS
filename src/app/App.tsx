import React, {useEffect, useRef, useState} from 'react'
import './App.css'
import axios from "axios";

type UsersType = {
    _id: string,
    name: string,
}


const App: React.FC = () => {
    const userNameRef = useRef<HTMLInputElement | null>(null)
    const [users, setUsers] = useState<UsersType[]>([])
    const [editMode, setEditMode] = useState<boolean>(true)
    let getUsers = () => {
        axios.get('http://localhost:7645/users' + window.location.search)
            .then(res =>
                setUsers(res.data)
            )
    }
    useEffect(() => {
        getUsers();
    }, [])

    const createUsers = () => {
        axios.post('http://localhost:7645/users', {name: userNameRef.current?.value}).then(res => {
            getUsers();
        })
    }
    const updateUsers = (id:  string, name: string) => {
        axios.put('http://localhost:7645/users', {name, id}).then(res => {
            getUsers();
        })
    }
    const deleteUsers = (id: string) => {
        axios.delete(`http://localhost:7645/users/${id}`,).then(res => {
            getUsers();
        })
    }

    return (
        <div className="App">
            <input ref={userNameRef}/>
            <button onClick={createUsers}> add User</button>
            {users.map(u => <div key={u._id}>
                {
                    editMode
                    ? <span onDoubleClick={()=> setEditMode(false)}>{u.name}</span>
                    :<input
                            defaultValue={u.name}
                            onBlur={(e) => {
                                updateUsers(u._id, e.currentTarget.value);
                                setEditMode(true)
                            }}/>
                }
                <button onClick={() => deleteUsers(u._id)}>x</button>
            </div>)}
        </div>
    )
}

export default App
