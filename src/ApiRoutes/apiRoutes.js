const version = "v1";
const routes = {
    base: "http://192.168.0.91:8000",
    version: version,
    routes: {
        login: "/api/login_check",
        register: "/api/register",
        getMovies: "/api/"+version+"/movie",
        getMovie: "/api/"+version+"/movie/",
        getFavorites: "/api/"+version+"/favorites",
        getBestMovies: "/api/"+version+"/best-movies",
        addComment: "/api/" + version + "/comment",
        getComment: "/api/" + version + "/comment/"
    }
}
;

export default routes;


