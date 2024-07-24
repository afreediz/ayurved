const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
    addWebpackModuleRule({
        test: /\.svg$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    throwIfNamespace: false,
                },
            },
            'file-loader',
        ],
    })
);
