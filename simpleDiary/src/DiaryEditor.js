import React, {useContext, useEffect, useRef, useState } from "react"; //focus하기 위해
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
    useEffect(()=>{console.log("DiaryEditor 렌더")});

    const {onCreate} = useContext(DiaryDispatchContext);

    const authorInput = useRef();
    const contentInput = useRef();
    
    const [state, setState] = useState({
            author: "",//처음엔 공백문자열
            content:"",
            emotion: 1,
        });

    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit =()=>{
        if(state.author.length < 1){
            authorInput.current.focus();
            //focus
            return;
        }

        if(state.content.length < 5){
            contentInput.current.focus();
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
    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input 
                ref={authorInput}
                name = "author"
                value={state.author} 
                onChange={handleChangeState}
                />
            </div>
            <div>
                <textarea name = "content" 
                ref={contentInput}
                value={state.content} 
                onChange={handleChangeState}
                />
            </div>
            <div>
                <h2>오늘의 기분</h2>
                <select name= 'emotion' value={state.emotion} onChange={handleChangeState}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>일기 저장하기</button>
            </div>
        </div>
       
    );
};
export default React.memo(DiaryEditor);
