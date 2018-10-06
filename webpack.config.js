const path = require("path");
module.exports = {
    entry: ["./src/index.js"],
    output: {
        path: __dirname,
        publicPath: "/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, include: path.join(__dirname, "src"), loaders: ["babel"]},
            {test: /(\.css)$/, loaders: ["style-loader", "css-loader"]},
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "font/"
                }
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: "./",
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
};
