import React from 'react';

function MoviesCard({ movie }) {
    const [isSavedCard, setSavedCard] = React.useState(false)

    function handleSavedClick() {
        setSavedCard(!isSavedCard)
    }

    return (
        <li className="element">
            <div className="element__description">
                <h2 className="element__text">{movie.nameRU}</h2>
                <p className="element__time">{movie.duration}</p>
            </div>
            <a className="element__image-link" href={movie.trailerLink} rel="noreferrer" target="_blank"><img className="element__image" src={movie.image} alt={`${movie.name}`} /></a>
            <button onClick={handleSavedClick} type="button" className={isSavedCard ? "element__button-unsaved element__button-saved" : "element__button-unsaved"} aria-label="Сохранить фильм"></button>
        </li>
    )
}

export default MoviesCard;