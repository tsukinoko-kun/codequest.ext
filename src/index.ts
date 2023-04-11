import { imgFromUrl } from "./imgFromUrl";
import { markdownSnippet } from "./markdownSnippet";

function main() {
    imgFromUrl();
    markdownSnippet();
}

setInterval(main, 1000);
