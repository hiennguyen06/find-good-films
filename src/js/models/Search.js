import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getSearchResults() {
        const apiKey = '98726c0527470e8722b271fb8ed8edfb';

        try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${this.query}&page=1&include_adult=false`);
            this.result = res.data.results;
            // console.log(res);

        } catch (error) {
            alert(error)
        }
    }
}