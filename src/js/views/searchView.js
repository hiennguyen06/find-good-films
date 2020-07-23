export const getInput = () => document.querySelector('.search-field').value;

// clear the search input 
export const clearInput = () => {
    document.querySelector('.search-field').value = "";
};

// clear the results 
export const clearSearchResults = () => {
    document.querySelector(`.search-list`).innerHTML = "";
};

const renderSearchMovies = search => {
    const poster = `https://image.tmdb.org/t/p/w780${search.poster_path}`;
    const image = poster === 'https://image.tmdb.org/t/p/w780null' ? 'http://www.newdesignfile.com/postpic/2015/02/no-icon-available_68024.png' : `${poster}`;

    const markup = `
        <li class="movie-card">
            <img src="${image}">
            <div class="movie-card__info">
                <p>${search.title}</p>
            </div>
        </li>
    `
    document.querySelector('.search-list').insertAdjacentHTML('beforeend', markup);
};

export const renderAllSearchMovies = searches => {
    searches.forEach(renderSearchMovies)
};