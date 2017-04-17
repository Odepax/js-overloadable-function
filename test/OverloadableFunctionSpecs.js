const assert = require('assert')
const OverloadableFunction = require('../src/OverloadableFunction.js')

describe('OverloadableFunction', function () {
	it('should call the right implementation depending on parameters count.', function () {
		let f = new OverloadableFunction()

		f.overload(function ()        { return 'No param' })
		f.overload(function (a)       { return 'One param' })
		f.overload(function (a, b)    { return 'Two params' })
		f.overload(function (a, b, c) { return 'Three params' })

		assert.equal(f(),         'No param')
		assert.equal(f(42),       'One param')
		assert.equal(f(8, 16),    'Two params')
		assert.equal(f(1, 2, 18), 'Three params')
	})

	it('should forward `this` when put into a namespace.', function () {
		let o = {}
		let ns = { f: new OverloadableFunction() }

		ns.f.overload(function () { return this })

		assert.ok(ns.f() == ns, 'ns.f() == ns')
		assert.ok(ns.f.apply(o) == o, 'ns.f.apply(o) == o')
	})

	it('should forward `this` when put into global space.', function () {
		let o = {}
		let f = new OverloadableFunction()

		f.overload(function () { return this })

		assert.ok(f() == global, 'f() == global')
		assert.ok(f.apply(o) == o, 'f.apply(o) == o')
	})

	it('should forward `this` when called with `.bind()`.', function () {
		let o = {}
		let f = new OverloadableFunction()

		f.overload(function () { return this })

		let g = f.bind(o)

		assert.ok(g() == o, 'g() == o')
	})
})
