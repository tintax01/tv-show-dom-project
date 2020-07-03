//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const getTVshow = document.getElementById("TvSh");

function setup() {
	makePageForEpisodes(allEpisodes);
}
// makePage function to use DOM to manipulate both html/CSS and access the js file
function makePageForEpisodes(episodeList) {
	document.getElementById("number-of-episodes").innerText = `Got ${episodeList.length} episode(s)`;

	const rootElem = document.getElementById("root");
	getAllEpisodes().forEach((episode) => {
		const section = document.createElement("section");
		const header = document.createElement("h2");
		const imga = document.createElement("img");
		const div = document.createElement("div");

		imga.src = episode.image.medium;
		imga.width = "200";
		imga.height = "200";
		header.innerText =
			`${episode.name} - ${episodeNumber(episode.season, episode.number)}`;
		div.innerHTML = episode.summary;
		section.appendChild(header);
		section.appendChild(imga);
		section.appendChild(div);
		rootElem.appendChild(section);

		section.classList.add("tv-episode-card"); // CSS and js DOM elements.
	});
}

// Season Numbers and Episodes
function episodeNumber(season, episode) {
	if (season.toString().length < 2) {
		season = "0" + season;
	}
	if (episode.toString().length < 2) {
		episode = "0" + episode;
	}
	return `S${season}E${episode}`;
}

// getTVshow.addEventListener;
//This function select all the episodes and disiplays the episode for the user
function selectAllEpisodes(episodeList) {
	getTVshow.innerHTML = `<option>Select from list</option>`;
	episodeList.forEach(
		(listObj) =>
			(getTVshow.innerHTML += `<option value = "${listObj.id}">${listObj.name}</option>`)
	);
	//This listener get a user  to change episodes dynamic upon selection from a dropdown list
	getTVshow.addEventListener("change", (e) => {
		let getSelect = e.target.value;
		getId(getSelect);
	});
}

function getId(showDynamic) {
	fetch(`https://api.tvmaze.com/shows/82/episodes/${showDynamic}/episodes`)
		.then((response) => response.json())
		.then((dataJson) => {
			makePageForEpisodes(dataJson);
			search(dataJson);
			makePageForEpisodes(dataJson);
		});
}
window.onload = setup;
