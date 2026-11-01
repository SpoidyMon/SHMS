import axios from 'axios'
import { useEffect, useState } from 'react'

const File = () => {
    const [name, setName] = useState(0)
    const [age, setAge] = useState(0)

    async function fetchabc() {
        const data = await fetch("https://reqres.in/api/users/2")


        return data
    }

    // useEffect( () => {
    //     const fn = async () => {
    //         const data = await axios.get("https://reqres.in/api/users/2")
    //         console.log(data)
    //     }

    //     fn();
    // }, [])

    useEffect(() => {
        const gj = async () => {
            const A = await fetchabc()
            console.log(A)
        }
        gj()
    }, []);


    
    return (
        <div>
            <button onClick={() => { setName((prev) => prev + 1) }}>change</button>

        </div>
    )
}

export default File
