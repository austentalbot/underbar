/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  /*_.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };*/
  _.first = function(array, n) {
    return n===undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  /*_.last = function(array, n) {
    return n === undefined ? array[array.length-1] : 
        n>=array.length ? array :
        array.slice(array.length-n, array.length);
  };*/
  _.last = function(array, n) {
    return n===undefined ? array[array.length-1] : 
    n>array.length-1 ?
    array : array.slice(array.length-n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  /*_.each = function(collection, iterator) {
    //test if collection is array
    if (Array.isArray(collection)) {
      for (var i=0; i<collection.length; i++) {
        iterator(collection[i], i, collection);    
      }      
    //otherwise treat as object  
    } else {
      for (var j in collection) {
        iterator(collection[j], j, collection);
      }
    }
  };*/

  _.each = function(collection, iterator) {
    //array
    if (Array.isArray(collection)) {
      for (var i=0; i<collection.length; i++)
        iterator(collection[i], i, collection);
    } else {
      for (var i in collection) {
        iterator(collection[i], i, collection);
      }
    }

    //object

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  /*_.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };*/
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var location=-1;
    _.each(array, function(val, key) {
      if (val===target) {
        location===-1 ? location=key : location=location;
      }
    });
    return location;
  };

  // Return all elements of an array that pass a truth test.
  /*_.filter = function(collection, test) {
    var results = [];

    _.each(collection, function(item, index) {
      if (test(item)) {
        results.push(item);
      }
    });

    return results;
  };*/
  _.filter = function(collection, test) {
    var results=[];
    _.each(collection, function(val) {
      if (test(val)) {
        results.push(val);
      }
    });
    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  /*_.reject = function(collection, test) {
    var results=[];

    _.each(collection, function(item, index) {
      if (!test(item)) {
        results.push(item);
      }
    });

    return results;
  };*/
  _.reject = function(collection, test) {
    var results=[];
    _.each(collection, function(val) {
      if (!test(val)) {
        results.push(val);
      }
    });
    return results;
  };

  // Produce a duplicate-free version of the array.
  /*_.uniq = function(array) {
    var results = [];

    _.each(array, function(item, index) {
      if (_.indexOf(results, item)===-1) {
        results.push(item);
      }
    })
    return results;
  };*/
  _.uniq = function(array) {
    var results=[];
    _.each(array, function(val) {
      if (_.indexOf(results, val)===-1) {
        results.push(val);
      }
    });
    return results;
  };

  // Return the results of applying an iterator to each element.
  /*_.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results=[];

    _.each(collection, function(val, key) {
      results.push(iterator(val, key));
    });

    return results;
  };*/
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results=[];
    _.each(collection, function(val, key, collection) {
      results.push(iterator(val, key, collection));
    });
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  /*_.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };*/
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(v, k, collection) {
      return v[key];
    });


  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  /*_.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(val) {
      if (typeof(functionOrKey)==='function') {
        return functionOrKey.apply(val, args);
      } else {
        return val[functionOrKey].apply(val, args);
      }
    });
  };*/
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(val) {
      if (typeof(functionOrKey)==='function') {
        return functionOrKey.apply(val, args);
      } else {
        return val[functionOrKey].apply(val, args);
      }
    });
  };

  // Reduces an array of object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  /*_.reduce = function(collection, iterator, accumulator) {
    var tot = accumulator || 0;
    _.each(collection, function(val) {
      tot = iterator(tot, val);
    });
    return tot;
  };*/

  _.reduce = function(collection, iterator, accumulator) {
    accumulator = accumulator || 0;
    _.each(collection, function(val, key, collection) {
      accumulator=iterator(accumulator, val);
    });
    return accumulator;

  };

  // Determine if the array or object contains a given value (using `===`).
  /*_.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };*/
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(test, val) {
      if (!test) {
        return target===val;
      } else {
        return true;
      }
    });
  };


  // Determine whether all of the elements match a truth test.
  /*_.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    var iterator = iterator || _.identity;
    return _.reduce(collection, function(soFar, item) {
      if (soFar) {
        return !!iterator(item);
      } else {
        return false;
      }
    }, true);
  };*/
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    var iterator=iterator || _.identity;
    return _.reduce(collection, function(test, val) {
      if (test) {
        return !!iterator(val);
      } else {
        return false;
      }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  /*_.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    var iterator = iterator || _.identity;
    // Handle empty sets; there is probably a more elegant way to do this.
    if (collection.length) {
      return _.reduce(collection, function(soFar, item) {
        if (soFar) {
          return true;
        } else {
          return !!iterator(item);
        }
      }, false);
    };
    return false;
  };*/
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    var iterator=iterator||_.identity;
    return collection.length===0 ? false : _.reduce(collection, function(test, val) {
      if (!test) {
        return !!iterator(val);
      } else {
        return true;
      }
    }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  /*_.extend = function(obj) {
    // pull out the additional args into an array
    var args = Array.prototype.slice.call(arguments);
    var newProps=args.slice(1, args.length);

    _.each(newProps, function(newObj) {
      _.each(newObj, function(val, key) {
        obj[key]=val;
      });
    });
    return obj;
  };*/
  _.extend = function(obj) {
    // pull out the additional args into an array
    var newObjs=Array.prototype.slice.call(arguments, 1);

    _.each(newObjs, function(otherObj) {
      _.each(otherObj, function(val, key) {
        obj[key]=val;
      });
    });

    return obj;

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  /*_.defaults = function(obj) {
    var args = Array.prototype.slice.call(arguments);
    var newProps=args.slice(1, args.length);

    _.each(newProps, function(newObj) {
      _.each(newObj, function(val, key) {
        if (!(key in obj)) {
          obj[key]=val;
        }
      });
    });
    return obj;
  };*/
  _.defaults = function(obj) {
    var newProps=Array.prototype.slice.call(arguments, 1);

    _.each(newProps, function(newObj) {
      _.each(newObj, function(val, key) {
        if (obj[key]===undefined) {
          obj[key]=val;
        }
      });
    });

    return obj;

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  /*_.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };*/
  _.once = function(func) {
    var alreadyCalled=false;
    var answer;
    return function() {
      if (!alreadyCalled) {
        answer=func.apply(this, arguments);
        alreadyCalled=true;
      }

      return answer;
    };

  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  /*_.memoize = function(func) {
    var results = {};

    return function() {
      var args=Array.prototype.slice.call(arguments);
      if (!(args in results)) {
        results[args] = func.apply(this, args);
      }
      return results[args];
    };
  };*/
  _.memoize = function(func) {
    var answers={};
    return function() {
      var args=Array.prototype.slice.call(arguments);
      if(answers[args]===undefined) {
        answers[args]=func.apply(this, args);
      }

      return answers[args];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  /*_.delay = function(func, wait) {
    var args=Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      func.apply(this, args);
    }, wait);
  };*/
  _.delay = function(func, wait) {
    var args=Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  /*_.shuffle = function(array) {
    var newArr=Array.prototype.slice.call(array);
    //return newArr.sort(function() {
      //return Math.floor(Math.random() * (1 - -1 +1) -1);
    //});
    // implement Fisher-Yates shuffle
    var index=newArr.length;
    var tempA, tempB;
    while (index) {
      tempA = Math.floor(Math.random() * index);
      index--;
      // swap values
      tempB=newArr[index];
      newArr[index]=newArr[tempA];
      newArr[tempA]=tempB;
    };

    return newArr;

  };*/
  _.shuffle = function(array) {
    var newArray=array.slice(0);
    var temporaryValue;
    var randomIndex;

    for (var index = newArray.length; index>0; index--) {
      randomIndex = Math.floor(Math.random() * index);

      temporaryValue = newArray[index];
      newArray[index] = newArray[randomIndex];
      newArray[randomIndex] = temporaryValue;
    }

    return newArray;

  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    //apply iterator to collection
    
    //sort by key
    if (typeof iterator==='string') {
      return collection.sort(function(a, b) {
        if (a[iterator]===undefined) {
          return 1;
        } else {
          return (a[iterator]-b[iterator]);
        }
      });
    } else { //sort by function
      var iterated=[];
      var newCollection=[];
      _.each(collection, function(val) {
        iterated.push([val, iterator(val)]);
      });

      iterated.sort(function(a, b) {
        /*
        if (a[1]===undefined) {
          return 1;
        } else {
          return a[1]-b[1];
        }*/
        if (a[1] !== b[1]) {
          if (a[1] > b[1] || a[1] === void 0) return 1;
          if (a[1] < b[1] || b[1] === void 0) return -1;
        }
      });
      _.each(iterated, function(val) {
        newCollection.push(val[0]);
      });
      return newCollection;
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var results=[];
    var args=Array.prototype.slice.call(arguments);
    _.each(args, function(arr) {
      _.each(arr, function(val, index) {
        if (results[index]===undefined) {
          results.push([]);
        }
        results[index].push(val);
      });
    });

    return results;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
