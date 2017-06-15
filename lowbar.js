const _ = {};

_.identity = (value) => {
  return value;
};

_.first = (arr, n) => {
  if (!n) return arr[0];

  return arr.slice(0, n);
};

_.last = (arr, n) => {
  if (!n) return Number(arr.slice(-1));

  return arr.slice(-n);
};

_.each = (list, iteratee) => {
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      iteratee(list[i], i, list);
    }

    return list;

  } else {
    const keys = Object.keys(list);

    for (let i = 0; i < keys.length; i++) {
      iteratee(list[keys[i]], keys[i], list);
    }

    return list;
  }
};

_.indexOf = (array, value, isSorted) => {
  if (!Array.isArray(array)) return -1;

  if (isSorted) {
    return binarySearch(array, value);
  } else {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) return i;
    }
  }

  return -1;
};

_.filter = (list, predicate) => {
  const res = [];

  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) res.push(list[i]);
  }

  return res;
};

_.reject = (list, predicate) => {
  const res = [];

  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) res.push(list[i]);
  }

  return res;
};

_.map = (list, iteratee) => {
  if (!arguments.length || 
      !Array.isArray(list) &&
      typeof list !== 'object') return [];

  const res = [];

  if (Array.isArray(list)) {
    _.each(list, (ele) => {
      res.push(iteratee(ele));
    });
    return res;

  } else {
    for (let key in list) {
      res.push(iteratee(list[key]));
    }
    return res;
  }
};

_.pluck = (list, propertyName) => {
  if (!Array.isArray(list)) return [];

  const res = _.map(list, (ele) => {
    if (ele.hasOwnProperty(propertyName)) return ele[propertyName];
  });

  return _.filter(res, (ele) => {
    return ele;
  });
};

_.reduce = (list, iteratee, acc) => {
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      acc = iteratee(acc, list[i], i);
    }
    return acc;

  } else {
    for (let key in list) {
      acc = iteratee(acc, list[key]);
    }
    return acc;
  }
};

_.contains = (list, value, fromIndex) => {
  if (!Array.isArray(list)) return false;
  if (fromIndex) list = list.slice(fromIndex);

  if (list.indexOf(value) >= 0) return true;

  return false;
};

_.every = (list, predicate) => {
  if (!Array.isArray(list) &&
      typeof list !== 'object') return false;

  let flag = true;

  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      flag = predicate(list[i]);
      if (!flag) break;
    }

  } else {
    for (let key in list) {
      flag = predicate(list[key]);
      if (!flag) break;
    }
  }

  return flag;
};

_.some = (list, predicate) => {
  if (!Array.isArray(list) && 
      typeof list !== 'object') return false;

  let flag = false;

  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      flag = predicate(list[i]);
      if (flag) break;
    }

  } else {
    for (let key in list) {
      flag = predicate(list[key]);
      if (flag) break;
    }
  }

  return flag;
};

_.extend = (destination, sources) => {
  if (typeof destination !== 'object') return destination;
  if (!sources) return destination;

  for (let key in sources) {
    destination[key] = sources[key];
  }

  return destination;
};

_.defaults = (object, defaults) => {
  if (typeof object !== 'object' || !defaults) return object;
  const keys = Object.keys(object);

  defaults[keys[0]] = object[keys[0]];

  return defaults;
};

_.indexOfWithBinary = (array, value, isSorted) => {
  if (!isSorted) return array.indexOf(value);

  let start = 0;
  let mid = Math.floor(array.length / 2);
  let end = array.length - 1;

  while (start < end) {
    if (array[mid] === value) return mid;

    if (value < array[mid]) {
      end = mid;
      mid = Math.floor(end / 2);
    }

    if (value > array[mid]) {
      if (start === mid) return end;
      start = mid;
      mid = Math.floor((mid + end) / 2);
    }
  }
};

_.once = (func) => {
  if (typeof func !== 'function') return func;
  let hasBeenCalled = false;
  let returnValue;

  if (hasBeenCalled) return returnValue;

  return function () {
    if (!hasBeenCalled) {
      hasBeenCalled = true;
      returnValue = func.apply(null, arguments);
    }
    return returnValue;
  };
};

_.memoize = (func) => {
  if (typeof func !== 'function') return func;
  const cache = {};

  return function () {
    const arg = arguments[0];

    if (cache[arg]) {
      return cache[arg];
    } else {
      const ans = func(arg);
      cache[arg] = ans;
      return cache[arg];
    }
  };
};

_.delay = (func, wait) => {
  if (typeof func !== 'function') return func;
  let args = Array.prototype.slice.call(arguments, 2);

  setTimeout(() => {
    return func.apply(null, args);
  }, wait);
};

_.shuffle = (list) => {
  if (!Array.isArray(list) &&
      typeof list !== 'object') return list;

  let keys = Object.keys(list);
  let length = keys.length;
  let res = Array(length);

  function getRandomInt (max) {
    return Math.floor(Math.random() * max);
  }

  for (let i = 0; i < length; i++) {
    let random = getRandomInt(i);
    if (random !== i) {
      res[i] = res[random];
    }
    res[random] = list[keys[i]];
  }
  
  return res;
};

_.sortBy = (list, iteratee) => {
  if (!Array.isArray(list) &&
      typeof list !== 'object') return list;

  if (typeof iteratee === 'string') {
    let orderedArray = [];

    _.each(list, ele => {
      orderedArray.push(ele[iteratee]);
    });

    orderedArray.sort();
    const result = [];

    _.each(orderedArray, ele => {
      _.each(list, key => {
        if (key[iteratee] === ele) {
          result.push(key);
        }
      });
    });

    return result;
  }

  if (Array.isArray(list)) {
    return list.sort((a, b) => {
      return iteratee(a) - iteratee(b);
    });
  }
};

_.zip = function () {
  if (!Array.isArray(arguments[0])) return arguments[0];

  const arrays = _.map(arguments, (arg) => {
    return arg;
  });

  let longestLength = 0;
  _.each(arrays, (arr) => {
    if (arr.length > longestLength) longestLength = arr.length;
  });

  const res = [];
  for (let i = 0; i < longestLength; i++) {
    res.push(_.map(arrays, (arr) => {
      return arr[i];
    }));
  }

  return res;
};

_.sortedIndex = (list, value, iteratee) => {
  if (!Array.isArray(list) &&
      typeof list !== 'object') return list;  

  if (iteratee) {
    return binarySearch(_.sortBy(list, iteratee), value);
  } else {
    return binarySearch(list, value);
  }
};

_.throttle = function (func, wait) {
  if (typeof func !== 'function') return func;
  let canBeCalled = true;

  return function () {
    if (canBeCalled) {
      func.apply(null, arguments);
      canBeCalled = false;

      setTimeout(() => {
        canBeCalled = true;
      }, wait);
    }
  };
};


if (typeof module !== 'undefined') {
  module.exports = _;
}


function binarySearch (list, name) {
  let start = 0;
  let end = list.length - 1;

  for (let i = 0; i < 10; i++) {
    var mid = Math.floor((end + start) / 2);

    if (list[mid] === name) {
      return mid;
    }
    if (name < list[mid]) {
      end = mid - 1;
    }
    if (name > list[mid]) {
      start = mid + 1;
    }
  }

  return mid + 1;
}


