async function getData(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
    });
    return response.json();
}

export async function loadAnimeList(name) {
    const response = await getData(`https://gogoanime.consumet.org/search?keyw=${name}`);
    if (response && response.length === 0) {
        throw Error('request is wrong');
    }
    return response;
}

export async function loadAnimeDetails(id) {
    const response = await getData(`https://gogoanime.consumet.org/anime-details/${id}`);
    if (response && response.error) {
        throw new Error(response.error.message);
    }
    return response;
}
