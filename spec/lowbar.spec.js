/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar.js'));
const sinon = require('sinon');


describe('_', () => {
	'use strict';

	it('is an object', () => {
		expect(_).to.be.an('object');
	});

	describe('#identity', () => {
		it('is a function', () => {
			expect(_.identity).to.be.a('function');
		});

		it('returns exactly what it is given', () => {
			const input = 'hello';
			expect(input === _.identity(input)).to.equal(true);
		});
	});

	describe('#first', () => {
		it('is a function', () => {
			expect(_.first).to.be.a('function');
		});

		it('returns the first element of an array if no 2nd argument is provided', () => {
			const actual = _.first([1, 2, 3]);
			const expected = 1;
			expect(actual).to.equal(expected);
		});

		it('returns the first n elements of an array', () => {
			const actual = _.first([1, 2, 3], 2);
			const expected = [1, 2];
			expect(actual).to.eql(expected);
		});
	});

	describe('#last', () => {
		it('is a function', () => {
			expect(_.last).to.be.a('function');
		});

		it('returns the last element of an array if no 2nd argument is provided', () => {
			const actual = _.last([1, 2, 3]);
			const expected = 3;
			expect(actual).to.equal(expected);
		});

		it('returns the last n elements of an array', () => {
			const actual = _.last([1, 2, 3], 2);
			const expected = [2, 3];
			expect(actual).to.eql(expected);
		});
	});

	describe('#each', () => {
		it('is a function', () => {
			expect(_.each).to.be.a('function');
		});

		it('should return the original list', () => {
			const spy = sinon.spy();
			expect(_.each([1, 2, 3], spy)).to.eql([1, 2, 3]);
		});

		it('should call the iteratee for as many elements as there are in the ARRAY', () => {
			const spy = sinon.spy();
			_.each([1, 2, 3], spy);
			expect(spy.callCount).to.equal(3);
		});

		it('should call the iteratee for as many elements as there are in the OBJECT', () => {
			const spy = sinon.spy();
			_.each({one: 1, two: 2}, spy);
			expect(spy.callCount).to.equal(2);
		});
	});

	describe('#indexOf', () => {
		it('return the first index where the value can be found', () => {
			expect(_.indexOf([1, 2, 'a'], 'a')).to.equal(2);
		});

		it('returns -1 if value cannot be found', () => {
			expect(_.indexOf([1, 2, 3], 4)).to.equal(-1);
		});

		it('returns -1 when invalid inputs are given', () => {
			expect(_.indexOf()).to.equal(-1);
		});

		it('uses a faster binary search if isSorted is true', () => {
			expect(_.indexOf([1, 2, 3, 4, 5, 6, 7, 8], 7, true)).to.equal(6);
		});
	});

	describe('#filter', () => {
		it('is a function', () => {
			expect(_.filter).to.be.a('function');
		});

		it('expects list to be an array', () => {
			const actual = _.filter([1, 2, 3], () => { });
			expect(actual).to.be.an('array');
		});

		it('expects callback to be called on each element of passed array', () => {
			const spy = sinon.spy();
			_.filter(['A', 'B', 'C'], spy);
			expect(spy.callCount).to.equal(3);
		});

		it('expects to return modified array containing elements that have passed predicate\'s truth test', () => {
			const actual = _.filter([1, 2, 3, 4, 5, 6], (num) => { return num % 2 == 0; });
			const expected = [2, 4, 6];
			expect(actual).to.eql(expected);
		});
	});

	describe('#reject', () => {
		it('is a function', () => {
			expect(_.reject).to.be.a('function');
		});

		it('returns elements in the array that return false by the callback', () => {
			const actual = _.reject([1, 2, 3, 4, 5, 6,], (element) => {
				return element % 2 !== 0;
			});
			const expected = [1, 3, 5];
			expect(actual).to.eql(expected);
		});

		it('runs it\'s callback function as many times as there are elements in the array it is passed', () => {
			const spy = sinon.spy();
			_.reject([1, 2, 3, 4, 5, 6], spy);
			expect(spy.callCount).to.equal(6);
		});
	});

	describe('#map', () => {
		it('is a function', () => {
			expect(_.map).to.be.a('function');
		});

		it('returns a new ARRAY where each element has been passed to the transformative iteratee function', () => {
			const actual = _.map([1, 2, 3], (ele) => { return ele * 2; });
			const expected = [2, 4, 6];
			expect(actual).to.eql(expected);
		});

		it('returns a new OBJECT array where each element has been passed to the transformative iteratee function', () => {
			const actual = _.map({one: 1, two: 2}, (ele) => { return ele * 2; });
			const expected = [2, 4];
			expect(actual).to.eql(expected);
		});

		it('returns an empty array for invalid inputs', () => {
			expect(_.map()).to.eql([]);
			expect(_.map(1)).to.eql([]);
			expect(_.map(NaN)).to.eql([]);
		});
	});

	describe('#pluck', () => {
		it('is a function', () => {
			expect(_.pluck).to.be.a('function');
		});
		it('returns a list of property values which adhere to the passed in key', () => {
			const actual = _.pluck([
				{name: 'Tony', age: 30},
				{name: 'Mikasa', age: 27},
				{name: 'Eren', age: 26},
				{other: 'Hello'}],
				'name'
			);
			const expected = ['Tony', 'Mikasa', 'Eren'];
			expect(actual).to.eql(expected);
		});

		it('manages invalid inputs returning an empty array', function () {
			expect(_.pluck()).to.eql([]);
			expect(_.pluck(1)).to.eql([]);
			expect(_.pluck(NaN)).to.eql([]);
		});
	});

	describe('#reduce', () => {
		it('is a function', () => {
			expect(_.reduce).to.be.a('function');
		});

		it('reduces a list down into a single NUMERIC value', () => {
			const actual = _.reduce([1, 2, 3, 4, 5], (acc, ele) => {
				return acc += ele;
			}, 0);
			const expected = 15;
			expect(actual).to.equal(expected);
		});

		it('reduces a list down into a single STRING value', () => {
			const actual = _.reduce(['why', 'hello', 'there'], (acc, ele) => {
				return acc += ele;
			}, '');
			const expected = 'whyhellothere';
			expect(actual).to.equal(expected);
		});

		it('reduces a list down into a single OBJECT', () => {
			const actual = _.reduce(['a', 'b', 'c', 'd', 'e'], (acc, ele, i) => {
				acc[i] = ele;
				return acc;
			}, {});
			const expected = {
				0: 'a',
				1: 'b',
				2: 'c',
				3: 'd',
				4: 'e'
			};
			expect(actual).to.eql(expected);
		});

		it('reduces a list down into a single ARRAY', () => {
			const actual = _.reduce({one: 1, two: 2, three: 3}, (acc, ele) => {
				acc.push(ele);
				return acc;
			}, []);
			const expected = [1, 2, 3];
			expect(actual).to.eql(expected);
		});
	});

	describe('#contains', () => {
		it('is a function', () => {
			expect(_.contains).to.be.a('function');
		});

		it('returns TRUE if the value is present in the list', () => {
			const actual = _.contains([1, 2, 3], 1);
			const expected = true;
			expect(actual).to.equal(expected);
		});

		it('begins searching at given fromIndex', () => {
			const actual = _.contains([1, 2, 3, 4, 5], 2, 2);
			const expected = false;
			expect(actual).to.equal(expected);
		});

		it('returns false when invalid inputs are given', () => {
    expect(_.contains()).to.equal(false);
    expect(_.contains(1)).to.equal(false);
    expect(_.contains(NaN)).to.equal(false);
  });
	});

	describe('#every', () => {
		it('is a function', () => {
			expect(_.every).to.be.a('function');
		});

		it('returns false if all the values in the ARRAY do not pass the predicate truth test', () => {
			const actual = _.every([2, 'hello', 4, 5], (ele) => {
				return typeof ele === 'number';
			});
			const expected = false;
			expect(actual).to.equal(expected);
		});

		it('returns true if all the values in the OBJECT pass the predicate truth test', () => {
			const actual = _.every({one: 1, two: 2}, (ele) => {
				return typeof ele === 'number';
			});
			const expected = true;
			expect(actual).to.equal(expected);
		});

		it('returns false for invalid inputs', () => {
			expect(_.every()).to.eql(false);
			expect(_.every(1)).to.eql(false);
			expect(_.every(NaN)).to.eql(false);
		});	
	});

	describe('#some', () => {
		it('is a function', () => {
			expect(_.some).to.be.a('function');
		});

		it('returns true if any of the values in an ARRAY pass the predicate truth test', () => {
			const actual = _.some([2, 'hello', 4, 5], (ele) => {
				return typeof ele === 'string';
			});
			const expected = true;
			expect(actual).to.equal(expected);
		});

		it('returns true if any of the values in an OBJECT pass the predicate truth test', () => {
			const actual = _.some({one: 1, two: 'two', three: 3}, (ele) => {
				return typeof ele === 'boolean';
			});
			const expected = false;
			expect(actual).to.equal(expected);
		});

		it('returns false for invalid inputs', () => {
			expect(_.some()).to.eql(false);
			expect(_.some(1)).to.eql(false);
			expect(_.some(NaN)).to.eql(false);
		});	
	});

	describe('#extend', () => {
		it('is a function', () => {
			expect(_.extend).to.be.a('function');
		});

		it('returns the destination when no sources are provided', () => {
			expect(_.extend({'a': 1, 'b': 2})).to.eql({'a': 1, 'b': 2});
  });

		it('returns an extended object using the properties of the source object/s', () => {
			const actual = _.extend({name: 'Tony'}, {middleName: 'Antelo'});
			const expected = {name: 'Tony', middleName: 'Antelo'};
			expect(actual).to.eql(expected);
		});

		it('handles invalid inputs', () => {
			expect(_.extend()).to.equal(undefined);
			expect(_.extend(false)).to.equal(false);
			expect(_.extend([1])).to.eql([1]);
		});
	});

	describe('#defaults', () => {
		it('is a function', () => {
			expect(_.defaults).to.be.a('function');
		});

		it('returns the object if no defaults is given', () => {
			const actual = _.defaults({name: 'foo'});
			const expected = {name: 'foo'};
			expect(actual).to.eql(expected);
		});

		it('overwrites default object/s first property value with the new value provided by the object argument', () => {
			const object = {flavour: 'cherry'};
			const actual = _.defaults(object, {flavour: 'vanilla', price: 2.40});
			const expected = {flavour: 'cherry', price: 2.40};
			expect(actual).to.eql(expected);
		});

		it('handles invalid inputs', () => {
			expect(_.defaults()).to.equal(undefined);
			expect(_.defaults(false)).to.equal(false);
			expect(_.defaults([1])).to.eql([1]);
		});
	});

	describe('#indexOfWithBinary', () => {
		it('is a function', () => {
			expect(_.indexOfWithBinary).to.be.a('function');
		});

		it('returns the index at which value can be found in the array', () => {
			const actual = _.indexOfWithBinary([1, 2, 3, 4, 5], 3);
			const expected = 2;
			expect(actual).to.equal(expected);
		});

		it('returns -1 if array value cannot be found', () => {
			const actual = _.indexOfWithBinary([1, 2, 3, 4, 5], 8);
			const expected = -1;
			expect(actual).to.equal(expected);
		});

		it('performs a binary search if "isSorted" is passed as "true"', () => {
			const actual = _.indexOfWithBinary([1, 2, 3, 4, 5], 1, true);
			const expected = 0;
			expect(actual).to.equal(expected);
		});
	});

	describe('#once', () => {
		it('is a function', () => {
			expect(_.once).to.be.a('function');
		});

		it('returns a function that does exactly the same as the original function', () => {
			const mul = (a, b) => { return a * b; };
			const mulOnce = _.once(mul);
			expect(mulOnce(45, 67)).to.equal(mul(45, 67));
		});

		it('the returned function can only be called once', () => {
			const spy = sinon.spy();
			const spyOnce = _.once(spy);
			spyOnce();
			spyOnce();
			spyOnce();
			spyOnce();
			expect(spy.callCount).to.equal(1);
		});

		it('handles invalid inputs', () => {
			expect(_.once()).to.equal(undefined);
			expect(_.once(false)).to.equal(false);
			expect(_.once([1])).to.eql([1]);
		});
	});

	describe('#memoize', () => {
		it('is a function', () => {
			expect(_.memoize).to.be.a('function');
		});

		it('should properly return a previously cached result', () => {
			const func = (n) => { return n * 2; };
			const memFunc = _.memoize(func);
			memFunc(2);
			const actual = memFunc(2);
			const expected = actual;

			expect(actual).to.equal(expected);
		});

		it('should properly return when there is no matching key stored in the cache', () => {
			const func = (n) => { return n * 2; };
			const memFunc = _.memoize(func);
			const actual = memFunc(4);
			const expected = 8;

			expect(actual).to.equal(expected);
		});

		it('handles invalid inputs', () => {
			expect(_.memoize()).to.equal(undefined);
			expect(_.memoize(false)).to.equal(false);
			expect(_.memoize([1])).to.eql([1]);
		});
	});

	describe('#delay', () => {
		it('calls the function only after a set time', () => {
			const spy = sinon.spy();
			const clock = sinon.useFakeTimers();
			_.delay(spy, 100);
			clock.tick(99);
			expect(spy.callCount).to.equal(0);
			clock.tick(2);
			expect(spy.callCount).to.equal(1);
		});

		it('calls the function with the correct arguments', () => {
			const spy = sinon.spy();
			const clock = sinon.useFakeTimers();
			_.delay(spy, 100, 'hello', 'world');
			clock.tick(100);
			expect(spy.calledWith('hello', 'world'));
		});

		it('handles invalid inputs', () => {
			expect(_.delay()).to.equal(undefined);
			expect(_.delay(false)).to.equal(false);
			expect(_.delay([1])).to.eql([1]);
		});
	});

	describe('#shuffle', () => {
		it('is a function', () => {
			expect(_.shuffle).to.be.a('function');
		});

		it('should return a shuffled copy of the array', () => {
			const actual = _.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
			const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			expect(actual).to.not.eql(expected);
		});

		it('should return a shuffled copy of the object', () => {
			const actual = _.shuffle({one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10});
			const expected = {one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10};
			expect(actual).to.not.eql(expected);
		});

		it('handles invalid inputs', () => {
			expect(_.shuffle()).to.equal(undefined);
			expect(_.shuffle(false)).to.equal(false);
			expect(_.shuffle([1])).to.eql([1]);
		});
	});

	describe('#sortBy', () => {
		it('sorts by iteratee', () => {
			expect(_.sortBy([1, 2, 3, 4, 5, 6], (num) => { return Math.sin(num); })).to.eql([5, 4, 6, 3, 1, 2]); });

		it('sorts by property', () => {
			const obj = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
			const expected = [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}];
			expect(_.sortBy(obj, 'name')).to.eql(expected);
		});

		it('handles invalid inputs', () => {
			expect(_.sortBy()).to.equal(undefined);
			expect(_.sortBy(false)).to.equal(false);
			expect(_.sortBy([1])).to.eql([1]);
		});
	});

	describe('#zip ', () => {
		it('is a function', () => {
			expect(_.zip).to.be.a('function');
		});

		it('merges arrays together at their corresponding indexes', () => {
			const actual = _.zip(['Jim', 'John', 'Jimmy'], [60, 70, 80], [true, false, true]);
			const expected = [['Jim', 60, true], ['John', 70, false], ['Jimmy', 80, true]];
			expect(actual).to.eql(expected);
		});

		it('handles invalid inputs', () => {
			expect(_.zip()).to.equal(undefined);
			expect(_.zip(false)).to.equal(false);
		});		
	});

	describe('#sortedIndex', () => {
		it('finds the index where the value should be inserted into an array to maintain order', () => {
			expect(_.sortedIndex([1, 2, 4, 5, 6, 7], 3)).to.equal(2);
			expect(_.sortedIndex([3, 4, 5], 1)).to.equal(0);
			expect(_.sortedIndex([1, 2, 4, 5, 6, 7], 8)).to.equal(6);
		});

		it('works for objects when the iteratee is the name of the property to search for', () => {
			expect(_.sortedIndex([{a: 1}, {a: 2}, {a: 4}], {a: 3}, 'a')).to.equal(2);
		});

		it('handles invalid inputs', () => {
			expect(_.sortedIndex()).to.equal(undefined);
			expect(_.sortedIndex(false)).to.equal(false);
		});
	});

	describe('#throttle', () => {
		it('returns a function that acts as a copy of the function passed to it', () => {
			const spy = sinon.spy();
			const throttledFunc = _.throttle(spy, 100);
			expect(spy.callCount).to.equal(0);
			throttledFunc('hello');
			expect(spy.callCount).to.equal(1);
			expect(spy.args).to.eql([['hello']]);
		});

		it('only allows the returned function to be called (wait) milliseconds after the last call', () => {
			const spy = sinon.spy();
			const throttledFunc = _.throttle(spy, 100);
			const clock = sinon.useFakeTimers();
			clock.tick(100);
			expect(spy.callCount).to.equal(0);
			throttledFunc();
			expect(spy.callCount).to.equal(1);
			throttledFunc();
			expect(spy.callCount).to.equal(1);
			clock.tick(100);
			throttledFunc();
			expect(spy.callCount).to.equal(2);
			throttledFunc();
			expect(spy.callCount).to.equal(2);
			clock.tick(50);
			throttledFunc();
			expect(spy.callCount).to.equal(2);
			clock.tick(60);
			throttledFunc();
			expect(spy.callCount).to.equal(3);
		});

		it('handles invalid inputs', () => {
			expect(_.throttle()).to.equal(undefined);
			expect(_.throttle(false)).to.equal(false);
			expect(_.throttle([1])).to.eql([1]);
		});
	});
});