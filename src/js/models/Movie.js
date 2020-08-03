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

            const genres = data.genres.map(genre => genre.name).join(', ');
            const year = data.release_date.substring(0, 4);

            this.title = data.title;
            this.overview = data.overview;
            this.release = year;
            this.poster = data.poster_path;
            this.imdb_id = data.imdb_id
            this.runtime = data.runtime;
            this.genre = genres;
            this.rating = data.vote_average.toFixed(1);

            const getVideo = await axios.get(`https://api.themoviedb.org/3/movie/${this.id}/videos?api_key=${apiKey}&language=en-US`);
            const video = getVideo.data.results[0].key; 
            this.video = `https://www.youtube.com/watch?v=${video}`;
            console.log(video);
            
        } catch (error) {
            console.log(error);
        }
    }
}