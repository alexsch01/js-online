self.onmessage = async (event) => {
    let output = ""

    const logFunc = function(space) {
        return function(...args) {
            if(space == 2) {
                args = [args[0]]
            }
            
            args = args.map(elem => {
                if(elem.constructor && elem.constructor.prototype.toString != 'function toString() { [native code] }') {
                    elem = elem.toString()
                }
                
                if(elem == null) {
                    return `${elem}`
                }
                
                if(typeof elem != 'object') {
                    if(space == 2) {
                        return JSON.stringify(elem)
                    } else {
                        return elem
                    }
                }
                
                return JSON.stringify(elem, (key, value) => {
                    if(typeof value != 'object' || value == null) {
                        return value
                    }
                    
                    if(value.constructor.name != 'Object') {
                        value.__constructor = value.constructor.name
                    }
                    
                    return value
                }, space)
            })
            output += args.join(" ") + "\n"
            self.postMessage({ output })
        }
    }

    console.log = logFunc(0)
    console.dir = logFunc(2)

    try {
        await eval(event.data.code)
    } catch(err) {
        console.log(err.toString())
    }
}
