import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import InfoTooltip from '../InfoTooltip/InfoTooltip';


function SavedMovies({ filteredMovies, onDeleteCard, onSaveCard, savedMovies }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSearchText, setIsSearchText] = React.useState('');
    const [isActiveCheckbox, setIsActiveCheckbox] = React.useState(false);
    const [shortMovies, setShortMovies] = React.useState([]);//короткомтеражки
    const [allMovies, setAllMovies] = React.useState([]);//все фильмы
    const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
    const [message, setMessage] = React.useState(false);

    React.useEffect(() => {
        getOnSearchMovies();
        //onSetSearchShortMovies();
        setAllMovies(filteredMovies);
        setShortMovies(onSearchShortMovies(allMovies));
    }, [isSearchText, isActiveCheckbox])

    React.useEffect(() => {
        restoringPreviousSearch();
    }, [])

    function handleChangeCheckbox() {
        setIsActiveCheckbox(!isActiveCheckbox);
    }
    //поиск фильмов
    function onSearch(moviesList, searchMovie) {
        return moviesList.filter((movie) => {
            return (movie.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchMovie.toLowerCase()));
        });
    }

    function onSearchShortMovies(moviesList) {
        return moviesList.filter((movie) => {
            return movie.duration <= 40;
        })
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

    function getOnSearchMovies() {
        setIsLoading(true);
        //setAllMovies(savedMovies);
        try {
            //setAllMovies(savedMovies);
            //console.log(filteredMovies, isSearchText);
            if (isSearchText.length > 0) {
                const moviesData = onSearch(filteredMovies, isSearchText)
                if (moviesData.length === 0) {
                    setInfoTooltipOpen(true);
                    setMessage(false)
                } else {
                    setAllMovies(moviesData);
                }
            }
            return;
        } catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
        }
    }


    function closeAllPopups() {
        setInfoTooltipOpen(false);
    }
    return (
        <main className="movies">
            <SearchForm onSearch={setIsSearchText} handleChangeCheckbox={handleChangeCheckbox} isSearchText={isSearchText} isActiveCheckbox={isActiveCheckbox} />
            <MoviesCardList movies={isSearchText ? isActiveCheckbox ? shortMovies : filteredMovies : isActiveCheckbox ? shortMovies : allMovies} isLoading={isLoading} isSavedCard={true} onDeleteCard={onDeleteCard} onSaveCard={onSaveCard} savedMovies={savedMovies} />
            <InfoTooltip
                isOpen={isInfoTooltipOpen}
                onClose={closeAllPopups}
                status={message}
            />
        </main>
    )
}

export default SavedMovies;