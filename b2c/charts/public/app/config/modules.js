function initModules($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        modules: [
            
            /*Controllers*/
            {
                name: 'appCtrl',
                files: ['/app/controllers/appCtrl.js']
            },

            /* Providers */
            {
                name: 'pointsProvider',
                files: ['/app/services/pointsProvider.js']
            },
            {
                name: 'configProvider',
                files: ['/app/services/configProvider.js']
            }
            
        ]
    });
}