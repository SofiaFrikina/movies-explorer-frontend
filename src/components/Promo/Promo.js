import React from 'react';
import globe from '../../images/globe.svg';


function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента факультета Веб&#8722;разработки.</h1>
                <h2 className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</h2>
            </div>
            <img src={globe} className="promo__image"
                alt="Глобус" />
        </section>
    )
}

export default Promo;