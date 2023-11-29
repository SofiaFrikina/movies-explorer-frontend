import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import savedMovies from '../../utils/Saved-Movies';

function SavedMovies() {
    return (
        <div className="movies">
            <SearchForm />
            <MoviesCardList movies={savedMovies} />
        </div>
    )
}

export default SavedMovies;