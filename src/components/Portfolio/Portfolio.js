import React from 'react';
import arrow from '../../images/arrow.svg'


function Portfolio() {
    return (
        <section className="portfolio">
            <h1 className="portfolio__header">Портфолио</h1>
            <ul className="portfolio__list">
                <li className="portfolio__el">
                    <a href="https://github.com/SofiaFrikina/how-to-learn.git" className="portfolio__link">Статичный сайт
                        <img src={arrow} className="portfolio__image"
                            alt="Стрелка" />
                    </a>
                </li>
                <li className="portfolio__el"><a href="https://sofiafrikina.github.io/russian-travel/index.html" className="portfolio__link">Адаптивный сайт <img src={arrow} className="portfolio__image"
                    alt="Стрелка" /></a></li>
                <li className="portfolio__el"><a href="https://github.com/SofiaFrikina/react-mesto-auth.git" className="portfolio__link">Одностраничное приложение <img src={arrow} className="portfolio__image"
                    alt="Стрелка" /></a></li>
            </ul>
        </section>
    )
}

export default Portfolio;