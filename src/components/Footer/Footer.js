import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__down">
                <p className="footer__text">© <span className="year">{new Date().getFullYear()}</span></p>
                <ul className="footer__list">
                    <li className="footer__el"><a className="footer__link" href="https://practicum.yandex.ru">Яндекс.Практикум</a></li>
                    <li className="footer__el"><a className="footer__link" href="https://github.com/SofiaFrikina">Github</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;