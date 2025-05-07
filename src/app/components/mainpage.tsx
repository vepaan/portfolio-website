'use client'

import React, {useState, useEffect, useRef} from 'react';
import ThreeDSim from './3dsim';

export default function MainPage() {
    const [greeting, setGreeting] = useState<string>();
    const [showCursor, setShowCursor] = useState<boolean>(true);
    const greetings = ["Hello", "Hola", "Bonjour"]

    useEffect(() => {
        let i = 0;
        let j = 0;
        let curr = ""
        let back = false

        const interval = setInterval(() => {
            if (back) {
                curr = curr.substring(0, curr.length-1)
                setGreeting(curr)
                if (curr == "") {
                    i = (i + 1) % greetings.length
                    j = 0
                    back = false
                    curr = ""
                }
            } else {
                curr += greetings[i][j]
                setGreeting(curr)
                j++
                if (j == greetings[i].length) {
                    back = true
                }
            }
        }, 500)

        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev)
        }, 600)

        return () => {
            clearInterval(interval)
            clearInterval(cursorInterval)
        }

    }, [])

    return (
        <div>
            <p>{greeting}{showCursor && "|"}</p>
            <ThreeDSim />
        </div>
    )
}