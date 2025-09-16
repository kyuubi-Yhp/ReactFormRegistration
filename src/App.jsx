import Header from './components/header/header'
import InputUserLog from './components/inputUserLog/inputUserLog'
import InputUserPassword from './components/inputUserPassword/inputUserPasswor'
import IsErrorCom from './components/isError/IsError'
import IsErrorPass from './components/isError/IsErrorPassword'
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
    returnPassword: '',
    checkbox: ''
  })
  const [form, setForm] = useState([])
  const [isError, setError] = useState(false)
  const [isErrorPassword, setErrorPassword] = useState(false)

  function handleUserInput(event) {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }
    function onChangeCheck(event) {
    const {name, checked} = event.target
    setUser({...user, [name]: checked})
  }


  function handelBtnSendForm() {
    const hasEmptyField = Object.values(user).some(v => !v.toString().trim())
    //Object.values(user) превращает ключи обьекта в массив .some(v а это строчка пробегается по каждому эллементу проверяя не пустое ли там поле 
    //!v.toString().trim()) это для корректной проверки убираем отступы и все в строчку превращаем 

    if (hasEmptyField) {
      setError(true)
      return
    }

    if (user.password !== user.returnPassword) {
      setErrorPassword(true)
      return
    }

    setError(false)
    setErrorPassword(false)
    setForm([...form, user])
    // alert('форма отправлена')
    setUser({
      name: '',
      surname: '',
      phone: '',
      email: '',
      password: '',
      returnPassword: '',
      checkbox: ''
    })
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
          value={user}
          onChange={handleUserInput}
        />

        <InputUserPassword
          value={user}
          onChange={handleUserInput}
          onChangeCheck={onChangeCheck}
        />

        {isError && <IsErrorCom />}
        {isErrorPassword && <IsErrorPass />}

        <ButtonSenForm
          onClick={handelBtnSendForm}
        />
      </div>
    </div>
  )
}

export default App
