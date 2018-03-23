/**
 * Created by daniel on 15/03/18.
 */
import axios from 'axios';

const MDB_BASE_PATH = 'https://api.themoviedb.org/3/';
const MDB_PATH = 'https://api.themoviedb.org/3/discover/movie?api_key=';
const MDB_API_KEY = '0e47f7ea4b45e912bbeff19d72d8a243';
const MDB_PHOTO_500 = 'https://image.tmdb.org/t/p/w500';
const MDB_PHOTO_300 = 'https://image.tmdb.org/t/p/w300';
const MDB_LENGUAJE = '&language=es-ES';
const MDB_SEARCH_BY_YEAR = '&primary_release_year=';
const MDB_DISCOVER_URL_BASE = 'https://api.themoviedb.org/3/discover/movie?api_key=0e47f7ea4b45e912bbeff19d72d8a243&language=es-ES';



const discover = () => {
    return axios.post(MDB_DISCOVER_URL_BASE, {});
};

const search = (query) => {
    const MDB_MOVIE_URL_BASE = `https://api.themoviedb.org/3/search/movie?api_key=${MDB_API_KEY}&language=es-ES&page=1&include_adult=false&query=${query}`;

    return axios.post(MDB_MOVIE_URL_BASE + query, {});
};

const searchById = (mdb_id) => {
    const MDB_SEARCH_BY_ID = `https://api.themoviedb.org/3/movie/${mdb_id}?api_key=${MDB_API_KEY}&language=es-Es`;

    console.log("datos", MDB_SEARCH_BY_ID);

    return axios.get(MDB_SEARCH_BY_ID, {});
};

export {
    discover,
    search,
    searchById
}