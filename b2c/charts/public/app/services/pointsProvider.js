(function () {

    angular
        .module('pointsProvider', [])
        .service('pointsProvider', ['socketFactory', pointsProvider])

        function pointsProvider(socketFactory) {
            return socketFactory({
                ioSocket: io.connect('/')
            });
        }

})();