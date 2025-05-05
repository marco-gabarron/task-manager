import { useState } from 'react'
import { useEffect } from 'react'
import Header from './Header'
import Button from './Button'

function Tasks() {
    const [count, SetCounter] = useState(0)
    const [message, SetMessage] = useState("Counter is Zero")

    useEffect(() => {
        SetMessage(count === 0 ? "Counter is Zero" : "Counter is NOT zero");
    }, [count]);

    function handleButtonClickPlus() {
        SetCounter(() => count + 1)
    }

    function handleButtonClickMinus() {
        SetCounter(() => count - 1)
    }

    function handleButtonClickReset() {
        SetCounter(0)
    }

    return (
    // requires a div but only one as JSX rule
    <div>
        <Header text={count} />
        <Button text="+" onClick={handleButtonClickPlus} />
        <Button text="-" onClick={handleButtonClickMinus} />
        <Button text="Reset" onClick={handleButtonClickReset} />
        <Header text={message} />
    </div>
);
}

export default Tasks