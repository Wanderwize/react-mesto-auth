import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
function AddPlacePopup(props, { isOpen, onClose, onSubmit, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(evt) {
    evt.preventDefault();
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    evt.preventDefault();
    setLink(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
    setName("");
    setLink("");
  }
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isOpen={props.isOpen}
      name={"add-card"}
      title="Новое место"
      children={
        <div>
          <input
            onChange={handleChangeName}
            value={name || ""}
            id="title"
            className="popup__input popup__input_name_value popup__input_place_value"
            type="text"
            name="name"
            placeholder="Название"
            required
            minLength="2"
          ></input>
          <span id="title-error" class="error"></span>
          <input
            onChange={handleChangeLink}
            value={link || ""}
            id="title"
            className="popup__input popup__input_name_value popup__input_place_value"
            type="text"
            name="name"
            placeholder="Ссылка"
            required
            minLength="2"
          ></input>
          <span id="link-error" class="error"></span>
        </div>
      }
    />
  );
}

export default AddPlacePopup;
