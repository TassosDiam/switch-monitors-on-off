module.exports = function cartesianPower(xs, n) {
  let result = xs;
  for (let i = 1; i < n; i++) {
    result = cartesianProduct(result, xs);
  }
  return result;
};

function cartesianProduct(xs, ys) {
  const result = [];
  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < ys.length; j++) {
      result.push([].concat.apply([], [xs[i], ys[j]]));
    }
  }
  return result;
}
