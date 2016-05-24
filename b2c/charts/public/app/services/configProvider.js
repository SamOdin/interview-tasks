(function () {

    angular
        .module('configProvider', [])
        .service('configProvider', ['$resource', configProvider])

        function configProvider($resource) {
            return $resource('/api/v1/config', {}, {
                'getConfig': {
                    method: 'GET',
                    isArray: false
                }
            })
        }

})();