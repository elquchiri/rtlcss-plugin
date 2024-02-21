/*
 * Copyright © ProgramCMS. All rights reserved.
 * See COPYING.txt for license details.
 *
 * Developed by Mohamed EL QUCHIRI <elquchiri@gmail.com>
 */

const { sources } = require('webpack');
const postcss = require('postcss');
const rtlcss = require('rtlcss');
const path = require('path');
const autoprefixer = require('autoprefixer');

class RtlCssPlugin {
    constructor(options) {
        // Options for the plugin
        this.options = options || {};
    }

    apply(compiler) {
        compiler.hooks.thisCompilation.tap('RtlCssPlugin', (compilation) => {
            compilation.hooks.processAssets.tapAsync({
                name: 'RtlCssPlugin',
                stage: compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE, // Here we access compilation
            }, (assets, callback) => {
                // Loop through emitted assets
                for (const filename in assets) {
                    // Check if the file matches the pattern
                    if (this.isCSSEntry(filename)) {
                        const asset = assets[filename];
                        const source = asset.source();

                        // Transform CSS to RTL
                        let result = postcss()
                            .use(rtlcss([
                                this.options.config || {} ,
                                this.options.plugins || {},
                                this.options.hooks || {}
                            ]))
                            .use(autoprefixer())
                            .process(source);
                        const rtlCSS = result.css;

                        // Generate RTL filename
                        const rtlFilename = this.options.filename || this.getRTLFileName(filename);

                        // Add the generated RTL CSS file to the assets
                        assets[rtlFilename] = new sources.RawSource(rtlCSS);
                    }
                }

                callback();
            });
        });
    }

    isCSSEntry(filename) {
        // Add your file matching logic here
        return /\.css$/.test(filename);
    }

    getRTLFileName(filename) {
        // Generate RTL filename
        const parsedPath = path.parse(filename);
        return path.join(parsedPath.dir, parsedPath.name + '-rtl' + parsedPath.ext);
    }
}

module.exports = RtlCssPlugin;