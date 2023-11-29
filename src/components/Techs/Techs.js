import React from 'react';


function Techs() {
    return (
        <section className="techs">
            <h1 className="techs__header">Технологии</h1>
            <div className="techs__container">
                <h2 className="techs__title">7 технологий</h2>
                <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
            <div className="techs__list">
                <p className="techs__lang">HTML</p>
                <p className="techs__lang">CSS</p>
                <p className="techs__lang">JS</p>
                <p className="techs__lang">React</p>
                <p className="techs__lang">Git</p>
                <p className="techs__lang">Express.js</p>
                <p className="techs__lang">mongoDB</p>
            </div>

        </section>
    )
}

export default Techs;