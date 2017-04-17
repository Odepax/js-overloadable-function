const assert = require('assert')
const TypedOverloadableFunction = require('../src/TypedOverloadableFunction.js')

describe('TypedOverloadableFunction', function () {
	it('should call the right implementation depending on parameters types.', function () {
		let f = new TypedOverloadableFunction()

		f.overload([],                 function () { return 'No param' })
		f.overload([ String, Number ], function () { return 'String, Number' })
		f.overload([ Number, Number ], function () { return 'Number, Number' })
		f.overload([ Array,  Number ], function () { return 'Array,  Number' })

		assert.equal(f(),               'No param')
		assert.equal(f('wuw', 3),       'String, Number')
		assert.equal(f(14, 2),          'Number, Number')
		assert.equal(f([ 1, 5, 3 ], 8), 'Array,  Number')
	})

	it('should forward `this` when put into a namespace.', function () {
		let o = {}
		let ns = { f: new TypedOverloadableFunction() }

		ns.f.overload([], function () { return this })

		assert.ok(ns.f() == ns, 'ns.f() == ns')
		assert.ok(ns.f.apply(o) == o, 'ns.f.apply(o) == o')
	})

	it('should forward `this` when put into global space.', function () {
		let o = {}
		let f = new TypedOverloadableFunction()

		f.overload([], function () { return this })

		assert.ok(f() == global, 'f() == global')
		assert.ok(f.apply(o) == o, 'f.apply(o) == o')
	})

	it('should forward `this` when called with `.bind()`.', function () {
		let o = {}
		let f = new TypedOverloadableFunction()

		f.overload([], function () { return this })

		let g = f.bind(o)

		assert.ok(g() == o, 'g() == o')
	})
})
