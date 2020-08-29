import React, { useState } from 'react'

export default function Counter() {
    const [number, setNumber] = useState(0);
    // 배열 비구조화 할당 - 비구조 분해
    // number: 현재 상태 
    // setNumber: 상태를 바꾸는 함수

    return (
        <>
            <h1>{number}</h1>
            <button onClick={() => setNumber(number + 1)}>+1</button>
            <button onClick={() => setNumber(10)}>-1</button>
            {/* Click Event */}
        </>
    )
}
