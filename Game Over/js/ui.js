import { Detail } from "./details.js";

let detail = new Detail();

export class Ui {
  displayGames(data) {
    let games = "";
    data.forEach(game => {
      let gameHtml = `
                <div class="col-lg-3 col-md-4 g-3">
                    <div class="card p-2" data-game-id="${game.id}">
                        <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}" />
                        <div class="card-body p-2">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">${game.title}</h5>
                                <h5><span class="badge text-bg-primary">Free</span></h5>
                            </div>
                            <p class="card-text text-center small opacity-50 text-white">${game.short_description}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between p-2">
                            <span class="badge text-bg-secondary p-1">${game.genre}</span>
                            <span class="badge text-bg-secondary p-1">${game.platform}</span>
                        </div>
                    </div>
                </div>`;
      games += gameHtml;
    });
    document.getElementById("games").innerHTML = games;

    // Add click event listener to each game card
    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", function () {
        const gameId = this.getAttribute("data-game-id");
        detail.displayGameDetails(gameId);
      });
    });

    // Hide loader after games are displayed
    document.getElementById("loader").classList.add("d-none");
  }

  async displayGamesCategory(category) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'e4668d9ee2msh8fd262fa6046cddp164bddjsne55374040288',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    // Show loader before fetching data
    document.getElementById("loader").classList.remove("d-none");

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      this.displayGames(result);
    } catch (error) {
      console.error(error);
      document.getElementById("loader").classList.add("d-none");
    }
  }
}
