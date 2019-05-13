const KMeansClassifier = require('./lib/k-means');

(async () => {
	const inputData = [
		[1, 2],
		[0, 0],
		[1, 1],
		[5, 5],
		[9, 8],
		[6, 7],
		[8, 8]
	];

	const test = await KMeansClassifier.run(inputData, 2);
})();