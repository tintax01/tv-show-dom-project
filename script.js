//You can edit ALL of the code here
function setup() {
	const allEpisodes = getAllEpisodes();
	makePageForEpisodes(allEpisodes);
}
// makePage function to use DOM to manipulate both html/CSS and access the js file
function makePageForEpisodes(episodeList) {
	const rootElem = document.getElementById("root");
	rootElem.textContent = `Got ${episodeList.length} episode(s)`;
	getAllEpisodes().forEach((episode) => {
		const section = document.createElement("section");
		const header = document.createElement("h2");
		const imga = document.createElement("img");
		const div = document.createElement("div");

		imga.src = episode.image.medium;
		imga.width = "200";
		imga.height = "200";
		header.innerText = episode.name;
		div.innerHTML = episode.summary;
		section.appendChild(header);
		section.appendChild(imga);
		section.appendChild(div);
		rootElem.appendChild(section);
		// link between my css and js DOM elements
		section.classList.add("grid-container");
	});
}

window.onload = setup;
