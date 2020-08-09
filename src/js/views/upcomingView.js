import axios from 'axios';

export const getUpcoming = async () => {
    const apiKey = '98726c0527470e8722b271fb8ed8edfb';
    const upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;

    const res = await axios(upcomingURL);
    const data = res.data.results
    // console.log(data);

    const movie = data.map((result, index) => ({
        index: index + 1,
        title: result.title,
        id: result.id,
        poster: result.poster_path,
        release: result.release_date.substring(0, 4)

    }));

    // console.log(movie);
    renderUpcomingMovies(movie);
}

const renderUpcomingMovie = (movie) => {
    const poster = `https://image.tmdb.org/t/p/w780${movie.poster}`;
    const image = poster === 'https://image.tmdb.org/t/p/w780null' ? 'http://samodrole.com/projects/amos/images/noImage.png' : `${poster}`;

    const markup = `

        <li class="movie-card">
            <a href="#${movie.id}">
                <img src="${image}">
                <div class="movie-card__info">
                    <p>${movie.title}</p>
                    <p>${movie.release}</p>
                </div>  
            </a>
        </li>
    `
    document.querySelector('.search-list').insertAdjacentHTML('beforeend', markup);
}

const renderUpcomingMovies = movies => {
    movies.map(renderUpcomingMovie);
}
