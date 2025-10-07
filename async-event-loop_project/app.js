const app = document.getElementById('app');
let filmsCache = []; 

async function fetchFilms() {
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
    filmsCache = data.results; 
    return filmsCache;
}

function renderHomePage() {
    app.innerHTML = '<h1>Star Wars Episodes</h1>';
    const list = document.createElement('ul');

    filmsCache.forEach(film => { 
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#film/${film.episode_id}`;
        link.textContent = `${film.episode_id}: ${film.title}`;
        link.onclick = (e) => {
            e.preventDefault();
            history.pushState(null, '', link.href);
            renderFilmPage(film.episode_id);
        };
        listItem.appendChild(link);
        list.appendChild(listItem);
    });

    app.appendChild(list);
}

async function renderFilmPage(episodeId) {
    const filmModule = await import('./film.js');
    filmModule.renderFilm(episodeId, renderHomePage);
}

window.addEventListener('popstate', () => {
    const hash = window.location.hash;
    if (hash.startsWith('#film/')) {
        const episodeId = hash.split('/')[1];
        renderFilmPage(episodeId);
    } else {
        init();
    }
});

async function init() {
    await fetchFilms(); 
    renderHomePage();
}

init();
