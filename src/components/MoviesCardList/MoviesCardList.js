import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { DESKTOP_SIZE, MEDIUM_SIZE, MOBILE_SIZE, MOVIES_COUNT_DESKTOP_SIZE, MOVIES_COUNT_MEDIUM_SIZE, MOVIES_COUNT_MOBILE_SIZE, MORE_MOVIES_COUNT_DESKTOP_SIZE, MORE_MOVIES_COUNT_MEDIUM_SIZE, MORE_MOVIES_COUNT_MOBILE_SIZE } from '../../utils/constants';

function MoviesCardList({ movies, isLoading }) {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const [moviesCount, setMoviesCount] = React.useState(0);
    const [biggerMoviesCount, setBiggerMoviesCount] = React.useState(0);
    const [isActivePreloader, setIsActivePreloader] = React.useState(false);

    React.useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    //функция проверки количества фильмов, зависящее от ширины экрана
    const checkedCountMovies = () => {
        if (windowWidth >= DESKTOP_SIZE) {
            setMoviesCount(MOVIES_COUNT_DESKTOP_SIZE);
            setBiggerMoviesCount(MORE_MOVIES_COUNT_DESKTOP_SIZE)
        }
        if (windowWidth >= MEDIUM_SIZE && windowWidth < DESKTOP_SIZE) {
            setMoviesCount(MOVIES_COUNT_MEDIUM_SIZE);
            setBiggerMoviesCount(MORE_MOVIES_COUNT_MEDIUM_SIZE);
        }
        if (windowWidth >= MOBILE_SIZE && windowWidth < MEDIUM_SIZE) {
            setMoviesCount(MOVIES_COUNT_MOBILE_SIZE);
            setBiggerMoviesCount(MORE_MOVIES_COUNT_MOBILE_SIZE);
        }
    }

    //функция изменения размера ширины экрана устройства
    function handleResize() {
        setWindowWidth(window.innerWidth);
    }

    //функция показать больше фильмов
    function handlePreloaderButton() {
        checkedCountMovies();
        setMoviesCount(moviesCount + biggerMoviesCount);
        if (moviesCount - biggerMoviesCount) {
            setIsActivePreloader(false)
        }
    }

    return (
        <section className="elements">
            <ul className="elements__list">
                {isLoading ? <Preloader /> : movies.slice(0, moviesCount).map((movie) => (
                    <MoviesCard movie={movie} key={movie._id} />
                ))}

            </ul>
            {isActivePreloader && (<button onClick={handlePreloaderButton} type="button" className="elements__button" aria-label="Показать больше фильмов">
                Ещё
            </button>)}
        </section>
    )
}

export default MoviesCardList;