

function InputUserLog(props) {
  return (
    <div className="Input__container">
      <input type="text" 
      placeholder="Имя"  
      name="name"
      onChange={props.onChange}/>
      <input 
      type="text" 
      placeholder="Фамилия"
      name="surname"
      onChange={props.onChange}
      />
      <input 
      type="tel" 
      placeholder="Номер телефона"
      name="phone"
      onChange={props.onChange}
      />
      <input 
      type="email" 
      placeholder="Email"
      name="email"
      onChange={props.onChange}
      />
    </div>
  )
}

export default InputUserLog