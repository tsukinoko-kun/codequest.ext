import { marker } from "./static";

const codequestOrigin = "https://codequest.frank-mayer.io";

export function imgFromUrl() {
    const anchors: Array<HTMLAnchorElement> = Array.from(
        document.body.querySelectorAll("a[href]"),
    );

    for (const aEl of anchors) {
        try {
            const link = new URL(aEl.href.split("?")[0]);
            if (link.origin !== codequestOrigin) {
                continue;
            }

            const [hash, lang, ext] =
                link.pathname.split("/").pop()?.split(".") ?? [];

            if (!hash || !lang || !ext) {
                continue;
            }

            if (aEl.hasAttribute(marker)) {
                continue;
            }

            const url = new URL(
                "/api/" + `${hash}.${lang}.svg`,
                codequestOrigin,
            );

            aEl.setAttribute(marker, "true");

            const imgEl = document.createElement("img");
            imgEl.src = url.href;
            imgEl.style.height = "auto";
            imgEl.style.width = "100%";
            imgEl.style.display = "block";
            imgEl.style.position = "relative";
            aEl.innerHTML = "";
            aEl.appendChild(imgEl);
        } catch (err) {
            console.debug("CodeQuest", err);
        }
    }
}
