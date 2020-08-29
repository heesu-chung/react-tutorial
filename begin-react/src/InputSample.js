import React, { useState } from 'react'

export default function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: '',
    });
    const { name, nickname } = inputs;

    const onChange = (e) => {
        const { name, value } = e.target;
        
        // react에서 객체 업데이트 할 때 조금 다르다.
        // 기존 객체 복사해야 한다. 
        setInputs({
            ...inputs, // spread 문법
            [name]: value,
        });
    };
    const onReset = () => {
        setInputs({
            name: '',
            nickname: '',
        });
    };
    return (
        <div>
            <input 
                name="name" 
                placeholder="이름" 
                onChange={onChange}
                value={name}></input>
            <input 
                name="nickname" 
                placeholder="닉네임" 
                onChange={onChange}
                value={nickname}></input> 
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name}({nickname})
            </div>
        </div>
    )
}
