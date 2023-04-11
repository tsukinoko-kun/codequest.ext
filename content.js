const origin = "https://codequest.frank-mayer.io";
const marker = "codequest";

async function main() {
    const anchors = Array.from(document.body.querySelectorAll("a[href]"));

    for (const aEl of anchors) {
        try {
            const link = new URL(aEl.href.split("?")[0]);
            if (link.origin !== origin) {
                continue;
            }

            const [hash, lang, ext] = link.pathname.split("/").pop().split(".");

            if (!hash || !lang || !ext) {
                continue;
            }

            if (aEl.getAttribute(marker) === "true") {
                continue;
            }

            aEl.setAttribute(marker, "true");

            const imgEl = document.createElement("img");
            imgEl.src = origin + "/api/" + `${hash}.${lang}.svg`;
            imgEl.style = [
                "height:auto",
                "width:100%",
                "display:block",
                "position:relative",
            ].join(";");
            aEl.innerHTML = "";
            aEl.appendChild(imgEl);
        } catch (err) {
            console.debug("CodeQuest", err);
        }
    }
}

setInterval(main, 1000);
