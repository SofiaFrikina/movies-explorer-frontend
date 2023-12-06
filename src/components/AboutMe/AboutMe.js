import React from 'react';
import avatarImage from '../../images/avatar.jpg'


function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__header">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__info">
                    <h3 className="about-me__title">Виталий</h3>
                    <h4 className="about-me__subtitle">Фронтенд-разработчик, 30 лет</h4>
                    <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <a className="about-me__link" href="https://github.com/SofiaFrikina" rel="noreferrer" target="_blank">Github</a>
                </div>
                <img src={avatarImage} className="about-me__avatar" alt="Фотография студента" />
            </div>
        </section>
    )
}

export default AboutMe;