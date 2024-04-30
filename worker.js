self.onmessage = async (event) => {
    let output = ""

    const logFuncWithSpace = function(space) {
        return function(...args) {
            args = args.map(elem => {
                if(typeof elem == 'undefined') {
                    return 'undefined'
                }
                
                if(typeof elem != 'object' || elem == null) {
                    return elem
                }
                
                return JSON.stringify(elem, (key, value) => {
                    if(typeof value != 'object' || value == null) {
                        return value
                    }
                    
                    if(value.constructor.name != 'Object') {
                        value.constructor = value.constructor.name
                    }
                    
                    return value
                }, space)
            })
            output += args.join(" ") + "\n"
            self.postMessage({ output })
        }
    }

    console.log = logFuncWithSpace(0)
    globalThis.print = logFuncWithSpace(2)

    try {
        await eval(event.data.code)
    } catch(err) {
        console.log(err.toString())
    }
}
