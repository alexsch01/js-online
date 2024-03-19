self.onmessage = async (event) => {
    let output = ""

    console.log = function(...args) {
        args = args.map(elem => {
            switch(typeof elem) {
                case 'undefined':
                    return 'undefined'
                case 'object':
                    return JSON.stringify(elem)
                default:
                    return elem
            }
        })
        output += args.join(" ") + "\n"
        self.postMessage({ output })
    }

    globalThis.print = function(arg) {
        console.log(JSON.stringify(arg, null, 2))
    }

    try {
        await eval(event.data.code)
    } catch(err) {
        console.log(err.toString())
    }
}
