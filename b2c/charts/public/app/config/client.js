(function () {

    angular
        .module('app', [
            'ui.router',
            'oc.lazyLoad',
            'ngResource',
            'uiRouterStyles',
            'chart.js',
            'btford.socket-io'])

        .config(appConfig)
    
            appConfig.$inject = [
                '$ocLazyLoadProvider',
                '$stateProvider',
                '$urlRouterProvider',
                '$locationProvider',
            ];
    
            function appConfig($ocLazyLoadProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
                $locationProvider.html5Mode(true).hashPrefix('!');
                initModules($ocLazyLoadProvider);
                initStates($stateProvider, $ocLazyLoadProvider);
                $urlRouterProvider.otherwise('/');
            }
    
})();