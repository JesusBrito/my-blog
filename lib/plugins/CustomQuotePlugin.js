import regexp from "markdown-it-regexp";

// custom plugin for twitter cards
const tweet = regexp(/@\[twitter\]\(([^\)]*)\)/, match => {
    console.log(match)
    const atributes = match[1];
    return `<custom-quote id="${atributes}"></custom-quote>`;
});

export default tweet;
