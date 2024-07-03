import { Ui } from "./ui.js";

let ui = new Ui();

export class Games {
    constructor() {
        ui.displayGamesCategory("MMORPG");
        this.changeAct();
    }

    changeAct() {
        $(".nav-link").on("click", function () {
            $(".lodeing").css({ display: "flex" });
            $(".con").css({ display: "block" });

            $(".con").fadeOut(400, function () {
                $(".lodeing").fadeOut(400);
            });

            let Categ = this.innerHTML;
            ui.displayGamesCategory(Categ);

            $(".nav-link").removeClass("active");
            $(this).addClass("active");
        });
    }
}
