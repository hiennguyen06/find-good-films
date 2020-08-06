import axios from 'axios';

export default class Filter {
    constructor(query) {
        this.query = query;
    }

    async getFilterResults() {
        const apiKey = '98726c0527470e8722b271fb8ed8edfb';

        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${this.query}?api_key=${apiKey}&language=en-US&page=1`);
            const data = res.data.results;

            console.log(data);

        } catch (error) {
            alert (error);
        }
    }

}