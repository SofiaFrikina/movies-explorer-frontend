import React from 'react';
import { useCallback } from 'react';
import './App.css';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageError from '../PageError/PageError';
import Menu from '../Menu/Menu';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { register, authorize, checkToken } from '../../utils/Auth';
import moviesApi from '../../utils/MoviesApi';
import { moviesArray } from '../../utils/MoviesArray';

function App() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [saveMovies, setSaveMovies] = React.useState([]);
  const [message, setMessage] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  const cleanErrorMessage = useCallback(() => {
    setErrorMessage("");
  },
    [setErrorMessage],
  );

  React.useEffect(() => {
    cleanErrorMessage()

  }, [cleanErrorMessage, navigate]);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUser(), mainApi.getMovies()])
        .then(([resUser, resMovie]) => {
          setCurrentUser(resUser);
          setSaveMovies(resMovie);//сохраненные фильмы должны быть
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((res) => {
          mainApi.setToken(token);
          setCurrentUser({ name: res.name, email: res.email });
          setLoggedIn(true);
        })
        .catch((err) => console.log(err))
    }
  }, [navigate]);

  React.useEffect(() => {
    handleGetMovies();
  }, []);

  function hadleRegister(name, email, password) {
    register(name, email, password)
      .then((res) => {
        setInfoTooltipOpen(true);
        if (res) {
          setMessage(true);
          handleLogin(email, password)
        }
      })

      .catch((err) => {
        setMessage(false);
        setInfoTooltipOpen(true);
        if (err === 409) {
          setErrorMessage('Пользователь с таким email уже существует.');
        }
        else {
          setErrorMessage('При регистрации пользователя произошла ошибка.');
        }
      });
  }

  function handleLogin(email, password) {
    authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res.token);
          mainApi.setToken(res.token);
          setLoggedIn(true);
          //попробовать потом заменить нижнюю строку
          setCurrentUser({ name: res.name, email: res.email });
          localStorage.setItem('loggedIn', true);
          navigate('/movies', { replace: true })
        }
      })

      .catch((err) => {
        setMessage(false);
        setInfoTooltipOpen(true);
        if (err === 401) {
          setErrorMessage('Вы ввели неправильный логин или пароль.');
        }
        if (err === 400) {
          setErrorMessage('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
        }
        else {
          setErrorMessage('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
        }
      });
  }

  function handleUpdateUser(data) {
    mainApi.editUser(data)
      .then((newUser) => {
        setCurrentUser(newUser);
      })
      .catch((err) => {
        setMessage(false);
        setInfoTooltipOpen(true);
        if (err === 409) {
          setErrorMessage('Пользователь с таким email уже существует.');
        }
        else {
          setErrorMessage('При обновлении пользователя произошла ошибка.');
        }
      });
  }

  //загружаем, получаем фильмы
  function handleGetMovies() {
    if (localStorage.getItem('filteredMovies')) {
      setFilteredMovies(JSON.parse(localStorage.getItem('filteredMovies')));
    } else {
      moviesApi.getMovies()
        .then((res) => {
          const resultMovies = moviesArray(res);
          localStorage.setItem('filteredMovies', JSON.stringify(resultMovies));
          setFilteredMovies(resultMovies);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('filteredMovies');
          setFilteredMovies([]);
        });
    }
  }


  function handleMenuClick() {
    setMenuOpen(true);
  }

  function closeAllPopups() {
    setMenuOpen(false);
    setInfoTooltipOpen(false);
  }

  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({});
    navigate('/')
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={
            <>
              <Header
                loggedIn={loggedIn}
                openMenu={handleMenuClick}
                classNames={"header header_general"}
                classNameAccountLogo={"navigation__account-logo navigation__account-logo-general"}
              />
              <Main />
              <Footer />
            </>
          } />

          {!loggedIn ? (<Route path="/signup" element={<Register onRegister={hadleRegister} errorMessage={errorMessage} />} />) : (<Route path="/signup" element={<Navigate to="/" />} />)}
          {!loggedIn ? (<Route path="/signin" element={<Login onLogin={handleLogin} errorMessage={errorMessage} />} />) : (<Route path="/signin" element={<Navigate to="/" />} />)}





          <Route path="/movies" element={
            <>
              <ProtectedRouteElement
                component={Header}
                loggedIn={true}
                openMenu={handleMenuClick}
                classNames={"header header_films"}
                classNameAccountLogo={"navigation__account-logo navigation__account-logo-other"} />
              <ProtectedRouteElement
                component={Movies}
                loggedIn={true}
                filteredMovies={filteredMovies}
              />
              <ProtectedRouteElement
                component={Footer}
                loggedIn={true}
              />
            </>
          } />
          <Route path="/saved-movies" element={
            <>
              <ProtectedRouteElement
                component={Header}
                loggedIn={true}
                openMenu={handleMenuClick}
                classNames={"header header_films"}
                classNameAccountLogo={"navigation__account-logo navigation__account-logo-other"} />
              <ProtectedRouteElement
                component={SavedMovies} />
              <ProtectedRouteElement
                component={Footer} />
            </>
          } />
          <Route path="/profile" element={
            <>
              <ProtectedRouteElement
                component={Header}
                loggedIn={true}
                openMenu={handleMenuClick}
                classNames={"header header_films"}
                classNameAccountLogo={"navigation__account-logo navigation__account-logo-other"} />
              <ProtectedRouteElement
                component={Profile}
                loggedIn={true}
                onSignOut={onSignOut}
                onProfile={handleUpdateUser}
                errorMessage={errorMessage}
              />
            </>
          } />

          <Route path="*" element={<PageError />} />

        </Routes>

        <Menu isOpen={isMenuOpen} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          status={message}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
