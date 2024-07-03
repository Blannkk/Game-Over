import { Games } from "./games.js";

let games = new Games();

$(document).ready(function () {
    console.log("Document ready.");
    $(".con").fadeOut(900, function () {
        $(".lodeing").fadeOut(900);
        console.log("Loading animations complete.");
    });

    $(".nav-link").on("click", function () {
        console.log("Nav link clicked.");
        games.changeAct();
    });
});
