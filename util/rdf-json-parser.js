module.exports = body => {
  // die if no data is given
  if (!body || !body.head || !body.results) {
    return undefined;
  }
  // process results
  return body.results.bindings.map(it =>
    body.head.vars
      .filter(v => it[v])
      .map(v => ({[v]: it[v]}))
      .reduce((acc, item) => ({...acc, ...item}), {})
  );
};
