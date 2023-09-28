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


function App() {

  const [data,dispatch] = useReducer(reducer,[])  // (1) reducer 함수 전달, 기본 state는 빈배열

  
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
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
    </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
