import successImg from "../images/success.svg";
import deniedImg from "../images/denied.svg";

function InfoTooltip(props) {
  return (
    <div>
      <div className={`popup popup_profile ${props.isOpen && "popup_opened"}`}>
        <div className="popup__container popup__container-add">
          <button
            onClick={props.onClose}
            type="button"
            className="popup__close popup__close-edit"
          ></button>

          <div className="popup__message-flex">
            <img
              className="popup__icon"
              src={props.successRegister ? successImg : deniedImg}
              alt=""
            />
            <h2 className="popup__title popup__title-message">
              {props.successRegister
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так! Попробуйте еще раз."}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
