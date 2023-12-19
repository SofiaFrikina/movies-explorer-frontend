import React from 'react';

function MoviesCard({ movie, isSavedCard, onDeleteCard, onSaveCard, savedMovies }) {
    //const [isSavedCard, setSavedCard] = React.useState(false);

    //const time = movie.duretion;
    let isLiked = false;
    let likedId;
    likedId = savedMovies.some((card) => {
        if (card.movieId === movie.movieId) {
            likedId = card._id;
            return true
        }
        return false;
    })
    const duration = movie.duration;
    function handleDuration(duration) {
        const hours = Math.floor(duration / 60);
        const convertedHoursToMin = hours * 60;
        const min = duration - convertedHoursToMin;
        if (hours !== 0) {
            return `${hours}ч ${min}м`;
        } else {
            return `${min}м`;
        }
    }


    /*function handleSavedClick() {
        return isLiked || isSavedCard ? onDeleteCard(movie._id ? movie._id : likedId) : onSaveCard(movie)
    }*/

    return (
        <li className="element">
            <div className="element__description">
                <h2 className="element__text">{movie.nameRU}</h2>
                <p className="element__time">{handleDuration(duration)}</p>
            </div>
            <a className="element__image-link" href={movie.trailerLink} rel="noreferrer" target="_blank"><img className="element__image" src={movie.image} alt={`${movie.name}`} /></a>
            <button onClick={() => {
                isLiked || isSavedCard ? onDeleteCard(movie._id ? movie._id : likedId) : onSaveCard(movie)
            }} type="button" className={isSavedCard ? "element__button-unsaved element__button-delete" : isLiked ? "element__button-unsaved element__button-saved" : "element__button-unsaved"} aria-label="Сохранить фильм"></button>
        </li>
    )
}

export default MoviesCard;