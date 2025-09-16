import Header from './components/header/header'
import InputUserLog from './components/inputUserLog/inputUserLog'
import InputUserPassword from './components/inputUserPassword/inputUserPasswor'
import ButtonSenForm from './components/buttonSendForm/buttonSendForm'
import './App.css'
import { useState } from 'react'

function App() {

  const [user, setUser] = useState({})
  const [form, setForm] = useState([])

  function HandleUserInput(event) {
    const {name, value} = event.target
    setUser({...user, [name]: value})
  }

  function handelBtnSendForm() {
    setForm([...form, user])
  }
  console.log(form)

  return (
    <div>
      <div className='container__app'>
        <Header 
        title='создание аккаунта'
        text='Введите свои данные, чтобы создать аккаунт в сервисе'
        />

        <InputUserLog 
          onChange={HandleUserInput}
        />
        <InputUserPassword 
        onChange={HandleUserInput}
        />

        <ButtonSenForm 
        onClick={handelBtnSendForm}
        />
      </div>
    </div>
  )
}

export default App
