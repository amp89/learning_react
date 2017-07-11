

module.exports = {

    entry:'./app.jsx',
    output:{
            //path
            filename:'bundle.js'
        },
    module: {
        loaders: [
            {
                test: /\.jsx$/, //had to make this .jsx instead of .js
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'//!chains
            }
        ]
    }

}
