export async function renderFilm(episodeId, renderHomePage) {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const response = await fetch(`https://swapi.dev/api/films/${episodeId}`);
    const film = await response.json();

    const h1 = document.createElement('h1');
    h1.textContent = `${film.title} (Episode ID: ${film.episode_id})`;
    app.appendChild(h1);

    const backButton = document.createElement('a');
    backButton.href = '#';
    backButton.textContent = 'Back to episodes';
    backButton.onclick = (e) => {
        e.preventDefault();
        history.pushState(null, '', backButton.href);
        renderHomePage();
    };
    app.appendChild(backButton);

    const openingCrawl = document.createElement('p');
    openingCrawl.textContent = film.opening_crawl;
    app.appendChild(openingCrawl);

    await renderPlanets(film.planets);
    await renderSpecies(film.species);
}

async function renderPlanets(planets) {
    const h2 = document.createElement('h2');
    h2.textContent = 'Planets';
    app.appendChild(h2);

    const planetPromises = planets.map(url => fetch(url).then(res => res.json()));
    const planetData = await Promise.all(planetPromises);

    const planetList = document.createElement('ul');
    planetData.forEach(planet => {
        const listItem = document.createElement('li');
        listItem.textContent = planet.name;
        planetList.appendChild(listItem);
    });
    app.appendChild(planetList);
}

async function renderSpecies(species) {
    const h2 = document.createElement('h2');
    h2.textContent = 'Species';
    app.appendChild(h2);

    const speciesPromises = species.map(url => fetch(url).then(res => res.json()));
    const speciesData = await Promise.all(speciesPromises);

    const speciesList = document.createElement('ul');
    speciesData.forEach(species => {
        const listItem = document.createElement('li');
        listItem.textContent = species.name;
        speciesList.appendChild(listItem);
    });
    app.appendChild(speciesList);
}

