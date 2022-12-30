import { loadAnimeList, loadAnimeDetails } from '/api.js';

const HISTORY_CURSOR_KEY = 'history_cursor';
const HISTORY_MAX_LENGTH_KEY = 'history_max';
const HISTORY_COUNT_KEY = 'history_count';
const HISTORY_MAX_LENGTH = 100;

const request = document.getElementById('request');
const searchResult = document.getElementById('searchResult');
const searchContent = document.getElementById('searchContent');
const history = document.getElementById('history');
const error = document.getElementById('error');

(async () => {
    // show history if not empty
    if (localStorage.length > 3) {
        createHistoryLinks();
    } else {
        history.classList.add('history_hide');
    }

    // save history parameters if not
    if (!localStorage.getItem(HISTORY_CURSOR_KEY)) {
        localStorage.setItem(HISTORY_CURSOR_KEY, 0);
    }
    if (!localStorage.getItem(HISTORY_MAX_LENGTH_KEY)) {
        localStorage.setItem(HISTORY_MAX_LENGTH_KEY, HISTORY_MAX_LENGTH);
    }
    if (!localStorage.getItem(HISTORY_COUNT_KEY)) {
        localStorage.setItem(HISTORY_COUNT_KEY, 0);
    }

    // listen to an event onstorage
    window.addEventListener('storage', () => {
        createHistoryLinks();
    });

    function clearContainer(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    function findInStorage(str) {
        const result = [];
        if (localStorage.length <= 3) {
            return [];
        }
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key !== HISTORY_CURSOR_KEY && key !== HISTORY_COUNT_KEY && key !== HISTORY_MAX_LENGTH_KEY) {
                    const value = JSON.parse(localStorage.getItem(key));
                    const regex = new RegExp(str.toLowerCase());
                    if (regex.test(value.animeTitle.toLowerCase())) {
                        result.push(value);
                    }
                }
            }
        } catch (e) {
            error.innerHTML = 'History error, please update the page';
        }

        return result;
    }

    function storageIncludesId(id) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key !== HISTORY_CURSOR_KEY && key !== HISTORY_COUNT_KEY && key !== HISTORY_MAX_LENGTH_KEY) {
                const value = JSON.parse(localStorage.getItem(key));
                if (value.animeId === id) {
                    return true;
                }
            }
        }
        return false;
    }

    function saveToStorage(id, title) {
        let cursor = Number(localStorage.getItem(HISTORY_CURSOR_KEY));
        let count = Number(localStorage.getItem(HISTORY_COUNT_KEY));
        const max = Number(localStorage.getItem(HISTORY_MAX_LENGTH_KEY));
        // find same animeId
        if (storageIncludesId(id)) {
            return;
        }
        // save if not find
        try {
            localStorage.setItem(
                cursor,
                JSON.stringify({
                    animeId: id,
                    animeTitle: title,
                })
            );
            cursor = (cursor + 1) % max;
            if (count < max) {
                count += 1;
                localStorage.setItem(HISTORY_COUNT_KEY, count);
            }
            localStorage.setItem(HISTORY_CURSOR_KEY, cursor);
        } catch (e) {
            error.innerHTML = 'History error, please update the page';
        }
    }

    function getItemFromStorage(index) {
        const count = Number(localStorage.getItem(HISTORY_COUNT_KEY));
        if (count && index >= count) {
            throw new RangeError('index very big');
        }
        const cursor = Number(localStorage.getItem(HISTORY_CURSOR_KEY));
        const max = Number(localStorage.getItem(HISTORY_MAX_LENGTH_KEY));
        let itemIndex = cursor - 1 - index;
        if (itemIndex < 0) {
            itemIndex += max;
        }
        return JSON.parse(localStorage.getItem(itemIndex));
    }

    function getStorageItemCount() {
        return Number(localStorage.getItem(HISTORY_COUNT_KEY));
    }

    function showRequestResult(items) {
        const MAX_COUNT_TO_SHOW = 10;
        if (!Array.isArray(items)) {
            throw new TypeError('is not array');
        }
        if (items.length === 0) {
            return;
        }
        clearContainer(searchResult);
        for (let i = 0; i < items.length; i++) {
            if (i >= MAX_COUNT_TO_SHOW) {
                break;
            }
            const node = createSearchResultItemNode(items[i]);
            searchResult.appendChild(node);
        }
        searchResult.classList.add('search-line__result_shown');
    }

    async function showDetails(id) {
        const details = await loadAnimeDetails(id);
        clearContainer(searchContent);
        searchContent.appendChild(createDetailsNode(details));
        return details;
    }

    function createHistoryLinks() {
        const historyCount = getStorageItemCount();
        if (historyCount === 0) {
            return;
        }
        const MAX_HISTORY_LIKNS_TO_SHOW = 3;
        try {
            history.classList.remove('history_hide');
            clearContainer(history);
            const title = document.createElement('h2');
            title.classList.add('heading', 'heading_level-2');
            title.textContent = 'Recent results:';
            history.appendChild(title);
            for (let i = 0; i < MAX_HISTORY_LIKNS_TO_SHOW; i++) {
                if (i >= historyCount) {
                    break;
                }
                const data = getItemFromStorage(i);
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = data.animeTitle;
                link.onclick = async (event) => {
                    event.preventDefault();
                    request.value = '';
                    await showDetails(data.animeId);
                };
                history.appendChild(link);
            }
        } catch (e) {
            error.innerHTML = 'History error, please update the page';
        }
    }

    function createDetailsNode(details) {
        // create root node
        const container = document.createElement('div');
        container.classList.add('details');
        // create title
        const title = document.createElement('h2');
        title.classList.add('heading', 'heading_level-2');
        title.innerHTML = details.animeTitle;
        container.appendChild(title);
        // create image container with image
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('details__image-container');
        const image = document.createElement('img');
        image.src = details.animeImg;
        image.alt = 'anime image';
        imageContainer.appendChild(image);
        container.appendChild(imageContainer);
        // create info container with info
        const info = document.createElement('div');
        info.classList.add('details__info');
        info.innerHTML = `<p><strong>Genres: </strong>${details.genres.join(', ')}</p>`;
        info.innerHTML += `<p><strong>Release date: </strong>${details.releasedDate}</p>`;
        info.innerHTML += `<p><strong>Total episodes: </strong>${details.totalEpisodes}</p>`;
        info.innerHTML += `<p><strong>Synopsis: </strong>${details.synopsis}</p>`;
        container.appendChild(info);

        return container;
    }

    function createSearchResultItemNode(data) {
        const item = document.createElement('div');
        item.classList.add('search-line__result-item');
        if (data.isHistory) {
            item.classList.add('search-line__result-item_history');
        }
        item.innerHTML = data.animeTitle;
        const value = document.createElement('input');
        value.type = 'hidden';
        value.value = data.animeId;
        item.appendChild(value);
        item.addEventListener('click', () => {
            const id = item.getElementsByTagName('input')[0].value;
            request.value = id;
            handleActiveId(id);
            clearContainer(searchResult);
            searchResult.classList.remove('search-line__result_shown');
        });

        return item;
    }

    async function handleActiveId(id) {
        try {
            const details = await showDetails(id);
            // save to storage
            saveToStorage(id, details.animeTitle);
            // update the history links
            createHistoryLinks();
        } catch (e) {
            error.innerHTML = 'Cant show details, please update the page';
        }
    }

    request.addEventListener('input', async (event) => {
        const MIN_QUERY_LENGTH = 2;
        const value = event.target.value;
        if (value.length < MIN_QUERY_LENGTH) {
            return;
        }
        try {
            const data = await loadAnimeList(value);
            // get items from storage
            const historyInStorage = findInStorage(value).map((item) => ({ ...item, isHistory: true }));
            const itemsToShow = historyInStorage.concat(
                data.filter((item) => !storageIncludesId(item.animeId)).map((item) => ({ ...item, isHistory: false }))
            );
            showRequestResult(itemsToShow);
        } catch (e) {
            error.innerHTML = 'Cant show results, please update the page';
        }
    });

    request.addEventListener('focus', (event) => {
        try {
            const value = event.target.value;
            if (value === '') {
                const historyInStorage = findInStorage(value).map((item) => ({ ...item, isHistory: true }));
                showRequestResult(historyInStorage);
            }
        } catch (e) {
            error.innerHTML = 'Cant show results, please update the page';
        }
    });

    document.addEventListener('click', (event) => {
        if (event.target === request) {
            return;
        }
        clearContainer(searchResult);
        searchResult.classList.remove('search-line__result_shown');
    });
})();
