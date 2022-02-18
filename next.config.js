module.exports = {
    webpack: (config, { isServer }) => {
        config.module.rules.push({test:  /\.md$/, use: 'raw-loader'})
        config.module.rules.push({test: /\.yml$/, use: 'raw-loader'})
        if (isServer) {
            require("./utils/dynamic-sitemap.js");
        }
        return config
    },
    images: {
        loader: 'imgix',
        path: 'https://example.com/myaccount/',
    },
}