
const version = "v1";
const routes = {
    base: "http://localhost:8000",
    version: version,
    routes: {
        getMovies: "/api/"+version+"/movie",
        getMovie: "/api/"+version+"/movie/"
    }
}
;

export default routes;


