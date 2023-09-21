# ✍️simple diary✍️
리액트를 이용하여 간단한 일기장을 만들었습니다. <br>
sessionStorage를 이용하여 생성, 조회, 수정, 삭제가 가능합니다.


## 주제 선정 이유 ❓
기록하는 습관을 기르고자 간단한 일기장을 활용하면 좋을 것 같아서 만들었습니다. 

## Tech Stack 📚
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Css-1572B6?style=flat&logo=Css3&logoColor=white"/> <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/> <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/>

## 주요 기능✨
- 일기 제목, 본문, 감정을 작성
- 일기 리스트 조회
- 일기 수정
- 일기 삭제

## 사용 설명 💻
1. 일기의 제목과 본문을 작성하고 감정의 수치를 선택한다.
<br><img width="100%" src="https://github.com/veryyounng/react_project/assets/121228672/a826219f-3523-4bb6-952b-b7cf4fd60a4c.gif"/>
<br><br>
2. 일기를 수정하고 싶은 부분을 수정한다.<br><br>
<img src="https://github.com/veryyounng/react_project/assets/121228672/e7c009e2-5563-4bd9-9c8f-3e1980180912"/><br><br>
3. 수정완료!<br><br>
<img width="100%" src= "https://github.com/veryyounng/react_project/assets/121228672/fce1a88c-7c98-48c0-8c53-e1f29f3796ef"/><br><br>
4. 삭제하고 싶은 일기를 삭제한다.<br><br>
<img src = "https://github.com/veryyounng/react_project/assets/121228672/8cb41063-1042-4157-8004-55a49d5351fe"/><br><br>

## ✔️DOM 조작하기- useRef 

```javascript
const authorInput = useRef();
const contentInput = useRef();

const handleSubmit =()=>{
        if(state.author.length < 1){
            authorInput.current.focus(); //작성자 이름이 한글자 미만이면 focus 강제작동
            //focus
            return;
        }

        if(state.content.length < 5){
            contentInput.current.focus(); //본문이 5글자 미만이면 focus 강제작동, 5글자 이상이면 저장하기
            //focus
            return;
        }
        onCreate(state.author, state.content, state.emotion);
        alert("저장성공");
        setState({
            author:"",
            content:"",
            emotion:1
        });
    };
```

## ✔️리스트 렌더링 (조회하기) 

```javascript
const DiaryList = ()=>{
   const diaryList = useContext(DiaryStateContext);
    return(
        <div className="DiaryList">
        <h2>일기리스트</h2>
        <h4>{diaryList.length}개의 일기가 있습니다 </h4>
        
        <div>
            {diaryList.map((it)=>(
                <DiaryItem key = {it.id}{...it} /> //자식id의 최상위 태그
            ))}
        </div>
    </div>
    );
};
```

## ✔️데이터 추가하기 

<img src="https://github.com/veryyounng/react_project/assets/121228672/6a460425-5fe8-4eb7-afdf-fa81d4ed7c56"/>
DiaryEditor에서 create 이벤트가 발생하여 위로 올라간다.<br>
부모 컴포넌트에서 상태변화 함수를 호출해서 데이터가 변화하면 다시 아래로 흐른다.

```javascript
onCreate(state.author, state.content, state.emotion);
        alert("저장성공");
        setState({
            author:"",
            content:"",
            emotion:1
        });

case 'CREATE':{
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      }
      return [newItem, ...state];
    }

const onCreate = useCallback((author, content, emotion)=> {
    dispatch({
      type:'CREATE', 
      data:{author, content, emotion, id:dataId.current}, });
    dataId.current += 1;//0번 id는 1번으로 증가해야함
  },[]);

```
diaryEditor에서 작성한 author, contentm emotion 파라미터를 받는다. <br>
현재 일기가 추가되는 시간객체를 만들어서 가져오고 데이터 아이디에 1이 증가하여 업데이트된다.

## ✔️데이터 삭제하기 

```javascript
case 'REMOVE':{
      return state.filter((it) => it.id !== action.targetId);
    }
```
targetId가 포함하지 않은 id를 바꾼다-> 새로운 배열로 상태가 변환되고 가장 위에 있던 요소가 삭제된다.

## ✔️데이터 수정하기

```javascript
case 'EDIT': {
      return state.map((it)=> it.id === action.targetId? {...it, content: action.newContent}: it);
    }
```
## ✔️React Lifecycle 제어하기 - useEffect

lifecycle란?
- 탄생 mount 초기화 작업
- 변화 update 예외처리 작업
- 죽음 unmount 메모리 정리 작업 <br>

▪️ useEffect는 callback함수와 의존성 배열을 전달한다.

```javascript
const App=()=> {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0)

  const getData = async()=>{
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res)=>res.json());

    const initData = res.slice(0,20).map((it)=>{
      return {
              author: it.email,
              content: it.body,
              emotion: Math.floor(Math.random()*5)+1,
              created_date: new Date().getTime(),
              id: dataId.current++,
      };
    });

    dispatch({type:"INIT", data:initData})
  };

  useEffect(()=>{
    getData();
  },[])
```

## ✔️최적화 

#### 1. useMemo

문제를 풀때 문제의 답을 이전에 기억해두었다가 똑같은 문제를 보면 기억함 것을 적음
- app 컴포넌트가 리렌더링 되고 있고 getDiaryAnalysis도 두번 동작되고 있음
- return을 가진 함수를 최적화하기 위해서 useMemo를 사용한다.
- 최적화 하고싶은 함수를 감싸서 그 콜백함수가 return하는 값을 return한다.
- 연산을 최적화하는 것이므로 값으로 사용한다.


  ```javascript
  const getDiaryAnalysis = useMemo(()=>{
    const goodCount = data.filter((it)=>it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount/data.length) * 100;
    return {goodCount, badCount, goodRatio};
  }, [data.length]
  );

  const {goodCount, badCount, goodRatio}= getDiaryAnalysis;
  ```

#### 2. React.memo

고차 컴포넌트 : 컴포넌트를 가져와 새로운 컴포넌트를 반환하는 함수이다.
똑같은 props를 받으면 리렌더링을 하지 않고 강화된 컴포넌트로 반환한다

  ```javascript
  export default React.memo(DiaryEditor);
  ```

#### 3. useCallback

```javascript
const onCreate = useCallback((author, content, emotion)=> {
    dispatch({
      type:'CREATE', 
      data:{author, content, emotion, id:dataId.current}, });
    dataId.current += 1;//0번 id는 1번으로 증가해야함
  },[]);

  const onRemove = useCallback((targetId) => {
    dispatch({type: "REMOVE", targetId})
  },[]);

  const onEdit = useCallback((targetId, newContent)=>{

    dispatch({type : "EDIT", targetId, newContent})
  },[]);
```
  
