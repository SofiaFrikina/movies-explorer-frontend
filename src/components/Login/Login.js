import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/logo m.svg';
import data from '../../utils/constants';

function Login({ loginInto }) {

    return (
        <section className="authorization">
            <div className="authorization__container">
                <img className="authorization__logo" src={headerLogo} alt="Логотип" />
                <h1 className="authorization__title">Рады видеть!</h1>
                <form className="authorization__form">
                    <div className="authorization__label">
                        <p className="authorization__text">E-mail</p>
                        <input value={data.email} type="email" placeholder="Email" className="authorization__input authorization__input_type_email" id="email-input" required />
                        <span className="authorization__text-error email-input-error"></span>
                    </div>
                    <div className="authorization__label">
                        <p className="authorization__text">Пароль</p>
                        <input value={data.password} type="password" placeholder="Пароль" className="authorization__input authorization__input_type_password" id="password-input" minLength="2" maxLength="200" required />
                        <span className="authorization__text-error password-input-error"></span>
                    </div>
                    <button type="submit" className="authorization__button">Войти</button>
                </form>
                <Link to="/signup" className="authorization__login">
                    <p className="authorization__question">Ещё не зарегистрированы?</p>
                    <p className="authorization__link">Регистрация</p>
                </Link>
            </div>
        </section>
    )
}

export default Login;