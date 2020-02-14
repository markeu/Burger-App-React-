
function createFilterers() {
  const _filters = {
    ids: [],
    fns: {},
  }
  
  return {
    addFilter(name, fn) {
      _filters.ids.push(name)
      _filters.fns[name] = fn
    },
    removeFilter(name) {
      const index = _filters.ids.indexOf(name)
      if (index !== -1) _filters.splice(index, 1)
      delete _filters.fns[name]
    },
    filter(arr) {
      const filters = _filters.ids.map((id) => _filters.fns[id])
      return arr.reduce((acc, item) => {
        for (let index = 0; index < _filters.ids.length; index++) {
          const id = _filters.ids[index]
          const filter = _filters.fns[id]
          if (!filter(item)) {
            return acc
          }
        }
        return acc.concat(item)
      }, [])
    },
  }
}

const frogs = [
  {
    name: 'bobTheFrog',
    age: 2,
    gender: 'male',
    favoriteFood: 'fly',
    weight: 5,
  },
  {
    name: 'lisaTheFrog',
    age: 3,
    gender: 'female',
    favoriteFood: 'fly',
    weight: 1,
  },
  {
    name: 'sallyTheFrog',
    age: 10,
    gender: 'female',
    favoriteFood: 'caterpillar',
    weight: 20,
  },
  {
    name: 'mikeTheFrog',
    age: 1,
    gender: 'male',
    favoriteFood: 'worm',
    weight: 8,
  },
  {
    name: 'georgeTheFrog',
    age: 7,
    gender: 'male',
    favoriteFood: 'fly',
    weight: 28,
  },
  {
    name: 'kellyTheFrog',
    age: 3,
    gender: 'female',
    favoriteFood: 'ladybug',
    weight: 3,
  },
]

const filterer = createFilterers()

filterer.addFilter('fat-frogs', (frog) => {
  return frog.weight >= 8
})

filterer.addFilter('male-frogs', (frog) => {
  return frog.gender === 'male'
})

const filteredFrogs = filterer.filter(frogs)

console.log(filteredFrogs)

// let jane = {
//     name: "Jane"
//   };
//   let weakMap = new WeakMap([
//     [jane, 7]
//   ]);
 
//   console.log(weakMap.get(jane));

  let jane = {
    name: "Jane"
  };
  let john = {
    name: "john"
  };
  let weakMap = new WeakMap([
    [jane, 1]
  ]);
  weakMap.set(john, 2);
  weakMap.delete(jane)
  console.log(weakMap.has(john));