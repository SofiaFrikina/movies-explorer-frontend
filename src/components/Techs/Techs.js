import React from 'react';


function Techs() {
    return (
        <section className="techs">
            <h2 className="techs__header">Технологии</h2>
            <div className="techs__container">
                <h3 className="techs__title">7 технологий</h3>
                <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
            <ul className="techs__list">
                <li className="techs__lang">HTML</li>
                <li className="techs__lang">CSS</li>
                <li className="techs__lang">JS</li>
                <li className="techs__lang">React</li>
                <li className="techs__lang">Git</li>
                <li className="techs__lang">Express.js</li>
                <li className="techs__lang">mongoDB</li>
            </ul>
        </section>
    )
}

export default Techs;