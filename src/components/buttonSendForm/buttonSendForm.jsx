import './ButtonSenForm.css'

function ButtonSenForm(props) {
  return (
    <button className='btn__send'
    onClick={props.onClick}
    >Отправить форму</button>
  )
}

export default ButtonSenForm