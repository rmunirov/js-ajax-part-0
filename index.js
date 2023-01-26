import { loadAnimeList, loadAnimeDetails } from '/api';
import { debounce, clearHTMLContainer } from '/utils';
import {
    historyIsEmpty,
    getHistoryItemsCount,
    getFromHistory,
    findInHistory,
    saveToHistory,
    historyIncludesId,
    initHistory,
} from '/history';

const request = document.getElementById('request');
const searchResult = document.getElementById('searchResult');
const searchContent = document.getElementById('searchContent');
const history = document.getElementById('history');
const error = document.getElementById('error');

(async () => {
    // init history
    try {
        initHistory(createHistoryLinks);
    } catch (e) {
        error.innerHTML = e.message;
    }

    // show history if not empty
    if (!historyIsEmpty()) {
        createHistoryLinks();
    } else {
        history.classList.add('history_hide');
    }

    function showRequestResult(items) {
        const MAX_COUNT_TO_SHOW = 10;
        if (!Array.isArray(items)) {
            throw new TypeError('is not array');
        }
        if (items.length === 0) {
            return;
        }
        clearHTMLContainer(searchResult);
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
        clearHTMLContainer(searchContent);
        searchContent.appendChild(createDetailsNode(details));
        return details;
    }

    function createHistoryLinks() {
        const historyCount = getHistoryItemsCount();
        if (historyCount === 0) {
            return;
        }
        const MAX_HISTORY_LIKNS_TO_SHOW = 3;
        try {
            history.classList.remove('history_hide');
            clearHTMLContainer(history);
            const title = document.createElement('h2');
            title.classList.add('heading', 'heading_level-2');
            title.textContent = 'Recent results:';
            history.appendChild(title);
            for (let i = 0; i < MAX_HISTORY_LIKNS_TO_SHOW; i++) {
                if (i >= historyCount) {
                    break;
                }
                const data = getFromHistory(i);
                if (!data) {
                    break;
                }
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
            error.innerHTML = e.message;
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
            request.value = data.animeTitle;
            handleActiveId(id);
            clearHTMLContainer(searchResult);
            searchResult.classList.remove('search-line__result_shown');
        });

        return item;
    }

    async function handleActiveId(id) {
        try {
            const details = await showDetails(id);
            // save to storage
            saveToHistory(id, details.animeTitle);
            // update the history links
            createHistoryLinks();
        } catch (e) {
            error.innerHTML = 'Cant show details, please update the page';
        }
    }

    async function handleRequestInput(event) {
        const MIN_QUERY_LENGTH = 2;
        const MAX_HISTORY_ITEMS = 5;
        const value = event.target.value;
        if (value.length < MIN_QUERY_LENGTH) {
            return;
        }
        try {
            const data = await loadAnimeList(value);
            // get items from storage
            const historyInStorage = findInHistory(value)
                .map((item) => ({ ...item, isHistory: true }))
                .slice(0, MAX_HISTORY_ITEMS);
            const itemsToShow = historyInStorage.concat(
                data.filter((item) => !historyIncludesId(item.animeId)).map((item) => ({ ...item, isHistory: false }))
            );
            showRequestResult(itemsToShow);
        } catch (e) {
            error.innerHTML = 'Cant show results, please update the page';
        }
    }

    function handleRequestFocus(event) {
        try {
            const value = event.target.value;
            if (value === '') {
                const historyInStorage = findInHistory(value).map((item) => ({ ...item, isHistory: true }));
                showRequestResult(historyInStorage);
            }
        } catch (e) {
            error.innerHTML = 'Cant show results, please update the page';
        }
    }

    function handleDocumentClick(event) {
        if (event.target === request) {
            return;
        }
        clearHTMLContainer(searchResult);
        searchResult.classList.remove('search-line__result_shown');
    }

    const debouncedHandleInput = debounce(handleRequestInput, 500);

    request.addEventListener('input', debouncedHandleInput);

    request.addEventListener('focus', handleRequestFocus);

    document.addEventListener('click', handleDocumentClick);
})();
