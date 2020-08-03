export default class Favourites {
    constructor () {
        this.favourites = [];
    }

    addFavourites(id, title, release, poster) {
        const favourite = { id, title, release, poster };
        this.favourites.push(favourite);

        // save the data to localStorage
        this.persistData();

        return favourite;
    }

    deleteFavourite(id) {
        const index = this.favourites.findIndex(el => el.id === id);
        // splice => [2,4,8] splice(1, 1) -> return 4, orginal array is [2,8]; Mutates the original array
        // slice => [2,4,8] splice(1, 1) -> return 4, orginal array is [2,4,8]; Does not change the orginal array
        this.favourites.splice(index, 1);
    
        // delete data from localStorage
        this.persistData();
    }

    isFavourited(id) { // to test if we have a like already in the array. Need it to test the button
        return this.favourites.findIndex(el => el.id === id) !== -1;
    } 

    getNumFav() {
        return this.favourites.length;
    }

    persistData() {
        localStorage.setItem('favourites', JSON.stringify(this.favourites));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('favourites'));

        // Restoring from the local storage
        if (storage) this.favourites = storage;
    }

}
