import './style.css'
import { Trash } from 'lucide-react'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'

function Home() {
  const [users, setUsers] = useState([])

  const inputNome = useRef()
  const inputIdade = useRef()
  const inputEmail = useRef()

  async function createUsers() {
    await api.post('/usuarios', {
      nome: inputNome.current.value,
      idade: Number(inputIdade.current.value),
      email: inputEmail.current.value
    })

    getUsers()
  }

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
 
    setUsers(usersFromApi.data)
    console.log(users)
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Digite um nome' name='nome' type='text' ref={inputNome} />
        <input placeholder='Digite sua idade' name='idade' type='number' ref={inputIdade} />
        <input 
       placeholder='Digite seu email' name='email' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map (user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.nome}</span>  </p>
            <p>Idade: <span>{user.idade}</span> </p>
            <p>E-mail: <span>{user.email} </span></p>
          </div>

          <button onClick={() => deleteUsers(user.id)}><Trash /></button>
        </div>
      ))}

      
    </div>
  )
}

export default Home
