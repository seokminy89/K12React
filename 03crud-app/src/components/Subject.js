import React,{Component} from "react";

/*
CDN방식에서는 React.Component를 상속했지만, 웹팩(WebPack) 방식에서는 
아래와 같이 Component만 상속하면 된다. (위에서 임포트 되어있기 때문)
컴포넌트를 만들때에는 항상 하나의 최상위 태그만 있어야 한다.
*/
class Subject extends Component{
    render(){
        return (
          <header>
            <h1><a href="/">{this.props.title}</a></h1>
            {this.props.sub}
          </header>
        );
    }
}

export default Subject;
