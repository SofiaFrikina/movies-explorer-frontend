import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/logo m.svg';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Login({ onLogin, errorMessage }) {

    const { values, errors, isValid, handleChange } = useFormWithValidation();
    function handleSubmit(evt) {
        const { email, password } = values;
        evt.preventDefault();
        onLogin(email, password)
    }

    return (
        <main className="authorization">
            <section className="authorization__container">
                <Link to="/" className="authorization__logo-link"><img className="authorization__logo" src={headerLogo} alt="Логотип" /></Link>
                <h2 className="authorization__title">Рады видеть!</h2>
                <form className="authorization__form" onSubmit={handleSubmit} noValidate>
                    <div className="authorization__label">
                        <p className="authorization__text">E-mail</p>
                        <input type="email" name="email" value={values.email || ""} onChange={handleChange} pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" placeholder="Email" className="authorization__input authorization__input_type_email" id="email-input" required />
                        <span className={`authorization__text-error email-input-error ${errors.name ? "authorization__text-error_active" : ""}`}>{errors.email}</span>
                    </div>
                    <div className="authorization__label">
                        <p className="authorization__text">Пароль</p>
                        <input type="password" name="password" value={values.password || ""} onChange={handleChange} placeholder="Пароль" className="authorization__input authorization__input_type_password" id="password-input" minLength="2" maxLength="200" required />
                        <span className={`authorization__text-error password-input-error ${errors.name ? "authorization__text-error_active" : ""}`}>{errors.password}</span>
                    </div>
                    <div className="authorization__button-label authorization__button-login">
                        <span className="authorization__button-error">{errorMessage}</span>
                        <button type="submit" className={`authorization__button ${!isValid ? "authorization__button_unworked" : ""}`}>Войти</button>
                    </div>
                </form>
                <div className="authorization__sign">
                    <p className="authorization__question">Ещё не зарегистрированы?</p>
                    <Link to="/signup" className="authorization__login">
                        <p className="authorization__link">Регистрация</p>
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default Login;