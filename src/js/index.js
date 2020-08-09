import Search from './models/Search';
import Movie from './models/Movie';
import Favourites from './models/Favourites';
import * as searchView from './views/searchView';
import * as movieView from './views/movieView';
import * as favouritesView from './views/favouritesView';
import * as popularView from './views/popularView';
import * as upcomingView from './views/upcomingView';
import * as nowPlayingView from './views/nowPlayingView';
import { renderLoader, clearLoader } from './views/base';

// Test the search model
// const search = new Search('Harry');
// search.getSearchResults();
// console.log(search);

const state = {}

const controlSearch = async () => {
    const query = searchView.getInput();
    
    // if there is a query, do the following actions 
    if (query) {

        // new Search Object. Add to the state
        state.search = new Search(query);

        // Prepare UI 
        searchView.clearInput();
        searchView.clearSearchResults();
        renderLoader(document.querySelector('.search-list'));

        // search for movies using the Search model
        await state.search.getSearchResults();
        console.log(state.search)

        // Render results to UI
        clearLoader();
        searchView.renderAllSearchMovies(state.search.result);
    }
};

// Test the search model
// const movie = new Movie('671');
// movie.getMovie();
// console.log(movie);

const controlMovie = async () => {

    // Get the ID from the hash URL
    const id = window.location.hash.replace('#', '');

    // if id exists 
    if (id) {
        // Prepare UI for changes
        movieView.clearMovie();

        // Create a new Movie object
        state.movie = new Movie(id);
        
        try {
            
            // Get the movie data
            await state.movie.getMovie();
            // console.log(state.movie); // console log the state.movie for now. Clicking on each movie will render a new id in the console.

            // render the movie to UI
            movieView.renderMovie(
                state.movie,
                state.favourites.isFavourited(id)
            );
 
        } catch (error) {
            console.log(error);
        }
    }
    movieView.closeMovie();
};

// Favourite controller 
const controlFavourite = () => {
    // if we don't already have an exisiting favourited movie
    if (!state.favourites) state.favourites = new Favourites();
    // save id of current movie
    const currentID = state.movie.id;
    // console.log(currentID);

    // User has not liked the current movie
    if (!state.favourites.isFavourited(currentID)) {
        // add the favourite to the state
        const newFavourite = state.favourites.addFavourites(
            currentID,
            state.movie.title,
            state.movie.release,
            state.movie.poster,
        )
        
        // Toggle the favourites button
        favouritesView.toggleFavouriteBtn(true);

        // Render the UI list
        favouritesView.renderFavourite(newFavourite);
        // console.log(state.favourites);

    }  else {
        // Remove like to the state
        state.favourites.deleteFavourite(currentID);

        // Toggle the like button
        favouritesView.toggleFavouriteBtn(false);

        // Remove Like to UI list
        favouritesView.removeFavourite(currentID);
        // console.log(state.favourites)
    }

    // Toggle the like menu when there is more than 1 like
    favouritesView.toggleFavouriteMenu(state.favourites.getNumFav());
}

// Restore likes recipe on page load
window.addEventListener('load', () => {
    state.favourites = new Favourites();
    
    // restore the likes
    state.favourites.readStorage();

    // toggle the like button
    favouritesView.toggleFavouriteMenu(state.favourites.getNumFav());

    // render the existing likes
    state.favourites.favourites.forEach(favourite => favouritesView.renderFavourite(favourite));
});


['hashchange'].forEach(event => window.addEventListener(event, controlMovie));

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

document.querySelector('.movie').addEventListener('click', e => {
    if (e.target.closest('.btn-watchlist, btn-watchlist *')) {
        controlFavourite();
    }   
});



document.querySelector('.btn-open-watchlist').addEventListener('click', e=> {
    const scrollY = window.scrollY;
    document.getElementsByTagName('body')[0].style.position = 'fixed';
    document.getElementsByTagName('body')[0].style.top = `-${scrollY}px`;
    // document.querySelector('.movie').style.display = 'grid';
    document.querySelector('.watchlist-section').style.opacity = '1';
    document.querySelector('.watchlist-section').style.pointerEvents = 'auto';
});

export const closeWatchlist = () => {
    document.querySelector('.watchlist-panel').addEventListener('click', e => {
        if (e.target.matches('.close-fav, .close-fav *')) {
            document.querySelector('.watchlist-section').style.pointerEvents = 'none';
            document.querySelector('.watchlist-section').style.opacity = '0';
            const scrollY = document.getElementsByTagName('body')[0].style.top;
            document.getElementsByTagName('body')[0].style.position = '';
            document.getElementsByTagName('body')[0].style.top = '';
        } else if (e.target.matches('.btn-remove-fav')) {
            window.localStorage.clear()
            document.querySelector(`.watchlist`).innerHTML = "";

        }
    }); 
};
closeWatchlist();

popularView.getPopular();

// const removelistActive = document.querySelector("nav-items").getElementsByTagName("a").classList.remove('active');;

//trigger and remove active class 
let activeListItems = document.querySelectorAll('.list');

activeListItems.forEach(li => {
    li.addEventListener('click', function () {
        activeListItems.forEach(li => li.classList.remove('active'));
        this.classList.add('active');
    });
})

document.querySelector('.nav-items').addEventListener('click', e => {
    if (e.target.closest('.upcoming, upcoming *')) {
        searchView.clearSearchResults();
        upcomingView.getUpcoming();
  
    } else if (e.target.closest('.now-playing, now-playing *')) {
        searchView.clearSearchResults();
        nowPlayingView.getNowPlaying();

    } else if (e.target.closest('.popular, popular *')) {
        searchView.clearSearchResults();
        popularView.getPopular();
    }
}); 

