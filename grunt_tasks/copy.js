module.exports = {
    vendors: {
        files: [
            {expand: true, cwd: '<%= config.bower %>/bootstrap/dist/fonts/', src: ['**'], dest: '<%= config.public %>/fonts/'},
            {expand: true, cwd: '<%= config.bower %>/font-awesome/fonts/', src: ['**'], dest: '<%= config.public %>/fonts/'},
            {src: '<%= config.bower %>/bootstrap/dist/js/bootstrap.js', dest: '<%= config.public %>/scripts/vendors/bootstrap.js'},
            {src: '<%= config.bower %>/jquery/dist/jquery.js', dest: '<%= config.public %>/scripts/vendors/jquery.js'},
            {src: '<%= config.bower %>/jquery.easy-pie-chart/dist/jquery.easypiechart.js', dest: '<%= config.public %>/scripts/vendors/jquery.easypiechart.js'}

        ]
    },
    release: {
        files: [
            {expand: true, cwd: '<%= config.bower %>/bootstrap/dist/fonts/', src: ['**'], dest: '<%= config.public %>/fonts/'},
            {expand: true, cwd: '<%= config.bower %>/font-awesome/fonts/', src: ['**'], dest: '<%= config.public %>/fonts/'},
            {src: '<%= config.bower %>/bootstrap/dist/js/bootstrap.min.js', dest: '<%= config.public %>/scripts/vendors/bootstrap.js'},
            {src: '<%= config.bower %>/jquery/dist/jquery.min.js', dest: '<%= config.public %>/scripts/vendors/jquery.js'},
            {src: '<%= config.bower %>/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js', dest: '<%= config.public %>/scripts/vendors/jquery.easypiechart.js'},
            {expand: true, cwd: '<%= config.assets %>/scripts/', src: ['**'], dest: '<%= config.public %>/scripts/'},
            {expand: true, cwd: '<%= config.assets %>/images/', src: ['**'], dest: '<%= config.public %>/images/'}
        ]
    },
    scripts: {
        files: [
            // assets scripts
            {expand: true, cwd: '<%= config.assets %>/scripts/', src: ['**'], dest: '<%= config.public %>/scripts/'}
        ]
    },
    images: {
        files: [
            // assets images
            {expand: true, cwd: '<%= config.assets %>/images/', src: ['**'], dest: '<%= config.public %>/images/'}
        ]
    }
};