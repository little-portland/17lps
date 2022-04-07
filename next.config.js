module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000',
            // test: /\.svg$/,
            // use: ["@svgr/webpack"]
        });

        return config;
    }
};