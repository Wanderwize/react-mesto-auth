function PopupWithForm(props, { isOpen, onClose }) {
  return (
    <div>
      <div
        className={`popup popup_${props.name} ${
          props.isOpen && "popup_opened"
        }`}
      >
        <div className="popup__container popup__container-add">
          <button
            onClick={props.onClose}
            type="button"
            className="popup__close popup__close-edit"
          ></button>

          <h2 className="popup__title">{props.title}</h2>

          <form
            className="popup__form popup__form-add"
            name={props.name}
            id="form_user"
            
            onSubmit={props.onSubmit}
          >
            <div className="popup__form popup__form-add">{props.children}</div>
            <button
              className="popup__save-btn popup__save-button"
              type="submit"
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
