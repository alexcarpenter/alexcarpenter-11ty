module.exports = (ctx) => ({
    'map': false,
    'plugins': {
        'postcss-import': {
            root: ctx.file.dirname
        },
        'postcss-cssnext': {
            'warnForDuplicates': false,
            'features': {
                'customProperties': {
                    'preserve': true
                },
                'rem': false
            }
        },
        'cssnano': {
            preset: 'default'
        }
    }
});
