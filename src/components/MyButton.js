const MyButton = ({text, type, onClick}) => {

const btnType = ['positive', 'negative'].includes(type)? type : 'default'

  return(
    <button className={["MyButton",`MyButton_${btnType}`].join(" ")} onClick={onClick}>
      {text}     
    </button>
  )
};


// type prop을 전달하지않으면 default를 전달하기
MyButton.defaultProps = {
type: "default",
};

export default MyButton;