const SEARCH_USER_URL = (key, page) => `https://api.github.com/search/users?q=${key}+in:login&per_page=100&page=${page}`;
// const GET_SEARCH_USER_URL= (key,page) => `https://api.github.com/search/users?q=${key}&per_page=100&page=${page}`;
const SEARCH_REPO_URL = (name, page) => `https://api.github.com/users/${name}/repos?per_page=100&page=${page}`;
// const GET_SEARCH_REPO_URL= name => `https://api.github.com/users/${name}/repos`;

const APIKEY = 'token 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';
const $loading = document.querySelector('#loading__wrap');
const $searchInput = document.querySelector('#userInput');

export default class API {
    static async searchUserByKey(key, page) {
        this.startLoading()
        const res = await fetch(SEARCH_USER_URL(key, page), {
            method: "GET",
            headers: { Authorization: APIKEY },
        });
        this.endLoading()

        return await res.json();
    }

    static async searchRepositoriesByName(name, page) {
        this.startLoading()
        const res = await fetch(SEARCH_REPO_URL(name, page), {
            method: "GET",
            headers: { Authorization: APIKEY },
        });
        this.endLoading()

        return await res.json();
    }

    static startLoading() {
        $loading.style.display = 'block'
        $searchInput.blur()
    }

    static endLoading() {
        $loading.style.display = 'none'
        $searchInput.focus()
    }
}