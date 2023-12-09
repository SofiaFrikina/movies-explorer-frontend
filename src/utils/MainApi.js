class MainApi {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    setToken(token) {
        this._headers['authorization'] = `Bearer ${token}`;
    };

    register(name, email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "name": name
            }),
        })
            .then(this._checkResponse);
    };
    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
        })
            .then(this._checkResponse);
    };

    getUser() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkResponse)
    };

    getMovies() {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkResponse)
    };

    editUser(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
            .then(this._checkResponse)
    };

    addMovies(data) {
        return fetch(`${this._url}/movies`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duretion: data.duretion,
                year: data.year,
                description: data.description,
                image: data.image,
                trailerLink: data.trailerLink,
                thumbnail: data.thumbnail,
                owner: data.owner,
                movieId: data.movieId,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
            })
        })
            .then(this._checkResponse)
    };


    deleteMovie(movieId) {
        return fetch(`${this._url}/movies/${movieId}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(this._handleResponse);
    };

    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(this._handleResponse);
    }
    /*
    editAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._handleResponse)
    }*/
}

const mainApi = new MainApi({
    url: 'https://api.sofia.fr.nomoredomainsmonster.ru',
    headers: {
        authorization: '',
        "Content-Type": "application/json",
    },
})

export default mainApi;