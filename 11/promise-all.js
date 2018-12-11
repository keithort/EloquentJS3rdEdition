function Promise_all(promises) {
  return new Promise(function(resolve, reject) {
    if (promises.length === 0) {
      return resolve([]);
    }
    const results = [];
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then(val => {
          results[i] = val;
          if (i === promises.length) {
            return resolve(results);
          }
        })
        .catch(err => reject(err));
    }
  });
}
