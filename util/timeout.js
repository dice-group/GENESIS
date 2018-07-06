module.exports = (ms, promise) =>
  new Promise((resolve, reject) => {
    promise.then(resolve);
    setTimeout(() => reject(new Error(`Timeout after ${ms} ms`)), ms);
  });
