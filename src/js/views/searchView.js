export const getInput = () => document.querySelector('.search-field').value.toLowerCase();

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
    const image = poster === 'https://image.tmdb.org/t/p/w780null' ? 'http://samodrole.com/projects/amos/images/noImage.png' : `${poster}`;

    const markup = `
        <li class="movie-card">
            <a href="#${search.id}">
                <img src="${image}">
                <div class="movie-card__info">
                    <p class="movie-card__title">${search.title}</p>
                    <p>${search.release_date.substring(0, 4)}</p>
                </div>  
            </a>
        </li>
    `
    document.querySelector('.search-list').insertAdjacentHTML('beforeend', markup);
};

export const renderAllSearchMovies = searches => {
    searches.forEach(renderSearchMovies)
};