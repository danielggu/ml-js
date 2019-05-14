const KMeansClassifier = require('./k-means.runner');

/**
 * Returns true if coordinates match any of the centroids
 * 
 * @param {Array<number>} coordinates 
 * @param {Array<Object>} centroids 
 */
const _coordinatesMatchAnyCentroid = (coordinates, centroids) => {
	return centroids.some(centroid => centroid['coordinates']
		.reduce((acc, curr, idx) => acc && curr === coordinates[idx], true));
};

describe('K-means test', () => {
	const testData = [
		[0, 1],
		[7, 6],
		[1, 1],
		[1, 2],
		[1, 2],
		[8, 5],
		[7, 7],
		[0, 0],
		[6, 8],
		[3, 3]
	];

	it('Classifies correctly test data', async () => {
		const test = await KMeansClassifier.run(testData, 2);
		const centroids = test['centroids'];

		expect(_coordinatesMatchAnyCentroid([1, 1.5], centroids)).toBeTruthy();
		expect(_coordinatesMatchAnyCentroid([7, 6.5], centroids)).toBeTruthy();
	});
});
