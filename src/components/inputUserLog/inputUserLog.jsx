import './InputUserLog.css'

function InputUserLog(props) {
  return (
    <div className="Input__User-container">
      <input type="text"
        placeholder="Имя"
        name="name"
        value={props.value.name}
        onChange={props.onChange} />
      <input
        type="text"
        placeholder="Фамилия"
        name="surname"
        value={props.value.surname}
        onChange={props.onChange}
      />
      <input
        type="tel"
        placeholder="Номер телефона"
        name="phone"
        value={props.value.phone}
        onChange={props.onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={props.value.email}
        onChange={props.onChange}
      />
    </div>
  )
}

export default InputUserLog