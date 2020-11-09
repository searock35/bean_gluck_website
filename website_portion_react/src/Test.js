import React from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import Validate from './tools/validation/Validate'




function Test() {
    let MyVal = new Validate()
    MyVal.addBaseField("my_name",   {"max_length": 5,
                                     "min_length": 1
                                    })
    const [state, setState] = MyVal.useValidatedState()
    const buttonHandler = (e) => {
        setState({"my_name": "Bobbbyyyy"})
    }

    console.log(state)

    return (
        <div>
            <Button onClick={buttonHandler}>Test</Button>
        </div>
    )
}

export default Test
