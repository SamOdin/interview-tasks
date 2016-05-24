function initStates($stateProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('index', {
            url: '/',
            views: {
                'layout': {
                    controller: 'appCtrl',
                    templateUrl: '/app/views/layout.html',
                    resolve: resolveModule([ 'appCtrl', 'pointsProvider', 'configProvider' ])
                }
             }
         })

    function resolveModule(moduleName) {
        return {
            loadModules: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(moduleName);
            }]
        }
    }
}