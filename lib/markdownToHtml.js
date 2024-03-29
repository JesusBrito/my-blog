import hljs from 'highlight.js';
import MarkdownIt from "markdown-it";
import alert from "markdown-it-alert";

export default async function markdownToHtml(markdown) {
    let md = new MarkdownIt({
        html: false, // desactivamos el uso de HTML dentro del markdown
        breaks: true, // transforma los saltos de línea a un <br />
        linkify: true, // detecta enlaces y los vuelve enlaces
        xhtmlOut: false, // devuelve XHTML válido (por ejemplo <br /> en vez de <br>)
        typographer: true, // reemplaza ciertas palabras para mejorar el texto
        langPrefix: "language-", // agrega una clase `language-[lang]` a los bloques de código
        CommonMarkStrict: false,
        highlight: (str, lang) => {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre class="hljs"><code>' +
                        hljs.highlight(lang, str, true).value +
                        '</code></pre>';
                } catch (__) {}
            }

            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    });

    md.use(alert);

    return md.render(markdown)
}