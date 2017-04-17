exports = module.exports = class TypedOverloadableFunction extends Function {
	/**
	 * Creates an overloadable function.
	 * Overloading is based on the number and types of parameters.
	 *
	 * @return {Function}
	 */
	constructor() {
		super()

		let self = function () {
			for (let [k, v] of self._functionMap.entries()) {
				if (TypedOverloadableFunction._areOfTypes(k, arguments)) {
					return v.apply(this, arguments)
				}
			}
		}

		// Is a type list as Array<Object> => Function map.
		self._functionMap = new Map()
		
		Object.setPrototypeOf(self, TypedOverloadableFunction.prototype)

		return self
	}

	/**
	 * Registers an overloading for this function.
	 *
	 * @param {Array} types
	 * The types for each parameter.
	 * 
	 * @param {Function} callable
	 * The overloading implementation.
	 *
	 * @example
	 * let f = new TypedOverloadableFunction()
	 * f.overload([ Number, Number ], function (a, b) {
	 *    return a * b
	 * })
	 * f.overload([ String, Number ], function (s, n) {
	 *    let r = ''
	 *    while (--n >= 0) { r += s }
	 *    return r
	 * })
	 * f(12, 3) // 36
	 * f('wuw', 3) // 'wuwwuwwuw'
	 */
	overload(types, callable) {
		this._functionMap.set(types, callable)
	}

	/** @private */
	static _areOfTypes(types, values) {
		if (types.length !== values.length) {
			return false
		}

		for (let i in types) {
			if (!(TypedOverloadableFunction._isOfType(types[i], values[i]))) {
				return false
			}
		}

		return true
	}

	/** @private */
	static _isOfType(type, value) {
		if (typeof type == "string") {
			return typeof value == type
		}

		return value.constructor == type || value instanceof type
	}
}
