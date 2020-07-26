import axios from 'axios';

export default class Movie {
    constructor(id) {
        this.id = id;
    }

    async getMovie () {
        const apiKey = '98726c0527470e8722b271fb8ed8edfb';

        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${this.id}?api_key=${apiKey}&language=en-US`);
            const data = res.data;
            console.log(data);
            this.title = data.title;
            this.overview = data.overview;
            this.release = data.release_date;
            this.poster = data.poster_path;
            this.imdb_id = data.imdb_id
            this.runtime = data.runtime;

            
        } catch (error) {
            console.log(error);
        }
    }
}