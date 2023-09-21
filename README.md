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
DiaryEditor에서 create 이벤트가 발생하여 위로 올라간다.
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
diaryEditor에서 작성한 author, contentm emotion 파라미터를 받는다. 
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
