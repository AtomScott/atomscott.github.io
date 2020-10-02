const iter = a => {
  let i = 0; const ac = a.map(x => ({ value: x, done: false }));
  const it = { next: () => i < ac.length ? ac[i++] : { done: true } };
  if (Symbol) it[Symbol.iterator] = () => it;
  return it;
};

const _Set = typeof Set !== 'undefined' && new Set([1]).size === 1 ?
  Set :
  (a = []) => {
    a = a.filter((x, i) => i === a.indexOf(x));
    a.size = a.length;
    a.has = x => a.indexOf(x) > -1;
    a.add = x => { if (!a.has(x)) { a.size++; a.push(x) } return a; };
    a.delete = x => { let t; if (t = a.has(x)) { a.size--; a.splice(a.indexOf(x), 1) } return t; };
    a.clear = () => { while (a.pop()) {} a.size = 0 };
    a.keys = a.values = () => iter(a);
    a.entries = () => iter(a.map(x => [x, x]));
    if (Symbol) a[Symbol.iterator] = a.values;
    return a;
  };

export { _Set as Set };
