self.onmessage = async (event) => {
    let output = ""

    console.log = function(...args) {
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
            })
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
