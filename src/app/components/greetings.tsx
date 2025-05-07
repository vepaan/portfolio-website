'use client'

import React, {useState, useEffect} from 'react'

export default function Greetings() {
    const [greeting, setGreeting] = useState<string>();
    const [showCursor, setShowCursor] = useState<boolean>(true);
    const greetings = ["Hello", "Hola", "Bonjour"]

    useEffect(() => {
        let i = 0;
        let j = 0;
        let curr = ""
        let back = false
        let time = 200

        const interval = setInterval(() => {
            if (back) {
                curr = curr.substring(0, curr.length-1)
                setGreeting(curr)
                if (curr == "") {
                    i = (i + 1) % greetings.length
                    j = 0
                    back = false
                    curr = ""
                    time = 200
                }
            } else {
                curr += greetings[i][j]
                setGreeting(curr)
                j++
                if (j == greetings[i].length) {
                    back = true
                    time = 100
                }
            }
        }, time)

        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev)
        }, 1200)

        return () => {
            clearInterval(interval)
            clearInterval(cursorInterval)
        }

    }, [])

    return (
        <p>{greeting}{showCursor && "|"}</p>
    )
}