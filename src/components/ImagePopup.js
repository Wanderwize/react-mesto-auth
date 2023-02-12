function ImagePopup({ card, onClose }) {
  return (
    <div>
      <section
        className={`popup ${card ? "popup_opened" : ""}`}
        id="image-popup"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
      >
        <div className="popup__image_container">
          <button
            onClick={onClose}
            type="button"
            className="popup__close popup__image_close"
          ></button>
          <img
            src={`${card ? card.link : ""}`}
            className="popup__image_window"
            alt={`${card ? card.name : ""}`}
          />
          <h2 className="popup__image_subtitle">{`${
            card ? card.name : ""
          }`}</h2>
        </div>
      </section>
    </div>
  );
}

export default ImagePopup;
