const mathUtils = require('../math-utils');

const _getData = data => {
	const myData = [];
	data.map(u => myData.push({ coordinates: u, cluster: -1, converged: false }));
	return myData;
};

const _getDefaultCentroids = (data, n) => {
	const centroids = [];	// Clusters centroids

	for (let j = 0; j < n; j ++) {
		// Get random integer to select initial node for cluster j
		let random = mathUtils.randomInteger(0, data.length - 1);

		/**
		 * While block ensures initial nodes do have different coordinates
		 * Therefore all clusters will have at least one observation after the first classification
		 */
		while (
			centroids.some(centroid => centroid['coordinates']
				.reduce((acc, curr, idx) => acc && curr === data[random][idx], true))
		) {
			random = mathUtils.randomInteger(0, data.length - 1);
		}

		// Push current iteration data
		centroids.push({ cluster: j, coordinates: data[random] });
	}

	return centroids;
};

const _getCentroids = (data, n) => {
	const centroids = [];

	for (let cluster = 0; cluster < n; cluster ++) {
		const clusterData = data.filter(u => u['cluster'] === cluster);
		const centroid = { cluster: cluster, coordinates: [] };

		// Get number of dimensions
		const dim = clusterData[0]['coordinates'].length;

		// Recalculate centroid coordinates
		for (let j = 0; j < dim; j ++) {
			const values = clusterData.reduce((acc, curr) => acc.concat(curr['coordinates'][j]), []);
			const mean = mathUtils.mean(values);
			centroid['coordinates'].push(mean);
		}

		// Add current cluster centroid to centroids array
		centroids.push(centroid);
	}

	return centroids;
};

const _classify = (data, centroids) => {
	data.map(u => {
		const distances = [];					// Distances from current node to each cluster
		const previousCluster = u['cluster'];	// Cluster which current node belongs to

		// Get cluster-node distances
		centroids.forEach(c => distances.push(mathUtils.euclideanDistance(u, c)));

		// Update node properties
		const resultsCopy = JSON.parse(JSON.stringify(distances));
		const minDistance = distances.sort((a, b) => a - b)[0];
		u['cluster'] = resultsCopy.indexOf(minDistance);
		u['converged'] = u['cluster'] === previousCluster;
	});

	return data;
};

const _logResults = (epoch, centroids, classification) => {
	console.log(`Epoch: ${epoch}`);
	console.log('Centroids:');
	console.log(centroids);
	console.log('Classification:');
	console.log(classification);
};

const _run = (data, n) => {
	let myData = _getData(data);
	let centroids = _getDefaultCentroids(data, n);
	let epochs = 0;

	// Log initial results
	_logResults(epochs, centroids, myData);

	while (!myData.reduce((acc, curr) => acc && curr['converged'], true)) {
		epochs ++;									// Increment epoch counter
		myData = _classify(myData, centroids);		// Assign clusters
		centroids = _getCentroids(myData, n);		// Get new centroids
		_logResults(epochs, centroids, myData);		// Log current epoch results
	}

	console.log(`Converged after ${epochs + 1} epochs`);
	return { myData, centroids };
};

module.exports = {
	run: async (data, n) =>  _run(data, n)
}