import { makeEvent, modifyCss, scrollEndCheck } from "./js/common.js";
import { refreshAndRenderRepositories, renderRepositories } from "./js/searchRepositories.js";
import { refreshAndRenderUserList, renderUserList } from './js/searchUserList.js'

const app = function () {
    const $searchInput = document.querySelector('#userInput');
    const $userListDiv = document.querySelector('#userList');
    const $repositoryModal = document.querySelector('#reposit__List_wrap');
    const $repositoriesDiv = document.querySelector('#reposit__List_modal');

    const initialApp = () => {
        startAnimateBackground();
        bindEvent();
    }

    const bindEvent = () => {
        makeEvent($searchInput)('input')(searchUserEvent);
        makeEvent($userListDiv)('scroll')(userListScrollEvent);
        makeEvent($userListDiv)('click')(userNameClickEvent);
        makeEvent($repositoryModal)('click')(backgroundClickEvent);
        makeEvent($repositoriesDiv)('click')((e) => { e.stopPropagation() });
        makeEvent($repositoriesDiv)('scroll')(repositoryScrollEvent);
    }

    const searchUserEvent = event => {
        const { target: { value: key } } = event;
        refreshAndRenderUserList({ $target: $userListDiv, key })
    }

    const userListScrollEvent = event => {
        if (scrollEndCheck(event)) {
            const key = $searchInput.value;
            renderUserList({ $target: $userListDiv, key });
        }
    }

    const userNameClickEvent = async event => {
        const { target: { innerText: name } } = event
        if (event.target.classList.contains('user__list_item')) {
            await refreshAndRenderRepositories({ name, $target: $repositoriesDiv })
            showModal()
            setClickedUserName(name);
        }
    }

    const repositoryScrollEvent = event => {
        if (scrollEndCheck(event)) {
            const name = $repositoryModal.getAttribute('name');
            renderRepositories(name, $repositoriesDiv)
        }
    }

    const backgroundClickEvent = () => hideModal()

    const showModal = () => modifyCss($repositoryModal)('display')('block')

    const hideModal = () => modifyCss($repositoryModal)('display')('none')

    const setClickedUserName = name => $repositoryModal.setAttribute('name', name)

    const startAnimateBackground = () => {
        document.querySelector('.background-image').animate([
            { transform: 'translate(-20vw, -20vh)' }
        ], {
            duration: 30000,
            iterations: Infinity,
            direction: 'alternate'
        })
    }

    initialApp();
}

app();