self.onmessage = async (event) => {
    let output = ""
    const code = event.data.queryMethodArguments[0]

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
        self.postMessage({ queryMethodArguments: [output, false] })
    }

    globalThis.print = function(arg) {
        console.log(JSON.stringify(arg, null, 2))
    }

    try {
        await eval(code)
    } catch(err) {
        console.log(err.toString())
    } finally {
        await new Promise(() => null)
    }

    self.postMessage({ queryMethodArguments: [output, true] })
}
