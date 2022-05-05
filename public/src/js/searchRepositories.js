import API from "../API/api.js";

export const renderRepositories = async (name, $target) => {
    const page = repositoryPage()
    if (beforeSearched({ name, page })) return;
    appendRepositoriesToTarget(await getRepositoryFromAPI({ name, page }), $target)
}

export const refreshAndRenderRepositories = async ({ name, $target }) => {
    repositoryPage(0)
    $target.innerHTML = '';
    appendRepositoriesToTarget(await getRepositoryFromAPI({ name, page: 1 }), $target)
}

const appendRepositoriesToTarget = (repositories, $target) => {
    repositories?.forEach(repositoy => $target.append(createRepositoryDiv(repositoy)))
    if (repositories.length === 0) {
        if (repositoryPage() === 0)
            createEmptyRepositoryDiv($target)
    } else {
        repositoryPage(repositoryPage() + 1)
    }
}

const createEmptyRepositoryDiv = ($target) => {
    const $emptyRepositoryDiv = document.createElement('div')
    $emptyRepositoryDiv.classList.add('empty__repository_wrap')
    $emptyRepositoryDiv.innerHTML = 'NOTHING...'
    $target.append($emptyRepositoryDiv)
}

const createRepositoryDiv = (repositoy) => {
    const $repositoryDiv = document.createElement('div')
    $repositoryDiv.classList.add('repository__wrap')
    const { name, updated_at, stargazers_count, watchers } = repositoy
    const date = updated_at.substring(2, 10).replaceAll('-', '/')
    $repositoryDiv.innerHTML = `
        <span class='repository__star'><i>star</i> ${stargazers_count}</span>
        <span class='repository__name'>${name}</span>
        <span class='repository__update'>Last updated:${date}</span>
        <span class='repository__watch'><i>visibility</i>${watchers}</span>
    `;
    return $repositoryDiv;
}

const getRepositoryFromAPI = (() => {
    const cashData = [];
    return async ({ name, page }) => {
        const findMatchDataFunction = data => data.name === name && data.page === page;
        const isSearchedBefore = cashData.some(findMatchDataFunction)
        const resData = isSearchedBefore ? cashData.find(findMatchDataFunction).data : await getRepositoryList(name, page)
        if (!isSearchedBefore) cashData.push({ name, data: resData })
        return resData
    }
})()

const getRepositoryList = async (name, page) => {
    const repositories = await API.searchRepositoriesByName(name, page)
    return repositories?.map(data => {
        const { name, updated_at, stargazers_count, watchers } = data;
        return { name, updated_at, stargazers_count, watchers }
    }) ?? [];
}

const repositoryPage = (() => {
    let currentPage = 0
    return (init) => {
        currentPage = init ?? currentPage;
        return currentPage
    }
})()

const beforeSearched = (() => {
    const beforeSearchedInfo = { name: '', page: 0 };
    return ({ name, page }) => {
        const isSameInfo = beforeSearchedInfo.name === name && beforeSearchedInfo.page === page;
        beforeSearchedInfo.name = name;
        beforeSearchedInfo.page = page;
        return isSameInfo
    }
})()