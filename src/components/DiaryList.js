import { useState } from "react";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");

  // (10) 필터에 따라 리스트 정렬 (최신순인지 오래된순인지 if문으로 분기를 달아서 정렬된 리스트를 반환하는 함수)
  const getProcessedDiaryList = () => { 

  const compare = (a,b)=> { // 비교해주는 함수
    if(sortType ==='latest'){
      return parseInt(b.date) - parseInt(a.date); // 문자열이 들어올수도 있어서 parseInt로 숫자로 바꿔줌
    }else{
      return parseInt(a.date) - parseInt(BeforeUnloadEvent.date);
    }
  }
  const copyList = JSON.parse(JSON.stringify(diaryList));
  const sortedList = copyList.sort(compare);
  return sortedList;
  }

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
