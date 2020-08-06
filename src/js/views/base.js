import axios from 'axios';

export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class= "loader">
            <svg>
                <use href="img/icons.svg#icon-spinner2"></use>
            </svg>
            <span class="loading"></span>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};

export const getPopular = async () => {
    const apiKey = '98726c0527470e8722b271fb8ed8edfb';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    const res = await axios(url);
    const data = res.data.results
    // console.log(data);

    const movie = data.map((result, index) => ({
        index: index + 1,
        title: result.title,
        id: result.id,
        poster: result.poster_path
    }));

    // console.log(movie);
    renderPopularMovies(movie);
}

const renderPopularMovie = (movie) => {
    const poster = `https://image.tmdb.org/t/p/w780${movie.poster}`;
    const image = poster === 'https://image.tmdb.org/t/p/w780null' ? 'http://samodrole.com/projects/amos/images/noImage.png' : `${poster}`;

    const markup = `

        <li class="movie-card">
            <a href="#${movie.id}">
                <img src="${image}">
                <div class="movie-card__info">
                    <p>${movie.title}</p>
                </div>  
            </a>
        </li>
    `
    document.querySelector('.search-list').insertAdjacentHTML('beforeend', markup);
}

const renderPopularMovies = movies => {
    movies.map(renderPopularMovie);
}
