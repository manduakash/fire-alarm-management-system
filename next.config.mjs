/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
        config.module.rules.push({
            test: /\.(mp3|wav|ogg)$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: `/_next/static/audio/`,
                    outputPath: `${isServer ? "../" : ""}static/audio/`,
                    name: '[name].[hash].[ext]',
                    esModule: false,
                },
            },
        });

        return config;
    },
};

export default nextConfig;
