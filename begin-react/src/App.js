import React, { useRef, useState, useMemo, useCallback, useReducer } from 'react';
import './App.css';

import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';


function countActiveUsers(users){
  console.log("활성 사용자 수를 세는중");
  return users.filter(user => user.active).length;
  // users 배열 넣으면 초록색 활성화 유저 수 연산해서 가져올 것. 
  // useMemo - 재사용 가능하게
}
// useState 구현했던 것을 useReducer를 이용해서 구현해보기
// 초기 상태를 App 바깥에 선언해주는 것
const initialState = {
  /*inputs: {
    username: '',
    email: '',
  },*/
  users: [
    {
        id: 1,
        username: 'velopert',
        email: 'velopert@korea.ac.kr',
        active: true,
    },
    {
        id: 2,
        username: 'heesu',
        email: 'heesu@korea.ac.kr',
        active: false,
    },
    {
        id: 3,
        username: 'Chung',
        email: 'chung@korea.ac.kr',
        active: false,
    },
  ]
};

function reducer(state, action) {
  switch (action.type) {
    /*case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          //불변성 지키기 위함
          ...state.inputs,
          [action.name]: action.value
        }
      };*/
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      }// 이전에 useState 사용 구현 - input 날리는 작업 따로 / users 배열 업데이트 따로 했는데 CREATE_USER 발생시 두가지 작업 같이 처리한다.
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id
          ? { ...user, active: !user.active }
          : user//업데이트 할 것
        )};
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    
    default:
      throw new Error('Unhandled action');
  }
}

function App() {;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form, onChange, reset] = useInputs({
    username: '',
    email: '',
  }) //상태 / 이벤트 / 초기화 함수
  const {username, email} = form;

  const nextId = useRef(4);
  // 기존에 3개 들어있으니 기본값은 4여야 한다.
  const { users } = state;
//const { username, email } = state.inputs;

  //useCallback 미리 해주고, 이벤트 받아와서 특정 작업을 할 것이고, 함수는 컴포넌트 처음 렌더링 될 때 한번만 만들고 재사용할 것
/*
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value,
    })// type 이 있고, 추가적으로 name value 그대로
  }, [])*/

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      }
    });
    nextId.current += 1;
    reset(); // reset은 여기서 호출해준다_Custom Hooks 
  }, [username, email, reset]); //reset도 넣어줘야 한다. _ Custom Hooks
  // id 값은 useRef로 관리해줘야 한다.
  // useCallback 이니 - 이 함수에서 기존 상태에 의존하는 것이 있으니깐 - [username, email] 넣어주고
  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id,
    });
  }, []);
  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users, [users]));
  return (
    <>
      <CreateUser 
        username={username} 
        email={email} 
        onChange={onChange} 
        onCreate={onCreate}
      />
      <UserList 
        users={users} 
        onToggle={onToggle}
        onRemove={onRemove}
      />
      <div>활성 사용자 수 : {count}</div>
    </>
  );
}

export default App;

// 언제 useState / useReducer
// 정해진 답 없다. - 컴포넌트 관리 값 1개
// 불변 값이라면 useState 관리가 쉽다.

// 컴포넌트에서 관리하는 값이 여러개 - 상태 구조가 복잡
// users 배열 업데이트 시 추가해야 / 없애야 될 때, 바꿔야 될 때 - useReducer가 더 편해질 수도 있다. 자주 사용해보고 맘에 드는 방식으로 사용해라.

// setter - setUsers -> 여기서부터 useReducer 쓸 지 - 편해진다면. 
// 간단한 것 - useState / 복잡하겠다 싶으면 useReducer 사용하는 것이 좋다.