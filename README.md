# JavaScript Overloadable Functions

**With function overloading: no headache.**

```js
let findPersons = new TypedOverloadableFunction()

findPersons.overload([  ],         function ()  { console.log('Retrieving all persons...') })
findPersons.overload([ String ],   function (n) { console.log('Finding persons by name...') })
findPersons.overload([ Number ],   function (i) { console.log('Finding persons by id...') })
findPersons.overload([ Date ],     function (d) { console.log('Finding persons by birthdate...') })
findPersons.overload([ Function ], function (p) { console.log('Finding persons with a predicate...') })

findPersons("Jackson")    // 'Finding persons by name...'
findPersons(41)           // 'Finding persons by id...'
findPersons((person) => { // 'Finding persons with a predicate...'
	return person.id > 8000 && person.name.startsWith('O')
})
```

**Without overloading: lots of type checking conditions.**

```js
function findPersons(nameOrIdOrBirthdateOrPredicateOrUndefined) {
	if (typeof nameOrIdOrBirthdateOrPredicateOrUndefined == 'undefined') {
		console.log('Retrieving all persons...')
	} else if (typeof nameOrIdOrBirthdateOrPredicateOrUndefined == 'string') {
		console.log('Finding persons by name...')
	} else if (typeof nameOrIdOrBirthdateOrPredicateOrUndefined == 'number') {
		console.log('Finding persons by id...')
	} else if (typeof nameOrIdOrBirthdateOrPredicateOrUndefined == 'date') {
		console.log('Finding persons by birthdate...')
	} else if (typeof nameOrIdOrBirthdateOrPredicateOrUndefined == 'function') {
		console.log('Finding persons with a predicate...')
	}
}
```

**Or worse: naming dispersal.**

```js
function findAllPersons()            { console.log('Retrieving all persons...') })
function findPersonsByName(n)        { console.log('Finding persons by name...') })
function findPersonsById(i)          { console.log('Finding persons by id...') })
function findPersonsByBirthdate(d)   { console.log('Finding persons by birthdate...') })
function findPersonsWithPredicate(p) { console.log('Finding persons with a predicate...') })
```
