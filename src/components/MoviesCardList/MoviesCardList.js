import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ movies }) {
    const [isActivePreloader, setActivePreloader] = React.useState(false)

    function handlePreloader() {
        setActivePreloader(!isActivePreloader)
    }
    return (
        <section className="elements">
            <div className="elements__list">
                {movies.map((movie) => (
                    <MoviesCard movie={movie} key={movie._id} />
                ))}
            </div>
            {isActivePreloader ? (<Preloader />) : (<button onClick={handlePreloader} type="button" className="element__button" aria-label="Показать больше фильмов">
                Ещё
            </button>)}
        </section>
    )
}

export default MoviesCardList;