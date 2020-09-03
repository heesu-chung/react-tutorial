import React, { useState, useReducer } from 'react'

//reducer 함수 만들기
// 값의 타입은 무엇이든 될 수 있다.

function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            throw new Error('Unhandled action');//console에서 에러 발생 메시지
    }
}
//useReducer hook 사용해보자



export default function Counter() {
    //현재 상태 먼저 들어오게 될 것
    // 두번째 값으로 dispatch 나오게 될 것
    // dispatch - action을 발생시킨다.
    const [number, dispatch] = useReducer(reducer, 0);

    const onIncrease = () => {
        dispatch({
            type: 'INCREMENT'
        })
    };

    const onDecrease =() => {
        dispatch({
            type: 'DECREMENT'
        })
    };




    //const [number, setNumber] = useState(0);
    // 배열 비구조화 할당 - 비구조 분해
    // number: 현재 상태 
    // setNumber: 상태를 바꾸는 함수

    return (
        <>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
            {/* Click Event */}
        </>
    )
}
