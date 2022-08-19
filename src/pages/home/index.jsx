import React, { useState, useEffect } from 'react';
import './styles.css';
import Card from "../../components/card";

function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({name: '', avatar: ''})

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
    setStudents(prevState => [...prevState, newStudent])
  }
  useEffect(() => {
  //corpo do useEffect
    fetch("https://api.github.com/users/GaaraSan01")
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    })
  }, [])

  return (
    //Aqui podemos ver que num documento jsx deve retornar somente um elemento podendo ser um Fragment ou Div
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
        <img src={user.avatar} alt="Photo de Perfil" />
        </div>
      </header>
      <input 
        type="text" 
        placeholder="Digite um nome..."
        onChange={e => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>Adicionar</button>
      {
        students.map(student => <Card key={student.time} name={student.name} time={student.time}/>)
      }
    </div>
  )
}

export default Home;


