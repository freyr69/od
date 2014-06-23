module.exports = {
    dev: {
        options: {
            paths: ['<%= config.assets %>/less'],
            yuicompress: false
        },
        files: {
            '<%= config.public %>/styles/styles.css': '<%= config.assets %>/less/styles.less'
        }
    },
    release: {
        options: {
            paths: ['<%= config.assets %>/less'],
            yuicompress: true
        },
        files: {
            '<%= config.public %>/styles/styles.css': '<%= config.assets %>/less/styles.less'
        }
    }
};