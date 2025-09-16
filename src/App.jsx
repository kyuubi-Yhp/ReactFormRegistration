import Header from './components/header/header'
import InputUserLog from './components/inputUserLog/inputUserLog'
import InputUserPassword from './components/inputUserPassword/InputUserPasswor'
import IsErrorCom from './components/isError/IsError'
import ButtonSenForm from './components/buttonSendForm/buttonSendForm'
import './App.css'
import { useState } from 'react'

function App() {

  const [user, setUser] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    returnPassword: ''
  })
  const [form, setForm] = useState([])
  const [isError, setError] = useState(false)

  function handleUserInput(event) {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  function handelBtnSendForm() {
    const hasEmptyField = Object.values(user).some(v => !v.toString().trim())
    //Object.values(user) превращает ключи обьекта в массив .some(v а это строчка пробегается по каждому эллементу проверяя не пустое ли там поле 
    //!v.toString().trim()) это для корректной проверки убираем отступы и все в строчку превращаем 
    if (hasEmptyField) {
      setError(true)
      return
    }
    setError(false)
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
          onChange={handleUserInput}
        />

        <InputUserPassword
          onChange={handleUserInput}
        />
        {isError && <IsErrorCom />}

        <ButtonSenForm
          onClick={handelBtnSendForm}
        />
      </div>
    </div>
  )
}

export default App
