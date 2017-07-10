import React from 'react';

import Square from './Square.js';

const number = 400;
const numberSqrt = 20;
const board = [...Array(number)].map((item,i) => i);
let myTimer;
let generations;

export default class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    isAlive: [...Array(number)].map((item) => false)
    }
  }
  checkStatus(n, number){

    let sum = 0;
    (n+number >=0)? (this.state.isAlive[n+number]? sum++ : undefined):undefined;
    (n-number >=0)? (this.state.isAlive[n-number]? sum++ : undefined):undefined;
    (n-1 >=0)? (this.state.isAlive[n-1]? sum++ : undefined):undefined;
    (n+1 >=0)? (this.state.isAlive[n+1]? sum++ : undefined):undefined;
    (n+number-1 >=0)? (this.state.isAlive[n+number-1]? sum++ : undefined):undefined;
    (n+number+1 >=0)? (this.state.isAlive[n+number+1]? sum++ : undefined):undefined;
    (n-number+1 >=0)? (this.state.isAlive[n-number+1]? sum++ : undefined):undefined;
    (n-number-1 >=0)? (this.state.isAlive[n-number-1]? sum++ : undefined):undefined;

    if (this.state.isAlive[n] && (sum===3 || sum===2)){
        return true;
    } else if (sum===3) {
      return true;
    } else {
      return false;
    }

  }
  finishGeneretion(){
    const matrix = new Array(number);
    board.map((item) => {
      matrix[item] = this.checkStatus(item,numberSqrt);
    });
    this.setState({
      isAlive: matrix
    });
    generations++;
  }

  runGeneration(){
    generations =0;
    myTimer = setInterval(() => {
      this.finishGeneretion();
    },500);

  }

  stopGeneration(){
    clearInterval(myTimer);
    generations =0;
  }

  onClickHandler(i){
    const matrix = this.state.isAlive;
    matrix[i]=!this.state.isAlive[i]
    this.setState({
      isAlive:matrix
    });
  }

  clearHandler(){
    this.setState({
      isAlive:[...Array(number)].map((item) => false)
    });
  }
  render(){
    return(
      <div className='board'>
        {
          board.map((inner,i) => {
            return (
              <Square
                  position={i}
                  key={i}
                  onClickHandler={() =>this.onClickHandler(i)}
                  status={this.state.isAlive[i]}
                  />
            )
          })
        }
        <button onClick={() => this.runGeneration()}>Run</button>
        <button onClick={() => this.clearHandler()}>Clear</button>
        <button onClick={() => this.stopGeneration()}>StopRun</button>
        <p> This is Generation: {generations}</p>
      </div>
    );
  }
}
