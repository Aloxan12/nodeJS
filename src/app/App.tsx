import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import './App.css'
import axios from "axios";

type UsersType = {
    id: number,
    name: string
}


const App: React.FC = () => {
    const userNameRef = useRef<HTMLInputElement | null>(null)
    const [users, setUsers] = useState<any[]>([])
    const [value, setValue] = useState<string>('')
    let getUsers = () => {
        axios.get('http://localhost:7645/users')
            .then(res =>
                setUsers(res.data)
            )
    }
    useEffect(() => {
        getUsers();
    }, [])

    const createUsers =()=>{
        axios.post('http://localhost:7645/users', {name: userNameRef.current?.value}).then(res=>{
            getUsers();
        })
    }
    const deleteUsers =(id: string)=>{
        axios.delete(`http://localhost:7645/users/${id}`,).then(res=>{
            getUsers();
        })
    }
    let onChange =(e:ChangeEvent<HTMLInputElement>)=>{
        setValue(e.currentTarget.value)
    }
    return (
        <div className="App">
            <input onChange={onChange} ref={userNameRef}/>
            <button onClick={createUsers}> add User</button>
            {users.map(u => <div>{u.name}<button onClick={()=>deleteUsers(u._id)}>x</button></div>)}
        </div>
    )
}

export default App
