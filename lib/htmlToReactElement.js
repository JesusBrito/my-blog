import {decode} from "html-entities";
import * as React from "react";
import CustomQuote from "@includes/custom-quote";
import {parse} from 'himalaya';

export default function htmlToReactElement(html) {
    const json = parse(html);
    return json.map(mapElement)
}



function mapElement(element, index) {
    switch (element.type) {
        case "text": {
            // si es un nodo de texto decodificamos el contenido y lo devolvemos
            return decode(element.content);
        }
        case "element": {
            // si es un elemento lo pasamos (junto a su posición en el array) a matchElement
            return matchElement(element, index);
        }
        default: {
            // en cualquier otro caso (como que sea `comment`) devolvemos null
            return null;
        }
    }
}

// esta función va a convertir el atributo `class` a className` y combinar
// los atributos de con los props base
function mergeProps(baseProps, element) {
    return (element.attributes || [])
        .map(
            ({ key, value }) =>
                key === 'class' ? { key: 'className', value } : { key, value }
        )
        .reduce(
            (attributes, { key, value }) => ({ ...attributes, [key]: value }),
            baseProps
        );
}

function matchElement({ tagName, children, attributes }, index) {
    // este objeto son todos los props que queramos incluir a todos los elementos
    // en este caso solo vamos a definir el prop especial `key` con el valor de `index`
    const baseProps = { key: index };

    const props = mergeProps(baseProps, { attributes });

    switch (tagName) {
        case 'br':
        case 'img':
        case 'hr': {
            // estas etiquetas no pueden tener elementos hijos por esa razón
            // solo creamos la etiqueta con props
            return React.createElement(tagName, props);
        }
        case 'custom-quote': {
            // como dijimos antes usamos un componente propio (Twitter)
            // para reemplazar la etiquieta <twitter-card>
            return React.createElement(CustomQuote, props);
        }
        default: {
            // para cualquier caso no manejado simplemente creamos un element
            // con el nombre de etiqueta, props y elementos hijos
            return React.createElement(tagName, props, children.map(mapElement));
        }
    }
}
