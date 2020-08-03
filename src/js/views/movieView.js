export const clearMovie = () => {
    document.querySelector('.movie').innerHTML = '';
};

export const renderMovie = (movie, isFavourited) => {
    const poster = `https://image.tmdb.org/t/p/w780${movie.poster}`;
    const image = poster === 'https://image.tmdb.org/t/p/w780null' ? 'http://samodrole.com/projects/amos/images/noImage.png' : `${poster}`;

    const markup = `
    <button class="close">&times;</button>
    <div class="movie-content">
        <div class="poster">
            <img src="${image}">
        </div>
        <div class="movie-content__info">
            <div class="title">
                <h1>${movie.title}<span class="release">${movie.release}</span></h1>
            </div>
            <div class="rating">
                <i class="fab fa-imdb"></i>
                <p>${movie.rating}</p>
            </div>

            <p class="plot">${movie.overview}</p> 

            <h3>Genre</h3>
            <p>${movie.genre}</p>

            <div class="movie-buttons">
                <button class="btn btn-watchlist">
                    <i class="${isFavourited ? 'fas fa-bookmark' : 'far fa-bookmark'}"></i>
                    <p>WATCHLIST</p>
                </button>
                <a href="${movie.video}" target="_blank">
                    <button class="btn btn-trailer">
                        <i class="fas fa-play"></i>
                        <p class="trailer-text">WATCH TRAILER</p>
                    </button>
                </a>
            </div>
        </div>
    </div>
    `

    document.querySelector('.movie').insertAdjacentHTML('afterbegin', markup)
    const scrollY = window.scrollY;
    document.getElementsByTagName('body')[0].style.position = 'fixed';
    document.getElementsByTagName('body')[0].style.top = `-${scrollY}px`;
    // document.querySelector('.movie').style.display = 'grid';
    document.querySelector('.movie').style.opacity = '1';
    document.querySelector('.movie').style.pointerEvents = 'auto';

    // const truncateText = (selector, maxLength) => {
    //     const element = document.querySelector(selector);
    //     let truncated = element.innerText;
    
    //     if (truncated.length > maxLength) {
    //         truncated = truncated.substr(0,maxLength) + '...';
    //     }
    //     return truncated;
    // }

    // document.querySelector('.plot').innerText = truncateText('.plot', 380);

};

export const closeMovie = () => {
    document.querySelector('.wrapper').addEventListener('click', e => {
        if (e.target.matches('.close, .close *')) {
            clearMovie();
            document.location.hash = '';
            document.querySelector('.movie').style.pointerEvents = 'none';
            document.querySelector('.movie').style.opacity = '0';
            const scrollY = document.getElementsByTagName('body')[0].style.top;
            document.getElementsByTagName('body')[0].style.position = '';
            document.getElementsByTagName('body')[0].style.top = '';
        }
    }); 
};