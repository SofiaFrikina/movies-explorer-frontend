import React, { useCallback } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function Movies({ filteredMovies }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSearchText, setIsSearchText] = React.useState('');
    const [isActiveCheckbox, setIsActiveCheckbox] = React.useState(false);
    const [shortMovies, setShortMovies] = React.useState([]);//короткомтеражки
    const [allMovies, setAllMovies] = React.useState([]);//все фильмы
    const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
    const [message, setMessage] = React.useState(false);



    React.useEffect(() => {
        restoringPreviousSearch();
    }, [])

    function handleChangeCheckbox() {
        setIsActiveCheckbox(!isActiveCheckbox);
    }
    //поиск фильмов
    function onSearch(moviesList, searchMovie) {
        return moviesList.filter((movie) => {
            return (movie.nameRU.toLowerCase().includes(searchMovie.toLowerCase) || movie.nameEN.toLowerCase().includes(searchMovie.toLowerCase));
        });
    }

    function onSearchShortMovies(moviesList) {
        return moviesList.filter((movie) => movie.duration <= 40)
    }

    //восстановление результатов предыдущего поиска: сохранила в localStorage текст запроса, состояние переключателя короткометражек и найденные фильмы
    function restoringPreviousSearch() {
        if (localStorage.getItem('previousText')) {
            setIsSearchText(localStorage.getItem('previousText'));
        }
        if (localStorage.getItem('previousCheckbox')) {
            setIsActiveCheckbox(JSON.parse(localStorage.getItem('previousCheckbox')));
        }
        if (localStorage.getItem('previousMovies')) {
            setAllMovies(JSON.parse(localStorage.getItem('previousMovies')));
        }
        return;
    }

    const getOnSearchMovies = useCallback((isSearchText) => {
        setIsLoading(true);
        setAllMovies([]);
        try {
            const moviesData = onSearch(filteredMovies, isSearchText)
            if (moviesData.length > 0) {
                if (moviesData.length === 0) {
                    setInfoTooltipOpen(true);
                    setMessage(false)
                } else {
                    setAllMovies(onSearch(filteredMovies, isSearchText));
                    localStorage.setItem('previousText', isSearchText);
                    localStorage.setItem('previousMovies', JSON.stringify(moviesData));
                    localStorage.setItem('previousCheckbox', JSON.stringify(isActiveCheckbox));
                }
            }
            return;
        } catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
        }
    }, [filteredMovies, isActiveCheckbox])

    React.useEffect(() => {
        getOnSearchMovies();
        setShortMovies(onSearchShortMovies(allMovies))
    }, [allMovies, getOnSearchMovies])


    function closeAllPopups() {
        setInfoTooltipOpen(false);
    }

    return (
        <main className="movies">
            <SearchForm onSearch={setIsSearchText} handleChangeCheckbox={handleChangeCheckbox} isSearchText={isSearchText} isActiveCheckbox={isActiveCheckbox} />
            <MoviesCardList movies={isActiveCheckbox ? shortMovies : allMovies} isLoading={isLoading} />
            <InfoTooltip
                isOpen={isInfoTooltipOpen}
                onClose={closeAllPopups}
                status={message}
            />
        </main>
    )
}

export default Movies;