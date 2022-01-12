import React,{Component} from "react";


class Buttons extends Component{
    render(){
        return (
        /*
        React에서 style을 지정할대는 중괄호를 중첩해서 사용한다.
        listStyleType:'none' = li태그의 블릿을 없애주고 세로가 아닌 가로 형태로 변경해줌.
        */
          <ul>
              <li style={{listStyleType:'none'}}>
                <input type="button" value="create" onClick={function(e){
                    e.preventDefault();
                    this.props.onChangeMode('create');
                }.bind(this)}/>
                <input type="button" value="update" onClick={function(e){
                    e.preventDefault();
                    this.props.onChangeMode('update');
                }.bind(this)}/>
                <input type="button" value="delete" onClick={function(e){
                    e.preventDefault();
                    this.props.onChangeMode('delete');
                }.bind(this)}/>
              </li>
          </ul>
        );
    }
}

export default Buttons;
