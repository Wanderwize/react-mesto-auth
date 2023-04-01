import Header from "../components/Header.js";
import Register from "./Register.js";
import Login from "../components/Login";
import Main from "../components/Main.js";
import Footer from "../components/Footer.js";
import PopupWithForm from "../components/PopupWithForm.js";
import EditProfilePopup from "../components/EditProfilePopup.js";
import EditAvatarPopup from "../components/EditAvatarPopup.js";
import React from "react";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup.js";
import ProtectedRouteElement from "./ProtectedRoute";
import { Link } from "react-router-dom";
import * as auth from "../auth.js";
import tokenCheck from "../auth.js";
import InfoTooltip from "./InfoTooltip";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});

  const [avatar, setAvatar] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [headerEmail, setHeaderEmail] = React.useState("");

  const navigate = useNavigate();

  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const [successRegister, setSuccessRegister] = React.useState(false);

  const [loader, setLoader] = React.useState(false);

  function infoTooltipOpenPopup() {
    setInfoTooltipOpen(!infoTooltipOpen);
  }

  const handleLoader = () => {
    setLoader(true);
  };

  const handleLogin = (e) => {
    setLoggedIn(true);
  };

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        setAvatar(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  React.useEffect(() => {
    api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  function handleAddPlaceSubmit(data) {
    api
      .pushNewCard(data)
      .then((data) => {
        const newCard = data;
        setCards([newCard, ...cards]);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .pushUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        setAvatar(data);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((data) => {
        setAvatar(data);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(cards) {
    setSelectedCard(cards);
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;

    api
      .deleteCard(card._id)
      .then(() => {
        const newCard = cards.filter((elem) => elem !== card);
        setCards(newCard);
      })
      .catch(console.error);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    console.log("123");
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => err);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setInfoTooltipOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  };

  // const tokenCheck = () => {
  //   if (localStorage.getItem("token")) {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       auth.getContent(token).then((res) => {
  //         setHeaderEmail(res.data.email);
  //         setLoggedIn(true);
  //         navigate("/", { replace: true });
  //       })

  //     }
  //   }
  // };

  // React.useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     auth
  //       .tokenCheck()
  //       .then((res) => {
  //         if (res.ok) {
  //           setHeaderEmail(res.data.email);
  //           setLoggedIn(true);
  //           navigate("/", { replace: true });
  //         }
  //       })
  //       .catch((err) => {
  //         localStorage.removeItem("token");
  //         console.log(err);
  //       });
  //   }
  // }, []);

  // const tokenCheck = () => {
  //   const token = localStorage.getItem("jwt");
  //   if (token) {
  //     fetch("http://localhost:3000/users/me", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         setLoggedIn(true);
  //         navigate("/", { replace: true });
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .tokenCheck(token)
        .then((res) => {
          setHeaderEmail(res.email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserContext.Provider value={avatar}>
        <div className="page">
          <Header loggedIn={loggedIn} headerEmail={headerEmail} />

          <Routes>
            {/* <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/sign-in" replace />
                ) : (
                  <Navigate to="/sign-up" replace />
                )
              }
            /> */}

            <Route
              path="/sign-in"
              element={
                <Login
                  setSuccessRegister={setSuccessRegister}
                  infoTooltipOpenPopup={infoTooltipOpenPopup}
                  handleLogin={handleLogin}
                  handleLoader={handleLoader}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  setSuccessRegister={setSuccessRegister}
                  infoTooltipOpenPopup={infoTooltipOpenPopup}
                />
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  component={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleCardDelete}
                />
              }
            />
          </Routes>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
          />

          <InfoTooltip
            isOpen={infoTooltipOpen}
            onClose={closeAllPopups}
            successRegister={successRegister}
          />

          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
