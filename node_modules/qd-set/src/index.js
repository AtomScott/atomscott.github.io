const _Set = typeof Set !== 'undefined' && new Set([1]).size === 1 ?
  Set :
  (a = []) => {
    a = a.filter((x, i) => i === a.indexOf(x));
    a.size = a.length;
    a.has = x => a.indexOf(x) > -1;
    a.add = x => { if (!a.has(x)) { a.size++; a.push(x); } return a; };
    a.delete = x => { let t; if (t = a.has(x)) { a.size--; a.splice(a.indexOf(x), 1) } return t; };
    a.clear = () => { while (a.pop()) {} a.size = 0; };
    return a;
  };

export { _Set as Set };
