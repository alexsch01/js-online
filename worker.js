self.onmessage = async (event) => {
    let output = ""

    const logFunc = function(space, dirFunc) {
        return function(...args) {
            if(dirFunc) {
                args = [args[0]]
            }
            
            args = args.map(elem => {
                if(typeof elem == 'undefined') {
                    return 'undefined'
                }
                
                if(dirFunc && typeof elem == 'string') {
                    return JSON.stringify(elem)
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

    console.log = logFunc(0)
    console.dir = logFunc(2, true)

    try {
        await eval(event.data.code)
    } catch(err) {
        console.log(err.toString())
    }
}
