export class Detail {
    displayGameDetails(id) {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": "e4668d9ee2msh8fd262fa6046cddp164bddjsne55374040288",
                "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
            },
        };

        // Show loader before fetching data
        document.getElementById("loader").classList.remove("d-none");

        fetch(url, options)
            .then(response => response.json())
            .then(gameData => {

                $("#GameDetails").removeClass("d-none");
                $("#mainSec").addClass("d-none");

                let detailHtml = `
                  <div class="row gy-3">
                      <div class="col-md-6 wow slideInLeft" data-wow-duration="1s">
                          <div class="inner2 p-3">
                              <div class="image2">
                                  <img src="${gameData.thumbnail}" class="w-100 rounded-2" alt="" />
                              </div>
                              <div class="screenshots d-flex justify-content-evenly mb-4">
                                  ${gameData.screenshots.map(screenshot => `
                                      <div class="image3">
                                          <img src="${screenshot.image}" class="w-100 rounded-2" alt="" />
                                      </div>`).join('')}
                              </div>
                              <div class="req px-2 pt-3">
                                  <h3 class="text-white">Minimum Requirements :</h3>
                                  ${this.createRequirementItem("graphics", gameData.minimum_system_requirements.graphics)}
                                  ${this.createRequirementItem("processor", gameData.minimum_system_requirements.processor)}
                                  ${this.createRequirementItem("os", gameData.minimum_system_requirements.os)}
                                  ${this.createRequirementItem("storage", gameData.minimum_system_requirements.storage)}
                                  ${this.createRequirementItem("memory", gameData.minimum_system_requirements.memory)}
                              </div>
                          </div>
                      </div>
                      <div class="col-md-6 wow slideInRight" data-wow-duration="1s">
                          <div class="inner2 p-3">
                              <div class="d-flex text-white mb-4">
                                  <h1>${gameData.title}</h1>
                              </div>
                              <div class="d-flex mb-4">
                                  <div>
                                      <p class="text-white det">Category : <span class="badge badge-color">${gameData.genre}</span></p>
                                      <p class="text-white det">Publisher : <span class="badge badge-color">${gameData.publisher}</span></p>
                                      <p class="text-white det">Developer : <span class="badge badge-color">${gameData.developer}</span></p>
                                  </div>
                                  <div class="ps-4">
                                      <p class="text-white det">Platform : <span class="badge badge-color">${gameData.platform}</span></p>
                                      <p class="text-white det">Status : <span class="badge badge-color">${gameData.status}</span></p>
                                      <p class="text-white det">Release Date : <span class="badge badge-color">${gameData.release_date}</span></p>
                                  </div>
                              </div>
                              <p class="text-white description">${gameData.description}</p>
                              <a href="${gameData.game_url}" class="playGame"> Play Free
                                  <svg viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" fill-rule="evenodd"></path>
                                  </svg>
                              </a>
                          </div>
                      </div>
                  </div>
                  `;
                document.getElementById("Details").innerHTML = detailHtml;

                // Hide loader after details are displayed
                document.getElementById("loader").classList.add("d-none");

                $("#bClose").on("click", function () {
                    $("#GameDetails").addClass("d-none");
                    $("#mainSec").removeClass("d-none");
                });

                $(".image3 img").on("click", function () {
                    let sr = this.getAttribute("src");
                    let msrc = $(".image2 img").attr("src");

                    let temp = sr;
                    sr = msrc;
                    msrc = temp;
                    this.setAttribute("src", sr);
                    $(".image2 img").attr("src", msrc);
                    $(".screenshots").addClass("justify-content-evenly");
                });
            })
            .catch(error => {
                console.error(error);
                document.getElementById("Details").innerHTML = `<h1 class="text-white text-center">Not available data</h1>`;
                document.getElementById("loader").classList.add("d-none");
            });
    }

    createRequirementItem(name, value) {
        return `<div class="${name} py-3 det d-flex align-items-center">
          <i class="fa-solid fa-tv text-white pe-2"></i>
          <p class="text-white m-0">${name}:</p>
          <span class="text-white m-0 ps-2">${value}</span>
      </div>`;
    }
}
