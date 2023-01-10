const HISTORY_CURSOR_KEY = 'history_cursor';
const HISTORY_MAX_LENGTH_KEY = 'history_max';
const HISTORY_COUNT_KEY = 'history_count';
const HISTORY_MAX_LENGTH = 100;

function safeLocalStorageSet(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        throw new Error('History error, please update the page');
    }
}

export function initHistory(callback) {
    if (!localStorage.getItem(HISTORY_CURSOR_KEY)) {
        safeLocalStorageSet(HISTORY_CURSOR_KEY, 0);
    }
    if (!localStorage.getItem(HISTORY_MAX_LENGTH_KEY)) {
        safeLocalStorageSet(HISTORY_MAX_LENGTH_KEY, HISTORY_MAX_LENGTH);
    }
    if (!localStorage.getItem(HISTORY_COUNT_KEY)) {
        safeLocalStorageSet(HISTORY_COUNT_KEY, 0);
    }

    // listen to an event onstorage
    window.addEventListener('storage', () => {
        callback();
    });
}

export function findInHistory(str) {
    const result = [];
    if (historyIsEmpty()) {
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
        throw new Error('History error, please update the page');
    }

    return result;
}

export function historyIncludesId(id) {
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key !== HISTORY_CURSOR_KEY && key !== HISTORY_COUNT_KEY && key !== HISTORY_MAX_LENGTH_KEY) {
                const value = JSON.parse(localStorage.getItem(key));
                if (value.animeId === id) {
                    return true;
                }
            }
        }
        return false;
    } catch (error) {
        throw new Error('History error, please update the page');
    }
}

export function saveToHistory(id, title) {
    let cursor = Number(localStorage.getItem(HISTORY_CURSOR_KEY));
    let count = Number(localStorage.getItem(HISTORY_COUNT_KEY));
    const max = Number(localStorage.getItem(HISTORY_MAX_LENGTH_KEY));

    if (!cursor || !count || !max) {
        throw new Error('History error, please update the page');
    }

    // find same animeId
    if (historyIncludesId(id)) {
        return;
    }
    // save if not find
    safeLocalStorageSet(
        cursor,
        JSON.stringify({
            animeId: id,
            animeTitle: title,
        })
    );
    cursor = (cursor + 1) % max;
    if (count < max) {
        count += 1;
        safeLocalStorageSet(HISTORY_COUNT_KEY, count);
    }
    safeLocalStorageSet(HISTORY_CURSOR_KEY, cursor);
}

export function getFromHistory(index) {
    try {
        const count = Number(localStorage.getItem(HISTORY_COUNT_KEY));
        if (count && index >= count) {
            throw new RangeError('Passed index very big');
        }
        const cursor = Number(localStorage.getItem(HISTORY_CURSOR_KEY));
        const max = Number(localStorage.getItem(HISTORY_MAX_LENGTH_KEY));
        if (!cursor || !max) {
            throw new Error('History error, please update the page');
        }
        let itemIndex = cursor - 1 - index;
        if (itemIndex < 0) {
            itemIndex += max;
        }
        return JSON.parse(localStorage.getItem(itemIndex));
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error('History error, please update the page');
        }
        throw error;
    }
}

export function getHistoryItemsCount() {
    return Number(localStorage.getItem(HISTORY_COUNT_KEY));
}

export function historyIsEmpty() {
    return localStorage.length <= 3;
}
