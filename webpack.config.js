const path = require('path');

module.exports = {
    entry: './src/conf/urls.json',
    target: "web",
    devServer: {
        host: "localhost",
        port: 4444,
        https: true
    },
    module: {
        loaders: [{
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|json)$/,
                loader: "file-loader",
                options: {
                    // '[path][name].[ext]';
                    name: (path) => {
                        let out = path.replace(__dirname + "/src", "");
                        console.log(`output file path ${out} into ${__dirname+"/dist"}`);
                        return out;
                    }
                }
            }
            // ,
            // {
            //     test: /\.json$/,
            //     loader: 'json'
            // }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};