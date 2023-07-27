var path = require('path');

module.exports = {
    entry: ["./public/js/main.tsx"],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './public/js/build')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            components: path.resolve(__dirname, './public/js/components'),
        },
    },
    module: { // Loaders apply transformations before
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        "@babel/preset-typescript",
                    ]
                }
            },
            // CSS rules
            {
                test: /\.css?$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: false,
                        },
                    },
                ],
            },
        ]
    },
};
