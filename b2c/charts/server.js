var express = require('express');
var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')( http );

var CONFIG = {
	POINTS: {
		QTY: 100,					// number of points
		MIN: -100,					// minimum value of a point
		MAX: 100,					// maximum value of a point
		UPDATE_INTERVAL: 20			// interval between points update (ms)
	}
};

//variable that set the count of graphs server provides
var graphsCount = 1;

function getRandom(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function initPoints() {
	var points = [];
	for (var pointIndex = 0; pointIndex < CONFIG.POINTS.QTY; pointIndex++) {
		points[pointIndex] = getRandom(CONFIG.POINTS.MIN, CONFIG.POINTS.MAX);
	}
	return points;
}

app.use(express.static('public'));

app.get('/api/v1/config', function (req, res) {
	res.json(CONFIG);
});

http.listen(3000, function () {
	console.log('listening on port 3000');
});

//create event handler to control real-time connection via WebSocket
io.sockets.on('connection', function (socket) {
	//create array for default graph
	socket.emit('createPath', {path: initPoints()})

	//create new random points for each graph object
	setInterval(function () {

		var randomPoints = [];

		for (var i = 0; i < graphsCount; i++) {
			randomPoints.push({newPathItem: getRandom(CONFIG.POINTS.MIN, CONFIG.POINTS.MAX)})
		}

		socket.emit('updatePath', randomPoints);

	}, CONFIG.POINTS.UPDATE_INTERVAL)

	//restore variable graphsCount after disconnecting from server
	socket.on('disconnect', function () {
		graphsCount = 1;
	});

	//add new graph object
	socket.on('addGraph', function () {
		var newGraph = initPoints();
		socket.emit('addNewGraph', newGraph);
		graphsCount++;
	});

});