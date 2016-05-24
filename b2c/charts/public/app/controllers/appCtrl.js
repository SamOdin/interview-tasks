(function () {
    
    angular
        .module('appCtrl', [])
        .controller('appCtrl', ['pointsProvider', 'configProvider', '$scope', appCtrl])
    
        function appCtrl(pointsProvider, configProvider, $scope) {

            $scope.series = ['Points'];

            //provide config object from server
            $scope.config = configProvider.getConfig();

            //receive an array of random numbers from server
            $scope.data = [];
            pointsProvider.on('createPath', function (data) {

                    $scope.data.push(data.path);

            });

            //update graph with random points
            pointsProvider.on('updatePath', function (data) {
                angular.forEach(data, function(newPathItems, key){
                    $scope.data[key].shift();
                    $scope.data[key].push(newPathItems.newPathItem);
                });
            });

            $scope.labels = [];
            $scope.config.$promise.then(function (response) {
                for (var i = 0; i < response.POINTS.QTY; i++) {
                    $scope.labels.push(i);
                }
            });

            //add new graph via button
            $scope.addGraph = function(){
                pointsProvider.emit('addGraph');
            };

            //add new graph event listener
            pointsProvider.on('addNewGraph', function (data) {
                $scope.data.push(data);
            });

        }
    
})();