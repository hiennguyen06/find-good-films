export const toggleFavouriteBtn = isFavourited => {
    const iconString = isFavourited ? 'fas fa-bookmark' : 'far fa-bookmark';
    document.querySelector('.btn-watchlist i').setAttribute('class', `${iconString}`);

};

export const toggleFavouriteMenu = numFav => {
    document.querySelector('.watchlist').style.visibility = numFav > 0 ? 'visible' : 'hidden';
};


export const renderFavourite = favourite => {

    const poster = `https://image.tmdb.org/t/p/w780${favourite.poster}`;
    const image = poster === 'https://image.tmdb.org/t/p/w780null' ? 'http://samodrole.com/projects/amos/images/noImage.png' : `${poster}`;

     const markup = `
     <a href="#${favourite.id}">
        <li class="favourites-card">
                <div class="favourite-poster">
                    <img src="${image}">
                </div>
                <div class="favourite-data">
                    <h3>${favourite.title}</h3>
                    <p>${favourite.release}</p>
                </div>
        </li>
    </a>

    `;

    document.querySelector('.watchlist').insertAdjacentHTML('beforeend', markup)

};

export const removeFavourite = id => {
    const el = document.querySelector(`.favourites-card[href*="${id}"]`);
    if (el) el.parentElement.removeChild(el); // if this an element, remove it
};