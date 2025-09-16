

function InputUserPassword(props) {
  return (
    <div>
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
      type="checkbox" 
      name="checkbox"
      checked={props.value.checkbox}
      onChange={props.onChangeCheck}
      />
    </div>
  )
}

export default InputUserPassword