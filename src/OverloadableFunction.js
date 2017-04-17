exports = module.exports = class OverloadableFunction extends Function {
	/**
	 * Creates an overloadable function.
	 * Overloading is based on the number of parameters.
	 *
	 * @return {Function}
	 */
	constructor() {
		super()

		let self = function () {
			if (self._functionMap.has(arguments.length)) {
				return self._functionMap.get(arguments.length).apply(this, arguments)
			}
		}

		// Is a Number => Function map.
		self._functionMap = new Map()
		
		Object.setPrototypeOf(self, OverloadableFunction.prototype)

		return self
	}

	/**
	 * Registers an overloading for this function.
	 *
	 * @param {Function} callable
	 * The overloading implementation.
	 *
	 * @example
	 * let f = new OverloadableFunction()
	 * f.overload(function (one) {
	 *    console.log('With one param')
	 * })
	 * f.overload(function (one, two) {
	 *    console.log('With two params')
	 * })
	 * f(1)    // 'With one param'
	 * f(1, 2) // 'With two params'
	 */
	overload(callable) {
		this._functionMap.set(callable.length, callable)
	}
}
