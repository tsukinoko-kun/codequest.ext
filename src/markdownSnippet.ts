import hljs from "highlight.js/lib/core";
import Csharp from "highlight.js/lib/languages/csharp";
import Java from "highlight.js/lib/languages/java";
import Javascript from "highlight.js/lib/languages/javascript";
import Json from "highlight.js/lib/languages/json";
import Kotlin from "highlight.js/lib/languages/kotlin";
import Php from "highlight.js/lib/languages/php";
import Python from "highlight.js/lib/languages/python";
import Typescript from "highlight.js/lib/languages/typescript";
import Rust from "highlight.js/lib/languages/rust";
import Swift from "highlight.js/lib/languages/swift";
import C from "highlight.js/lib/languages/c";
import Cpp from "highlight.js/lib/languages/cpp";
import Css from "highlight.js/lib/languages/css";
import Go from "highlight.js/lib/languages/go";
import { marker } from "./static";
import { extension } from "./extension";

hljs.registerLanguage("csharp", Csharp);
hljs.registerLanguage("cs", Csharp);
hljs.registerLanguage("java", Java);
hljs.registerLanguage("javascript", Javascript);
hljs.registerLanguage("js", Javascript);
hljs.registerLanguage("json", Json);
hljs.registerLanguage("kotlin", Kotlin);
hljs.registerLanguage("kt", Kotlin);
hljs.registerLanguage("php", Php);
hljs.registerLanguage("python", Python);
hljs.registerLanguage("py", Python);
hljs.registerLanguage("typescript", Typescript);
hljs.registerLanguage("ts", Typescript);
hljs.registerLanguage("rust", Rust);
hljs.registerLanguage("rs", Rust);
hljs.registerLanguage("swift", Swift);
hljs.registerLanguage("c", C);
hljs.registerLanguage("cpp", Cpp);
hljs.registerLanguage("css", Css);
hljs.registerLanguage("go", Go);

const cssLoc = extension.getURL("css/hljs.css");

async function addStyle() {
    if (document.head.querySelector(`[${marker}="style"]`)) {
        return;
    }

    const styleEl = document.createElement("style");
    styleEl.setAttribute("type", "text/css");
    styleEl.setAttribute(marker, "style");
    const req = await fetch(cssLoc);
    if (!req.ok) {
        console.debug("CodeQuest", "Failed to fetch CSS", cssLoc);
        return;
    }
    const css = await req.text();
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);
}

export async function markdownSnippet() {
    const codeBlocks = Array.from(document.body.querySelectorAll("code"));
    for (const codeEl of codeBlocks) {
        try {
            if (codeEl.hasAttribute(marker)) {
                continue;
            }

            const code = codeEl.innerText;
            const lang = /^(\S+)\s/.exec(code)?.[1] ?? "";
            console.debug("CodeQuest might be", lang);
            const hl =
                lang && hljs.getLanguage(lang)
                    ? hljs.highlight(
                          lang,
                          code.substring(lang.length + 1).trim(),
                      )
                    : hljs.highlightAuto(code.trim());
            codeEl.innerHTML = hl.value;
            codeEl.setAttribute(marker, "true");
            codeEl.classList.add("hljs");
            codeEl.classList.add("hljs-" + hl.language || lang || "plaintext");

            await addStyle();
        } catch (err) {
            console.debug("CodeQuest", err);
        }
    }
}
