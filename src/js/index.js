import Search from './models/Search';
import Movie from './models/Movie';
import * as searchView from './views/searchView';
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

        // Create a new Movie object
        state.movie = new Movie(id);
        
        try {
            
            await state.movie.getMovie();
            console.log(state.movie); // console log the state.movie for now. Clicking on each movie will render a new id in the console.
 
        } catch (error) {
            console.log(error);
        }
    }

};

['hashchange'].forEach(event => window.addEventListener(event, controlMovie));

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});