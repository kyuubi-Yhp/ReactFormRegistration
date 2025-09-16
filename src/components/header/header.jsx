import './header.css'

function Header(props) {
  return (
    <div className="Header__container">
      <h1 className="Header__title">{props.title}</h1>
      <p className="Header__text">{props.text}</p>
    </div>
  )
}

export default Header