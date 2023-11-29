import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
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

function App() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(true);


  function handleMenuClick() {
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }


  return (
    <div className="page">
      <Routes>
        <Route path="/" element={
          <>
            <Header
              loggedIn={loggedIn}
              openMenu={handleMenuClick}
              classNames={"header header__general"}
              classNameAccountLogo={"navigation__account-logo navigation__account-logo-general"}
            />
            <Main />
            <Footer />
          </>
        } />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />

        <Route path="/movies" element={
          <>
            <Header
              loggedIn={true}
              openMenu={handleMenuClick}
              classNames={"header header__films"}
              classNameAccountLogo={"navigation__account-logo navigation__account-logo-other"}
            />
            <Movies />
            <Footer />
          </>
        } />
        <Route path="/saved-movies" element={
          <>
            <Header
              loggedIn={true}
              openMenu={handleMenuClick}
              classNames={"header header__films"}
              classNameAccountLogo={"navigation__account-logo navigation__account-logo-other"}
            />
            <SavedMovies />
            <Footer />
          </>
        } />
        <Route path="/profile" element={
          <>
            <Header
              loggedIn={true}
              openMenu={handleMenuClick}
              classNames={"header header__films"}
              classNameAccountLogo={"navigation__account-logo navigation__account-logo-other"}
            />
            <Profile />
          </>
        } />

        <Route path="*" element={<PageError />} />

      </Routes>

      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
    </div>
  );
}

export default App;
