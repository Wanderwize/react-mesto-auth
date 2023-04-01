import CurrentUserContext from "../contexts/CurrentUserContext";
import React from "react";

function Card({ onCardLike, card, onCardClick, onCardDelete }) {
  function handleCardClick() {
    onCardClick(card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((id) => id === currentUser._id);

  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;
  
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="card">
      {isOwn && <button className="card__trash" onClick={handleDeleteClick} />}
      <img
        className="card__image"
        src={card.link}
        onClick={handleCardClick}
        alt={card.name}
      />
      <div className="card__name">
        <h2 className="card__name-title">{card.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className={`card__like_active ${!isLiked ? "card__like" : ""}`}
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
