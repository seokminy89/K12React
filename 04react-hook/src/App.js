/** 
Hook(훅)
  : 리액트 기본 버전에서는 간단한 기능을 제작할 때만 함수를 사용했다.
  이유는 state를 변경하는것이 클래스형 컴포넌트에서만 가능했기 때문이다.
  하지만 16.8버전부터는 Hook을 통해 함수형 컴포넌트에서도 state를 변경할 수
  있게 되었다. React Hook은 useXXX()와 같은 이름의 함수를 사용한다.
  사용을 위해서는 반드시 import 해야한다.
**/

import React, {useState, useEffect} from 'react';
import './App.css';

/* 
최상위 컴포넌트로 함수형으로 제작됨.
*/
function App() {
  return (
    <div className="container">
      <h1>Class형 vs Function형 컴포넌트</h1>
      {/* 부모에서 자식으로 데이터를 전달할때는 props를 사용한다. */}
      <FuncComponent initNumber={2}></FuncComponent>
      <ClassComponent initNumber={2}></ClassComponent>
    </div>
  );
}

/*
클래스형 컴포넌트
  : React.Component를 상속하여 선언한다. 수명주기 함수중에 
  render()함수를 통해 렌더링 하므로 필수적으로 선언해야 한다.
*/
class ClassComponent extends React.Component{
  /*
  state의 초기값으로 props를 사용하고 있다.
  props는 부모가 전달해준 일종의 파라미터로 "this.props.프롭스명"으로
  사용한다.
  state는 항상 JSON 객체 형태로 생성한다.
  */
  state ={
    number : this.props.initNumber,
    nowDate : (new Date()).toString()
  }
  UNSAFE_componentWillMount(){
    console.log("ClassComponent => componentWillMount() 호출됨");
  }
  componentDidMount(){
    console.log("ClassComponent => componentDidMount() 호출됨");
  }
  shouldComponentUpdate(){
    console.log("ClassComponent => shouldComponentUpdate() 호출됨");
    let rNum = Math.round(this.state.number*100) % 2;
    if(rNum===0){
      return true;
    }
    else{
      console.log("홀수는 랜더링 안됨");
      return false;
    }
  }

  render(){
    return(
      <div className="container">
        <h2>Class형 컴포넌트</h2>
        <p>initNumber : {this.state.number}</p>
        <p>날짜 : {this.state.nowDate}</p>
        {/* 
          해당 버튼을 누를때 마다 난수를 생성하여 state의 number를 변경한다.
          클래스형 컴포넌트에서는 setState()를 통해 state를 변경할 수 있고,
          이 때 새롭게 렌더링이 된다.
        */}
        <input type="button" value="난수생성" onClick={()=>{
          this.setState({number : Math.random()});
        }} />
        {/* 
        일반적인 함수를 사용하면 컴포넌트와 버튼을 바인딩 하기위해 bind()를
        사용해야 하지만, 화살표함수(Arrow Function)를 사용하면
        별도의 바인딩이 필요없다.
        */}
        <input type="button" value="현재날짜" onClick={()=>{
          this.setState({nowDate : (new Date()).toString()});
        }
      } />
      </div>
    );
  }
}

/* 
함수형 컴포넌트
  : 출력할 내용을 즉시 return하면 된다. 함수안에 또다른 함수를 사용할 수 
  없으므로 render()함수가 별도로 존재하지 않고, 자기 자신이 render() 역할을 한다.
*/
function FuncComponent(props){
  console.log("#Life#","FuncConponent==>함수실행");
  /*
  useState()로 얻어온 값을 출력하면 크기가 2인 배열로 출력된다.
  0번째 요소는 인자로 전달한 값(상태값)이고
  1번째 요소는 state값을 변경할 수 있는 함수가 된다.
  */
  var numberState = useState(props.initNumber);
  console.log("numberState", numberState);
  var number = numberState[0];//state값
  var setNumber = numberState[1];//state를 변경할 수 있는 함수

  var dateState = useState((new Date().toString()));
  var nowDate = dateState[0];
  var setDate = dateState[1];
  //var [nowDate, setDate] = useState((new Date()).toString());

  useEffect(function(){
    console.log("#Life#","FuncConponent==>useEffect");
  });

  console.log("#Life#","FuncConponent==>return실행(render와동일)");
  return(
      <div className="container">
        <h2>function형 컴포넌트</h2>
        <p>initNumber : {number}</p>
        <p>날짜 : {nowDate}</p>
        {/* 
        Hook을 통해 생성된 numberState의 2번째 인자를 setNumber 라는 함수명으로
        받았으므로, 해당 버튼의 이벤트 처리에서 사용할 수 있다.
        버튼 클릭시 number값을 생성한 난수로 변경하게 된다.
        */}
        <input type="button" value="난수생성" onClick={function(){
          setNumber(Math.random());
        }} />
        <input type="button" value="현재날짜" onClick={function(){
          setDate((new Date()).toString());
        }} />
      </div>
  );
}

export default App;
