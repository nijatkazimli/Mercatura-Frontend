/* eslint-disable no-undef */
const { override, addPostcssPlugins } = require('customize-cra');

module.exports = override(
    addPostcssPlugins([
        require('postcss-calc')
    ])
);
