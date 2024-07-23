self.onmessage = async (event) => {
{
    let output = ""

    const logFunc = function(space) {
        return function(...args) {
            if(space == 2) {
                args = [args[0]]
            }
            
            args = args.map(elem => {
                if(
                    elem != null &&
                    typeof elem.toString == 'function' &&
                    elem.toString.toString() != Object.toString.toString()
                ) {
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
                        value.__constructor = value.constructor.name || 'Generator'
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

    const dict = {}

    console.time = function(timer='default') {
        if(timer in dict) {
            throw new Error(`Timer '${timer}' already exists`)
        }

        dict[timer] = Date.now()
    }

    console.timeEnd = function(timer='default') {
        if(!(timer in dict)) {
            throw new Error(`Timer '${timer}' does not exist`)
        }

        console.log(`${timer}: ${Date.now() - dict[timer]} ms`)
    }
}

    try {
        await eval(event.data.code)
    } catch(err) {
        console.log(err.toString())
    }
}
