const [users, setUsers] = useState([
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
]);


const nextId = useRef(4);
// 초기값 - 4 / 3개 항목 / 마지막 3.


const onCreate = () => {
  const user ={//새 항목 추가
    id: nextId.current,
    username,
    email,
    //...inputs와 같다.
  };
  //setUsers([...users, user]);
  setUsers(users.concat(user));
  setInputs({
    username:'',
    email:'',
  });
  console.log(nextId.current); //4
  nextId.current += 1; // 다음부터 값은 5
  // 컴포넌트 굳이 리렌더링 될 필요는 없다.
  // 특정 DOM 선택하고 싶을 때 사용 가능
  // 대신 변수를 기억하고 싶을 때 사용할 수 있다.
  // nextId.current 값 바꾸면 된다. 
};
// 넣는 것 깜박하면 - 가장 최신 상태 참조가 아닌 컴포넌트 처음 만들어질 때 옛날 상태를 참조하게 된다. useCallback 내부에서 참조
// props로 받아온 값이 있다면 넣어줘야 한다.
// 예를 들어 어떤 props를 받아온다면?
// 이또한 deps에 넣어줘야 한다. 

const [inputs, setInputs] = useState({
  username: '',
  email: '',
});

const {username, email } = inputs;

const onChange = useCallback(e => {
  const {name, value} = e.target;
  setInputs({
    ...inputs,
    [name]: value,
  });
}, [inputs]);
// useCallback 하면서 감싸주기
// 의존하고 있는 값들이 어떤 것들이 있는지 확인하기
// ...inputs를 useState를 통해 관리하고 있는 형태이다.
// deps에 inputs
// inputs가 바뀔때만 함수 새로 만들어지고,
// 그렇지 않으면 재사용 

const onRemove = useCallback(id => {
  setUsers(
    users.filter(user => user.id !== id)
  );
}, [users]);

const onToggle = useCallback(id => {
  setUsers(users.map(
    user => user.id === id 
    ? {...user, active: !user.active}
    : user
  ));
},[users]);

const count = useMemo( () => countActiveUsers(users), [users]);

// useMemo로 감싸는데, 1번 파라미터 - 함수형태여야 한다.
// 2번째 파라미터 - deps 넣어주면 된다. 
// 배열안에 넣는 값이 바뀌어야만 이 값을 새로 연산해주겠다.
// users가 바뀔 때만 호출이 된다. 
// 아니면 재사용된다. 
// useMemo 사용하면 필요한 연산을 필요할때만
// 컴포넌트 성능 최적화할 때 사용




return (
    <>
      <CreateUser 
        username={username} 
        email={email} 
        onChange={onChange} 
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성 사용자 수: {count} </div>
      {/* 리 렌더링 될 때마다 활성사용자 수 세고 있다. 불필요한데,
      이때 useMemo*/}
    </> 
  );