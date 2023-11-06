export enum COOKIE_NAMES {
    AUTH = 'auth_token'
}

export class CookiesHandler {
    private _cookieName = ''
    constructor(cookieName: string){
        this._cookieName = cookieName
    }

    private handleCookie = (cookieValue = '', extraParams: string = '', expirationDays = 30) => {
        const expires = this.calculateExpiration(cookieValue, expirationDays);

        document.cookie = `${this._cookieName}=${cookieValue}; ${expires}; path=/; ${extraParams}`;
    }

    private calculateExpiration(cookieValue = '', expirationDays = 30) {
        const d = cookieValue === '' ? new Date('01-01-1970') : new Date();
        d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        return `expires=${d.toUTCString()}`;
    }

    setCookie(cookieValue: string, extraParams: string = '', expirationDays = 30) {
        this.handleCookie(cookieValue, extraParams, expirationDays = 30)
    };

    getCookieValue () {
        const name = `${this._cookieName}=`;
        const ca = document.cookie.split(';').map(cookie => cookie.trim());

        for (const cookie of ca) {
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }

        return '';
    };

    removeCookie() {
        this.handleCookie()
    };

    get cookieName() {
        return this._cookieName
    }
}

export const cookieAuthHandler = new CookiesHandler(COOKIE_NAMES.AUTH)

