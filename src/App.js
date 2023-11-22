import React, { useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";


// (2) reducer 함수 구현
const reducer = (state, action) => {  // 2개의 파라미터 (state, action) 를 받음
let newState = []; // (3) 배열 만들기 
switch(action.type){  // (4) switch 케이스 작성 
  case 'INIT' : {  // (5)
    return action.data;  
  }
  case 'CREATE' : { // (6)
    const newItem = {
    ...action.data
    };

    newState = [newItem, ...state]; // (7) newState라는 변수에 새로운 state로 바뀔 값을 넣어줌. 
    break; // (10) 
  }
  case 'REMOVE' : { // (11) 
    newState = state.filter((it)=>it.id !== action.targerId);
    break; // (12)
  }
  case 'EDIT':{ // (13) 전체를 다 바꿀 수 있게 하기 (action.data)
    newState = state.map((it)=>it.id === action.data.id? {...action.data}: it)
    break; // (14)
  }
  default: // (9)
    return state; 
}
return newState;  // (8)
};

export const DiaryStateContext = React.createContext(); // (21)
export const DiaryDispatchContext = React.createContext(); // (23)

const dummyData =[
  {
    id:1,
    emotion:1,
    content: "오늘의 일기 1번",
    date: 1699432776920,
  },
  {
    id:2,
    emotion:2,
    content: "오늘의 일기 2번",
    date: 1699432776921,
  },
  {
    id:3,
    emotion:3,
    content: "오늘의 일기 3번",
    date: 1699432776922,
  },
  {
    id:4,
    emotion:4,
    content: "오늘의 일기 4번",
    date: 1699432776923,
  },
  {
    id:5,
    emotion:5,
    content: "오늘의 일기 5번",
    date: 1699432776924,
  },
]

function App() {

  const [data,dispatch] = useReducer(reducer,dummyData)  // (1) reducer 함수 전달, 기본 state는 빈배열

  
  const dataId = useRef(0); // (15) 
  // CREATE
  const onCreate = (date, content, emotion)=>{ // (16) 언제 작성된 일기인지까지 받을 것이기 때문에 date까지 받아줌 
    dispatch({
     type: "CREATE", 
     data:{ // (17)
      id: dataId.current, 
      date: new Date(date).getTime(),
      content, 
      emotion,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
      },
        });
    dataId.current += 1; // (18)
  }

  // REMOVE
  const onRemove = (targetId) => { // (19)
    dispatch({type:"REMOVE",targetId});
  }
  

  // EDIT
  const onEdit = (targetId, date, content, emotion)=>{ // (20)
    dispatch({
    type: "EDIT",
    data:{
    id: targetId, 
    date: new Date(date).getTime(), 
    content,
    emotion,
    }
    })
  }


  return ( 
    <DiaryStateContext.Provider value={data}> {/* (22) */}
    <DiaryDispatchContext.Provider value={{onCreate, onEdit, onRemove}}> {/* (24) */}
    
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
    </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
