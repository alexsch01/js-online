self.onmessage = (event) => {
  (async (code) => {
    let output = ""

    console.log = function(...args) {
      args = args.map(elem => {
          if(elem === undefined) {
              return 'undefined'
          } else if(typeof elem == 'object') {
              return JSON.stringify(elem)
          } else {
              return elem
          }
      })
      output += args.join(" ") + "\n"
      postMessage({ queryMethodArguments: [output, false] })
    }

    globalThis.print = function(arg) {
      console.log(JSON.stringify(arg, null, 2))
    }

    try {
      await eval(code)
    } catch(err) {
      console.log(err.toString())
    }

    postMessage({ queryMethodArguments: [output, true] })
  }).apply(self, event.data.queryMethodArguments)
}
