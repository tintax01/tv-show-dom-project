//You can edit ALL of the code here
function setup() {
	const allEpisodes = getAllEpisodes();
	makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
	const rootElem = document.getElementById("root");
	rootElem.textContent = `Got ${episodeList.length} episode(s)`;
	getAllEpisodes().forEach((episode) => {
		const section = document.createElement("section");
		const header = document.createElement("h2");
		const imga = document.createElement("img");
		const div = document.createElement("div");
		const season = document.createElement("season");
		const number = document.createElement("number");
		imga.src = episode.image.medium;
		imga.width = "200";
		imga.height = "100";
		header.innerText = episode.name;
		div.innerHTML = episode.summary;
		// link between my css and js. dom line22.
		section.classList.add("container");
		section.appendChild(number);
		section.appendChild(header);
		section.appendChild(season);
		section.appendChild(imga);
		section.appendChild(div);
		rootElem.appendChild(section);
	});
}

window.onload = setup;
