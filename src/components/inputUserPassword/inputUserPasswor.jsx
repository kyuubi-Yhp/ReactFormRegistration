

function InputUserPassword (props) {
  return (
    <div>
      <input 
      type="text" 
      placeholder="Пароль"
      name="password"
      onChange={props.onChange}
      />
      <input 
      type="text" 
      placeholder="Повторите пароль"
      name="returnPassword"
      onChange={props.onChange}/>
      <input type="checkbox" />
    </div>
  )
}

export default InputUserPassword