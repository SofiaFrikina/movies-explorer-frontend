import React from 'react';

function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <h2 className="about-project__header">О проекте</h2>
            <div className="about-project__container">
                <div className="about-project__about">
                    <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__about">
                    <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>

            <div className="about-project__week">
                <p className="about-project__backend">1 неделя</p>
                <p className="about-project__frontend">4 неделя</p>
            </div>
            <div className="about-project__week">
                <p className="about-project__text">Back-end</p>
                <p className="about-project__text">Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;