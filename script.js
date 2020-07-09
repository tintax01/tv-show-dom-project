//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const selectEpisodeDropdown = document.getElementById("selectEpisode");

function setup() {
	setEpisodeSearchBox();
	makePageForEpisodes(allEpisodes);
	selectAllEpisodes(allEpisodes);
}
// makePage function to use DOM to manipulate both html/CSS and access the js file
function makePageForEpisodes(episodeList) {
	displayEpisodeCount(episodeList);
	const rootElem = document.getElementById("root");

	// Clear episode container if there is anything already
	rootElem.innerHTML = "";

	episodeList.forEach((episode) => {
		const section = document.createElement("section");
		const header = document.createElement("h2");
		const imga = document.createElement("img");
		const div = document.createElement("div");

		imga.src = episode.image.medium;
		imga.width = "200";
		imga.height = "200";
		header.innerText = `${episode.name} - ${episodeNumber(
			episode.season,
			episode.number
		)}`;
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

function setEpisodeSearchBox() {
	const episodeSearchBox = document.getElementById("tv-episode-filter");
	episodeSearchBox.addEventListener("input", (event) => {
		// retrieve box value
		let inputValue = event.target.value;

		// filter displayed episode
		// The search should be case-insensitive
		//  1 - search in title
		//  2 - search in summary
		let filteredEpisodes = allEpisodes.filter((episode) => {
			let lowerCasedInput = inputValue.toLowerCase();
			let lowerCasedEpisodeName = episode.name.toLowerCase();
			let lowerCasedSummary = episode.summary.toLowerCase();

			return (
				lowerCasedEpisodeName.includes(lowerCasedInput) ||
				lowerCasedSummary.includes(lowerCasedInput)
			);
		});

		makePageForEpisodes(filteredEpisodes);
	});
}

function displayEpisodeCount(episodesList) {
	const episodeCount = `Displaying ${episodesList.length}/${allEpisodes.length} episode(s)`;
	document.getElementById("number-of-episodes").innerText = episodeCount;
}

// function to select all the episodes and disiplays the episode to see
function selectAllEpisodes(episodeList) {
	selectEpisodeDropdown.innerHTML = `<option>PickfromDropdownList</option>`;
	episodeList.forEach(
		(listObj) =>
			(selectEpisodeDropdown.innerHTML += `<option value = "${listObj.id}">${listObj.name}</option>`)
	);
	//The Eventlistener get the user  to change episodes when selected from the dropdownlist.
	selectEpisodeDropdown.addEventListener("change", (e) => {
		let getSelect = e.target.value;
		getId(getSelect);
	});
}

// the function select episode number & name.
function selectEpisodesDisplay(DisplayEpisodes) {
	let selectEpisodesToDisplay = document.createElement("H2Tag");

	header.innerText = cardHeader(episode);
	header.innerText = cardHeader(id);
	selectEpisodesToDisplay.innerHTML = `<option>Display All Episodes</option>`;
	DisplayEpisodes.forEach(
		(movie) =>
			(selectEpisodesToDisplay.innerHTML += `<option>${cardHeader(
				movie
			)}</option>`)
	);
	selectEpisodesToDisplay.addEventListener("click", () => {
		let objSelect = DisplayEpisodes.filter((movie) =>
			selectEpisodesToDisplay.value.indexOf(movie.name) != -1 ? true : false
		);
		makePageForEpisodes(objSelect);
	});
}

//This function check the cardHeader API
function cardHeader(episode) {
	let name = episode.name;
	let countSeason = episode.season;
	if (countSeason < 10) {
		countSeason = "0" + countSeason;
	}
	let countEpisode = episode.number;
	if (countEpisode < 10) {
		countEpisode = "0" + countEpisode;
	}
	return name + " - S" + countSeason + "E" + countEpisode;
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
