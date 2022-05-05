import API from "../API/api.js";

export const refreshAndRenderUserList = async ({ $target, key }) => {
    initUserList($target);
    appendUserDivtoTarget({ userList: await getUserDataFromAPI({ key, page: 1 }), $target })
}

export const renderUserList = async ({ $target, key }) => {
    const page = searchedUserPage();
    if (beforeSearched({ key, page })) return;
    appendUserDivtoTarget({ userList: await getUserDataFromAPI({ key, page }), $target })
}

const appendUserDivtoTarget = ({ userList, $target }) => {
    userList?.forEach(userName => {
        $target.append(createUserNameDiv(userName))
    })
    if (userList.length !== 0) searchedUserPage(searchedUserPage() + 1);
}

const createUserNameDiv = (userName) => {
    const $userNameDiv = document.createElement('div')
    $userNameDiv.classList.add('user__list_item')
    $userNameDiv.innerHTML = userName;
    return $userNameDiv;
}

const initUserList = ($target) => {
    $target.innerHTML = '';
    searchedUserPage(0);
}

const getUserDataFromAPI = (() => {
    const cashData = [];
    return async ({ key, page }) => {
        const findMatchDataFunction = data => data.key === key && data.page === page;
        const isSearchedBefore = cashData.some(findMatchDataFunction)
        const resData = isSearchedBefore ? cashData.find(findMatchDataFunction).data : await getUserList({ key, page })
        if (!isSearchedBefore) cashData.push({ key, page, data: resData })
        return resData
    }
})()

const getUserList = async ({ key, page }) => {
    if (key === '') return;
    const res = await API.searchUserByKey(key, page)
    const { items } = res;
    return items?.map(data => data.login) ?? [];
}

const searchedUserPage = (() => {
    let currentPage = 0
    return (init) => {
        currentPage = init ?? currentPage;
        return currentPage
    }
})()

const beforeSearched = (() => {
    const beforeSearchedInfo = { key: '', page: 0 };
    return ({ key, page }) => {
        const isSameInfo = beforeSearchedInfo.key === key && beforeSearchedInfo.page === page;
        beforeSearchedInfo.key = key;
        beforeSearchedInfo.page = page;
        return isSameInfo
    }
})()