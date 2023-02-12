import React from "react";

import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CurrentAvatarContext from "../contexts/CurrentAvatarContext";

function Main({
  cards,
  onCardLike,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardDelete,
}) {
  const userInfo = React.useContext(CurrentUserContext);

  return (
    <div>
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            style={{ backgroundImage: `url(${userInfo.avatar})` }}
            id="avatar"
            className={"profile__avatar-image"}
          />
          <button
            onClick={onEditAvatar}
            className="profile__avatar-button"
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__info-title" id="name">
            {userInfo.name}
          </h1>
          <h2 className="profile__info-subtitle" id="about">
            {userInfo.about}
          </h2>
          <button
            onClick={onEditProfile}
            type="button"
            className="profile__edit-btn"
          ></button>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-btn"
        ></button>
      </section>
      <section className="elements" id="elements">
        {cards.map((card) => (
          <Card
            onCardLike={onCardLike}
            card={card}
            onCardClick={onCardClick}
            key={card._id}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </div>
  );
}

export default Main;
