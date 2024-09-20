// Helper function: Calculate dot product of two vectors
function dotProduct(vectorA, vectorB) {
  let dotProduct = 0;
  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
  }
  return dotProduct;
}

// Helper function: Calculate magnitude of a vector
function magnitude(vector) {
  let sum = 0;
  for (let i = 0; i < vector.length; i++) {
    sum += vector[i] * vector[i];
  }
  return Math.sqrt(sum);
}

function cosineSimilarity(vectorA, vectorB) {
  const dotProductValue = dotProduct(vectorA, vectorB);
  const magnitudeA = magnitude(vectorA);
  const magnitudeB = magnitude(vectorB);

  if (magnitudeA === 0 || magnitudeB === 0) return 0; // Avoid division by zero
  const cosineSimilarity = dotProductValue / (magnitudeA * magnitudeB);

  // Normalize the cosine similarity score to a range from 0 to 1
  const normalizedSimilarity = (cosineSimilarity + 1) / 2;
  return normalizedSimilarity;
}

module.exports = { cosineSimilarity };
