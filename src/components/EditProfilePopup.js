import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
function EditProfilePopup(props, { isOpen, onClose, onSubmit, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(evt) {
    evt.preventDefault();
    setName(evt.target.value || '');
  }

  function handleChangeDescription(evt) {
    evt.preventDefault();
    setAbout(evt.target.value || '');
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: about,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={props.onClose}
      name={"profile"}
      title="Редактировать профиль"
      isOpen={props.isOpen}
      children={
        <div>
          <input
            value={name || ""}
            onChange={handleChangeName}
            id="username"
            className="popup__input popup__input_name_value"
            placeholder="Имя"
            type="text"
            name="name"
            required
            minLength="2"
            maxLength="40"
          ></input>
          <span id="username-error" className="error"></span>
          <input
            value={about || ""}
            onChange={handleChangeDescription}
            id="userabout"
            className="popup__input popup__input_about_value"
            placeholder="Род деятельности"
            type="text"
            name="about"
            required
            minLength="2"
            maxLength="200"
          ></input>
          <span id="userabout-error" className="error"></span>
        </div>
      }
    />
  );
}

export default EditProfilePopup;
