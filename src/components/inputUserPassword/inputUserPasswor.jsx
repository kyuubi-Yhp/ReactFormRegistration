import './InputUserPassword.css'

function InputUserPassword(props) {
  return (
    <div className='Input__passw-container'>
      <input
        type="text"
        placeholder="Пароль"
        name="password"
        value={props.value.password}
        onChange={props.onChange}
      />
      <input
        type="text"
        placeholder="Повторите пароль"
        name="returnPassword"
        value={props.value.returnPassword}
        onChange={props.onChange} />
      <input
        className='input__pass-check'
        type="checkbox"
        name="checkbox"
        checked={props.value.checkbox}
        onChange={props.onChangeCheck}
      /> <p>Подтвердить пароль ➜</p>
    </div>
  )
}

export default InputUserPassword