import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onSignOut, onProfile, errorMessage }) {
    const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();
    const [isOpenButton, setIsOpenButton] = React.useState(false);
    const currentUser = React.useContext(CurrentUserContext)

    function openButton() {
        setIsOpenButton(!isOpenButton)
    }
    //получить значеня инпутов
    React.useEffect(() => {
        resetForm({ email: currentUser.email, name: currentUser.name })
    }, [currentUser, isOpenButton, resetForm]);

    //если хоть один инпут не такой, как изначально "сохранить" можно
    React.useEffect(() => {
        let meanings = currentUser.email !== values.email || currentUser.name !== values.name
        setIsOpenButton(meanings);
    }, [currentUser.email, currentUser.name, values.email, values.name]);

    //функция сохранения/обновления профиля
    function handleProfileSubmit(evt) {
        evt.preventDefault();
        const { email, name } = values;
        onProfile({ email, name });
    }

    return (
        <main className="profile">
            <section className="profile__container">
                <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                <form className="profile__form" onSubmit={handleProfileSubmit} noValidate>
                    <div className="profile__label">
                        <p className="profile__text">Имя</p>
                        <input type="text" name="name" value={values.name || ""} onChange={handleChange} pattern="^[a-zA-Zа-яА-Я \-]+$" placeholder="Имя" className="profile__input profile__input_type_name" id="name-input" minLength="2" maxLength="30" required />
                        <span className={`profile__text-error ${errors.name ? "profile__text-error_active" : ""}`}>{errors.name}</span>
                    </div>
                    <div className="profile__label">
                        <p className="profile__text">E-mail</p>
                        <input type="email" name="email" value={values.email || ""} onChange={handleChange} pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" placeholder="Email" className="profile__input profile__input_type_email" id="email-input" required />
                        <span className={`profile__text-error ${errors.email ? "profile__text-error_active" : ""}`}>{errors.email}</span>
                    </div>
                    <div className="profile__button-label">
                        <span className="profile__button-error">{errorMessage}</span>
                        {isOpenButton ? (<button type="submit" onSubmit={handleProfileSubmit} className={`profile__change profile__change-saved ${!isValid ? "profile__change_disable" : ""}`}>Сохранить</button>) : (<button type="submit" className="profile__change profile__change-edit" onClick={(evt) => openButton(evt)}>Редактировать</button>)}
                    </div>
                </form>
                {!isOpenButton && (<Link to="/" className="profile__logout" onClick={onSignOut}>
                    <p className="profile__link">Выйти из аккаунта</p>
                </Link>)}
            </section>
        </main>
    )
}

export default Profile;