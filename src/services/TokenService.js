
class TokenService {
    constructor() {

    }

    deleteToken() {
        sessionStorage.setItem('token', '');
    }

    getToken() {
        return sessionStorage.getItem('token');
    }

    checkToken(token) {
        if(token) {
            token = token.split(".");
            if(token.length) {
                let header = JSON.parse(atob(token[0]));
                let payload = JSON.parse(atob(token[1]));
                let now = Math.round(new Date().getTime()/1000.0);

                return {
                    header: header,
                    payload: payload,
                    hasExpired: now > payload.exp
                };
            }
        }

        return {
            payload: {},
            hasExpired: true
        }
    }
}

export default TokenService;