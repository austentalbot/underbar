describe('identity', function() {
  var uniqueObject = {};

  it('should return whatever value is passed into it', function() {
    expect(_.identity(1)).to.equal(1);

    expect(_.identity('string')).to.equal('string');

    expect(_.identity(false)).to.equal(false);

    expect(_.identity(uniqueObject)).to.equal(uniqueObject);
  });
});

describe('first', function() {
  it('should be able to pull out the first element of an array', function() {
    expect(_.first([1,2,3])).to.equal(1);
  });

  it('should be able to accept a user-defined index', function() {
    expect(_.first([1,2,3], 0)).to.eql([]);
    expect(_.first([1,2,3], 2)).to.eql([1, 2]);
    expect(_.first([1,2,3], 5)).to.eql([1, 2, 3]);
  });
});

describe('last', function() {
  it('should pull the last element from an array', function() {
    expect(_.last([1,2,3])).to.equal(3);
  });

  it('should accept an index argument', function() {
    expect(_.last([1,2,3], 2)).to.eql([2, 3]);
  });

  it('should return nothing if zero is passed in as the index', function() {
    expect(_.last([1,2,3], 0)).to.eql([]);
  });

  it('should return all the array\'s elements if the index argument is larger than the length of the array', function() {
    expect(_.last([1,2,3], 5)).to.eql([1, 2, 3]);
  });
});

describe('each', function() {
  it('should iterate over arrays, providing access to the element, index, and array itself', function() {
    var animals = ['ant', 'bat', 'cat'];
    var iterationInputs = [];

    _.each(animals, function(animal, index, list) {
      iterationInputs.push([animal, index, list]);
    });

    expect(iterationInputs).to.eql([
      ['ant', 0, animals],
      ['bat', 1, animals],
      ['cat', 2, animals]
    ]);
  });

  it('should only iterate over the array elements, not properties of the array', function() {
    var animals = ['ant', 'bat', 'cat'];
    var iterationInputs = [];

    animals.shouldBeIgnored = 'Ignore me!';

    _.each(animals, function(animal, index, list) {
      iterationInputs.push([animal, index, list]);
    });

    expect(iterationInputs).to.eql([
      ['ant', 0, animals],
      ['bat', 1, animals],
      ['cat', 2, animals]
    ]);
  });

  it('should iterate over objects, providing access to the element, index, and object itself', function() {
    var animals = { a: 'ant', b: 'bat', c: 'cat' };
    var iterationInputs = [];

    _.each(animals, function(animal, key, object) {
      iterationInputs.push([animal, key, object]);
    });

    expect(iterationInputs).to.eql([
      ['ant', 'a', animals],
      ['bat', 'b', animals],
      ['cat', 'c', animals]
    ]);
  });
});

describe('indexOf', function() {
  it('should have 40 in the list', function() {
    var numbers = [10, 20, 30, 40, 50];

    expect(_.indexOf(numbers, 40)).to.be(3);
  });

  it('should be able to compute indexOf even when the native function is undefined', function() {
    var numbers = [10, 20, 30];

    // If the browser provides a native indexOf array method, disable it
    numbers.indexOf = null;

    expect(_.indexOf(numbers, 20)).to.be(1);
  });

  it('returns -1 when the target cannot be found not in the list', function() {
    var numbers = [10, 20, 30, 40, 50];

    expect(_.indexOf(numbers, 35)).to.be(-1);
  });

  it('returns the first index that the target can be found at when there are multiple matches', function() {
    var numbers = [1, 40, 40, 40, 40, 40, 40, 40, 50, 60, 70];

    expect(_.indexOf(numbers, 40)).to.be(1);
  });
});

describe('filter', function() {
  it('should return all even numbers in an array', function() {
    var isEven = function(num) { return num % 2 === 0; };
    var evens = _.filter([1, 2, 3, 4, 5, 6], isEven);

    expect(evens).to.eql([2, 4, 6]);
  });

  it('should return all odd numbers in an array', function() {
    var isOdd = function(num) { return num % 2 !== 0; };
    var odds = _.filter([1, 2, 3, 4, 5, 6], isOdd);

    expect(odds).to.eql([1, 3, 5]);
  });
});

describe('reject', function() {
  it('should reject all even numbers', function() {
    var isEven = function(num) { return num % 2 === 0; };
    var odds = _.reject([1, 2, 3, 4, 5, 6], isEven);

    expect(odds).to.eql([1, 3, 5]);
  });

  it('should reject all odd numbers', function() {
    var isOdd = function(num) { return num % 2 !== 0; };
    var evens = _.reject([1, 2, 3, 4, 5, 6], isOdd);

    expect(evens).to.eql([2, 4, 6]);
  });
});

describe('uniq', function() {
  it('should return all unique values contained in an unsorted array', function() {
    var list = [1, 2, 1, 3, 1, 4];

    expect(_.uniq(list)).to.eql([1, 2, 3, 4]);
  });

  it('should handle iterators that work with a sorted array', function() {
    var iterator = function(value) { return value +1; };
    var list = [1, 2, 2, 3, 4, 4];

    expect(_.uniq(list, true, iterator)).to.eql([1, 2, 3, 4]);
  });
});

describe('map', function() {
  it('should apply a function to every value in an array', function() {
    var doubled = _.map([1, 2, 3], function(num) {
      return num * 2;
    });

    expect(doubled).to.eql([2, 4, 6]);
  });
});

describe('pluck', function() {
  it('should return values contained at a user-defined property', function() {
    var people = [
      {name : 'moe', age : 30},
      {name : 'curly', age : 50}
    ];

    expect(_.pluck(people, 'name')).to.eql(['moe', 'curly']);
  });
});

describe('invoke, when provided a function reference', function() {
  it('runs the input function on each item in the array, and returns a list of results', function() {
    var reverse = function(){
      return this.split('').reverse().join('');
    };

    var reversedStrings = _.invoke(['dog', 'cat'], reverse);

    expect(reversedStrings).to.eql(['god', 'tac']);
  });
});

describe('invoke, when provided a method name', function() {
  it('runs the specified method on each item in the array, and returns a list of results', function() {
    var upperCasedStrings = _.invoke(['dog', 'cat'], 'toUpperCase');

    expect(upperCasedStrings).to.eql(['DOG', 'CAT']);
  });
});

describe('reduce', function() {
  it('should be able to sum up an array', function() {
    var add = function(tally, item) {return tally + item; };
    var total = _.reduce([1, 2, 3], add, 0);

    expect(total).to.equal(6);
  });

});

describe('contains', function() {
  it('should return false if a collection does not contain a user-specified value', function() {
    expect(_.contains([4,5,6], 2)).to.equal(false);
  });

  it('should return true if a collection contains a user-specified value', function() {
    expect(_.contains([  4,   5,   6], 5)).to.equal(true);
  });

  it('can operate on objects', function(){
    expect(_.contains({a:4, b:5, c:6}, 5)).to.equal(true);
  });
});

describe('every', function() {
  it('passes by default for an empty collection', function() {
    expect(_.every([], _.identity)).to.equal(true);
  });

  it('passes for a collection of all-truthy results', function() {
    expect(_.every([true, {}, 1], _.identity)).to.equal(true);
  });

  it('fails for a collection of all-falsy results', function() {
    expect(_.every([null, 0, undefined], _.identity)).to.equal(false);
  });

  it('fails for a collection containing mixed falsy and truthy results', function() {
    expect(_.every([true, false, 1], _.identity)).to.equal(false);
  });

  it('handles callbacks that do work on the input', function() {
    var isEven = function(num) { return num % 2 === 0; };

    expect(_.every([0, 10, 28], isEven)).to.equal(true);
    expect(_.every([0, 11, 28], isEven)).to.equal(false);
  });

  it('casts the result to a boolean', function() {
    expect(_.every([1], _.identity)).to.equal(true);
    expect(_.every([0], _.identity)).to.equal(false);
  });

  it('treats each item as as a callback result when no callback is provided', function() {
    expect(_.every([true, true, true])).to.equal(true);
  });

  it('works when provded a collection containing undefined values', function() {
    expect(_.every([undefined, undefined, undefined], _.identity)).to.equal(false);
  });
});

describe('some', function() {
  var nativeSome = Array.prototype.some;
  var isEven = function(number){
    return number % 2 === 0;
  };

  beforeEach(function() {
    Array.prototype.some = null;
  });

  afterEach(function() {
    Array.prototype.some = nativeSome;
  });

  it('should handle the empty set', function() {
    expect(_.some([])).to.equal(false);
  });

  it('passes for a collection of all-truthy results', function() {
    expect(_.some([true, {}, 1], _.identity)).to.equal(true);
  });

  it('fails for a collection of all-falsy results', function() {
    expect(_.some([null, 0, undefined], _.identity)).to.equal(false);
  });

  it('passes for a collection containing mixed falsy and truthy results', function() {
    expect(_.some([true, false, 1], _.identity)).to.equal(true);
  });

  it('passes for a set containing one truthy value that is a string', function() {
    expect(_.some([null, 0, 'yes', false])).to.equal(true);
  });

  it('fails for a set containing no matching values', function() {
    expect(_.some([1, 11, 29], isEven)).to.equal(false);
  });

  it('passes for a collection containing one matching value', function() {
    expect(_.some([1, 10, 29], isEven)).to.equal(true);
  });

  it('casts the result to a boolean', function() {
    expect(_.some([1], _.identity)).to.equal(true);
    expect(_.some([0], _.identity)).to.equal(false);
  });
});

describe('extend', function() {
  it('returns the first argument', function() {
    var to = {};
    var from = {};
    var extended = _.extend(to, from);

    expect(extended).to.equal(to);
  });

  it('should extend an object with the attributes of another', function() {
    var to = {};
    var from = {a:'b'};
    var extended = _.extend(to, from);

    expect(extended.a).to.equal('b');
  });

  it('should override properties found on the destination', function() {
    var to = {a:'x'};
    var from = {a:'b'};
    var extended = _.extend(to, from);

    expect(extended.a).to.equal('b');
  });

  it('should not override properties not found in the source', function() {
    var to = {x:'x'};
    var from = {a:'b'};
    var extended = _.extend(to, from);

    expect(extended.x).to.equal('x');
  });

  it('should extend from multiple source objects', function() {
    var extended = _.extend({x:1}, {a:2}, {b:3});

    expect(extended).to.eql({x:1, a:2, b:3});
  });

  it('in the case of a conflict, it should use the last property\'s values when extending from multiple source objects', function() {
    var extended = _.extend({x:'x'}, {a:'a', x:2}, {a:1});

    expect(extended).to.eql({x:2, a:1});
  });

  it('should copy undefined values', function() {
    var extended = _.extend({}, {a: void 0, b: null});

    expect('a' in extended && 'b' in extended).to.be(true);
  });
});

describe('defaults', function() {
  var options;

  beforeEach(function() {
    options = {zero: 0, one: 1, empty: '', nan: NaN, string: 'string'};
    _.defaults(options, {zero: 1, one: 10, twenty: 20}, {empty: 'full'}, {nan: 'nan'}, {word: 'word'}, {word: 'dog'});
  });

  it('returns the first argument', function() {
    var to = {};
    var from = {};
    var defaulted = _.defaults(to, from);

    expect(defaulted).to.equal(to);
  });

  it('should copy a property if that key is already set on the target', function() {
    var to = {};
    var from = {a:1};
    var defaulted = _.defaults(to, from);

    expect(defaulted.a).to.equal(1);
  });

  it('should not copy a property if that key is already set on the target', function() {
    var to = {a:10};
    var from = {a:1};
    var defaulted = _.defaults(to, from);

    expect(defaulted.a).to.equal(10);
  });

  it('should not copy a property if that key is already set on the target, even if the value for that key is falsy', function() {
    var to = {a: '', b: NaN};
    var from = {a: 1, b: 2};
    var defaulted = _.defaults(to, from);

    expect(defaulted.a).to.equal('');
    expect(isNaN(defaulted.b)).to.equal(true);
  });

  it('prefers the first value found, when two objects are provided with properties at the same key', function() {
    var to = {};
    var from = {a: 1};
    var alsoFrom = {a: 2};
    var defaulted = _.defaults(to, from, alsoFrom);

    expect(defaulted.a).to.equal(1);
  });
});

describe('once', function() {
  it('should only run a user-defined function if it hasn\'t been run before', function() {
    var num = 0;
    var increment = _.once(function() {
      num += 1;
    });

    increment();
    increment();

    expect(num).to.equal(1);
  });
});

describe('memoize', function() {
  var fib, fastFib, timeCheck, fastTime, wait;

  beforeEach(function() {
    fib = function(n) {
      if(n < 2){ return n; }
      return fib(n - 1) + fib(n - 2);
    };
    fastFib = _.memoize(fib);

    timeCheck = function(str) { return str + Date.now(); };
    fastTime = _.memoize(timeCheck);

    // Synchronous sleep: terrible for web development, awesome for testing _.memoize
    wait = function(t) {
      var start = Date.now();
      while ((Date.now() - start) < t){}
    };
  });

  it('a memoized function should produce the same result when called with the same arguments', function() {
    expect(fib(10)).to.equal(55);
    expect(fastFib(10)).to.equal(55);
  });

  it('should give different results for different arguments', function() {
    expect(fib(10)).to.equal(55);
    expect(fastFib(10)).to.equal(55);
    expect(fastFib(7)).to.equal(13);
  });

  it('should not run the function twice for the same given argument', function() {
    var firstTime = timeCheck('shazaam!');
    wait(5);
    var secondTime = fastTime('shazaam!');
    wait(5);
    expect(firstTime).to.not.equal(secondTime);
    expect(fastTime('shazaam!')).to.equal(secondTime);
  });
});

describe('delay', function() {
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    clock.restore();
  });

  it('should only execute the function after the specified wait time', function() {
    var callback = sinon.spy();
    _.delay(callback, 100);

    clock.tick(99);

    expect(callback.notCalled).to.be(true);

    clock.tick(1);

    expect(callback.calledOnce).to.be(true);
  });

  it('should have successfully passed function arguments in', function() {
    var callback = sinon.spy();

    _.delay(callback, 100, 1, 2);
    clock.tick(100);

    expect(callback.calledWith(1, 2)).to.be(true);
  });
});

describe('shuffle', function() {
  it('should not modify the original object', function() {
    var numbers = [4, 5, 6];
    var shuffled = _.shuffle(numbers).sort();

    expect(shuffled).to.not.equal(numbers);
    expect(numbers).to.eql([4, 5, 6]);
  });
});

describe('sortBy', function() {
  it('should sort by age', function() {
    var people = [{name : 'curly', age : 50}, {name : 'moe', age : 30}];
    people = _.sortBy(people, function(person) {
      return person.age;
    });

    expect(_.pluck(people, 'name')).to.eql(['moe', 'curly']);
  });

  it('should handle undefined values', function() {
    var list = [undefined, 4, 1, undefined, 3, 2];
    var result = _.sortBy(list, function(i) { return i; });

    expect(result).to.eql([1, 2, 3, 4, undefined, undefined]);
  });

  it('should sort by length', function() {
    var list = ['one', 'two', 'three', 'four', 'five'];
    var sorted = _.sortBy(list, 'length');

    expect(sorted).to.eql(['one', 'two', 'four', 'five', 'three']);
  });

  it('should produce results that change the order of the list as little as possible', function() {
    function Pair(x, y) {
      this.x = x;
      this.y = y;
    }

    var collection = [
      new Pair(1, 1), new Pair(1, 2),
      new Pair(1, 3), new Pair(1, 4),
      new Pair(1, 5), new Pair(1, 6),
      new Pair(2, 1), new Pair(2, 2),
      new Pair(2, 3), new Pair(2, 4),
      new Pair(2, 5), new Pair(2, 6),
      new Pair(undefined, 1), new Pair(undefined, 2),
      new Pair(undefined, 3), new Pair(undefined, 4),
      new Pair(undefined, 5), new Pair(undefined, 6)
    ];

    var actual = _.sortBy(collection, function(pair) {
      return pair.x;
    });

    expect(actual).to.eql(collection);
  });
});

describe('flatten', function() {
  it('can flatten nested arrays', function() {
    var nestedArray = [1, [2], [3, [[[4]]]]];

    expect(_.flatten(nestedArray)).to.eql([1,2,3,4]);
  });
});

describe('zip', function() {
  it('should zip together arrays of different lengths', function() {
    var names = ['moe', 'larry', 'curly'], ages = [30, 40, 50], leaders = [true];

    expect(_.zip(names, ages, leaders)).to.eql([
      ['moe', 30, true],
      ['larry', 40, undefined],
      ['curly', 50, undefined]
    ]);
  });
});

describe('intersection', function() {
  it('should take the set intersection of two arrays', function() {
    var stooges = ['moe', 'curly', 'larry'];
    var leaders = ['moe', 'groucho'];

    expect(_.intersection(stooges, leaders)).to.eql(['moe']);
  });
});

describe('difference', function() {
  it('should return the difference between two arrays', function() {
    var diff = _.difference([1,2,3], [2,30,40]);

    expect(diff).to.eql([1,3]);
  });

  it('should return the difference between three arrays', function() {
    var result = _.difference([1, 2, 3, 4], [2, 30, 40], [1, 11, 111]);

    expect(result).to.eql([3, 4]);
  });
});

describe("throttle", function() {
  it('throttled functions should only be able to be called again after the specified time', function(done) {
    var counter = 0;
    var incr = function() {
      counter++;
    };
    var throttledIncr = _.throttle(incr, 32);
    throttledIncr();
    throttledIncr();

    expect(counter).to.eql(1);
    setTimeout(function() {
      expect(counter).to.eql(2);
      done();
    }, 64);
  });

  it("throttled functions return their value", function(done) {
    var counter = 0;
    var incr = function() {
      return ++counter;
    };
    var throttledIncr = _.throttle(incr, 32);
    var result = throttledIncr();
    setTimeout(function() {
      expect(result).to.eql(1);
      expect(counter).to.eql(1);
      done();
    }, 64);
  });

  it("throttled functions called repeatedly should adhere to time limitations", function(done) {
    var counter = 0;
    var incr = function() {
      return ++counter;
    };
    var throttledIncr = _.throttle(incr, 64);
    var results = [];
    var saveResult = function() {
      results.push(throttledIncr());
    };
    saveResult();
    saveResult();
    setTimeout(saveResult, 32);
    setTimeout(saveResult, 80);
    setTimeout(saveResult, 96);
    setTimeout(saveResult, 144);
    setTimeout(function() {
      expect(results[0]).to.eql(1);
      expect(results[1]).to.eql(1);
      expect(results[2]).to.eql(1);
      expect(results[3]).to.eql(2);
      expect(results[4]).to.eql(2);
      expect(results[5]).to.eql(3);
      done();
    }, 192);
  })
});
