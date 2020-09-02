import React, { useEffect } from 'react'

function User ({ user, onRemove, onToggle }){
    const { username, email, id, active } = user; 
  
    useEffect(() => {
        console.log('컴포넌트가 화면에 나타납니다');
        return () => {
            console.log('컴포넌트가 화면에서 사라짐');
        };
    }, []);
    // 1번 파라미터 - 실행하고 싶은 함수 넣어주기
    // 2번 파라미터 - 비어있는 배열을 넣어준다.
    // 배열 - deps 뎁스라 부른다. - dependency 요약
    // 의존되는 값을 배열에 넣어주면 된다.
    // 의존되는 값을 비어있다? - 처음 컴포넌트가 처음 화면 나타날때만 실행된다.
    return(
        <div>
            <b style={{
                color: active ? 'green' : 'black',
                cursor: 'pointer',  
            }}// Javascript 코드 내에 객체
            onClick={() => onToggle(id)}
            >
                {username}
            </b> 
            &nbsp; {/* 공백 추가 */}
            <span>({email})</span>
            <button onClick={() => onRemove(id)}>delete</button>
            {/* 해당 버튼이 눌렸을 때, 이 함수 호출 / 이 함수에서는 props로 받아온 onRemove를 아이디 값을 파라미터로 넣어서 호출해줄 거다. . 아이디가 특정값인 것 삭제
            
            그냥 onRemove(id)로 하면 렌더링 되는 시점에 삭제된다.
            
            함수를 새로 만들지 않고 바로 onRemove(id)를 입력한다면, 렌더링 된 순간 함수가 호출된다. 컴포넌트가 렌더링 되자마자 다 사라진다.

            함수를 넣어줘야 한다. 함수를 호출하는 것이 아닌 함수를 넣어줘야 한다는 것
            함수를 호출하는 함수를 만들어줘야 한다.
            */}
        </div>
    );
}

export default function UserList({ users, onRemove, onToggle }) {
    return (
        <div>
            {
                users.map(
                    (user, index) => (
                         <User 
                            user={user} 
                            key={user.id} 
                            onRemove={onRemove} 
                            onToggle={onToggle}
                        />)
                )
            }
        </div>
    )
}
