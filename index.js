if ("serviceWorker" in navigator) {
  //navigator.serviceWorker.register('./worker.js');
}

let players = [
  {
    id: "red",
    color: "bg-red-400",
    name: "red",
    score: 0,
  },
  {
    id: "blue",
    color: "bg-blue-400",
    name: "blue",
    score: 0,
  },
  {
    id: "amber",
    color: "bg-amber-300",
    name: "amber",
    score: 0,
  },
  {
    id: "green",
    color: "bg-green-500",
    name: "green",
    score: 0,
  },
  {
    id: "pink",
    color: "bg-pink-400",
    name: "pink",
    score: 0,
  },
  {
    id: "gray",
    color: "bg-gray-100",
    name: "gray",
    score: 0,
  },
  {
    id: "slate",
    color: "bg-slate-600",
    name: "slate",
    score: 0,
  },
];

window.addEventListener("DOMContentLoaded", (event) => {
  try {
    const _playersString = localStorage.getItem("scoring_players");
    if (!_playersString) {
      throw new Error("no storage");
    }
    const _players = JSON.parse(localStorage.getItem("scoring_players"));

    players = _players;
  } catch {
    setStorage();
  }

  renderPlayerList();
});

function renderPlayerList() {
  const playerList = document.querySelector("#player-list");

  const playerListInnerHtml = players
    .map((player) => {
      return `<div class="flex items-center ${player.color} touch-manipulation	select-none">
        <input
          id="input_${player.id}"
          class="w-full bg-transparent text-xl font-bold text-stroke outline-none px-2"
          type="text"
          value="${player.name}"
          onchange="setName('${player.id}', event.target.value)"
        />
        <span
          class="bg-black/20 w-20 min-w-[5rem] h-16 flex items-center justify-center touch-manipulation"
          >${player.score}</span
        >
        <button class="bg-black/30 hover:bg-black/10 w-16 h-16 aspect-square touch-manipulation" onclick="setScore('${player.id}', 1)" >+</button>
        <button class="bg-black/40 hover:bg-black/20 w-16 h-16 aspect-square touch-manipulation" onclick="setScore('${player.id}', -1)">-</button>
      </div>`;
    })
    .join("");

  playerList.innerHTML = playerListInnerHtml;
}

function setName(id, name) {
  console.log(name);
  const player = players.find((player) => player.id === id);
  player.name = name;

  setStorage();

  renderPlayerList();
}

function setScore(id, step) {
  const player = players.find((player) => player.id === id);
  player.score += step;

  setStorage();

  renderPlayerList();
}

function reset() {
  players.forEach((player) => {
    player.score = 0;
  });

  setStorage();

  renderPlayerList();
}

function order() {
  players.sort((playerA, playerB) => playerB.score - playerA.score)

  setStorage();

  renderPlayerList();
}

function setStorage() {
  localStorage.setItem("scoring_players", JSON.stringify(players));
}
