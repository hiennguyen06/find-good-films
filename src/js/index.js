import Search from './models/Search';
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

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});