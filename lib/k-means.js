const mathUtils = require('./math-utils');

const _getData = data => {
	const myData = [];
	data.map(u => myData.push({ coordinates: u, cluster: -1, converged: false }));
	return myData;
};

const _getDefaultCentroids = (data, n) => {
	let centroids = [];

	for (let j = 0; j < n; j ++) {
		let random = mathUtils.randomInteger(0, data.length - 1);
		while (centroids.some(c => c['cluster'] === random)) {
			random = mathUtils.randomInteger(0, data.length - 1);
		}
		
		centroids = centroids.concat({
			cluster: j,
			coordinates: data[random]
		});
	}

	return centroids;
};

const _getCentroids = (data, n) => {
	const centroids = [];

	for (let cluster = 0; cluster < n; cluster ++) {
		const clusterData = data.filter(u => u['cluster'] === cluster);
		const centroid = { cluster: cluster, coordinates: [] };

		if (clusterData.length) {
			// Get number of dimensions
			const dim = clusterData[0]['coordinates'].length;

			// Recalculate centroid coordinates
			for (let j = 0; j < dim; j ++) {
				const values = clusterData.reduce((acc, curr) => acc.concat(curr['coordinates'][j]), []);
				const mean = mathUtils.mean(values);
				centroid['coordinates'].push(mean);
			}
		} else {
			centroid['coordinates'] = data[0]['coordinates'];
		}

		// Add current cluster centroid to centroids array
		centroids.push(centroid);
	}

	return centroids;
};

const _classify = (data, centroids) => {
	data.map(u => {
		const distances = [];
		const previousCluster = u['cluster'];
		centroids.forEach(c => distances.push(mathUtils.euclideanDistance(u, c)));

		const resultsCopy = JSON.parse(JSON.stringify(distances));
		const minDistance = distances.sort((a, b) => a - b)[0];
		u['cluster'] = resultsCopy.indexOf(minDistance);
		u['converged'] = u['cluster'] === previousCluster;
	});

	return data;
};

const _run = (data, n) => {
	let myData = _getData(data);
	let centroids = _getDefaultCentroids(data, n);
	let epochs = 0;


	// Log initial results
	console.log(`Epoch: ${epochs}`);
	console.log('Centroids:');
	console.log(centroids)
	console.log('Classification:');
	console.log(myData)

	while (!myData.reduce((acc, curr) => acc && curr['converged'], true)) {
		myData = _classify(myData, centroids);	// Assign clusters
		centroids = _getCentroids(myData, n);	// Get new centroids
		epochs ++;

		// Log partial results
		console.log(`Epoch: ${epochs}`);
		console.log('Centroids:');
		console.log(centroids)
		console.log('Classification:');
		console.log(myData)
	}

	console.log(`Converged after ${epochs + 1} epochs`);
	return { myData, centroids };
};

module.exports = {
	run: async (data, n) =>  _run(data, n)
}