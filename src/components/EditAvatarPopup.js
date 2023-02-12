import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditAvatarPopup(props, { isOpen, onClose, onUpdateAvatar }) {
  const currentUser = React.useContext(CurrentUserContext);

  const avatarRef = React.useRef();

  function handleSubmitAvatarForm(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmitAvatarForm}
      name={"avatar"}
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={
        <input
          id="title"
          ref={avatarRef}
          className="popup__input popup__input_name_value popup__input_place_value"
          type="url"
          name="avatar"
          placeholder="Ссылка"
          required
        ></input>
      }
    />
  );
}

export default EditAvatarPopup;
