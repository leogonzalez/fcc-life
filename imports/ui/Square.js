import React from 'react';


export default function Square(props) {
  const status = props.status ? 'square alive' : 'square dead';
  return(
    <button
      className={status}
      onClick={props.onClickHandler}
    ></button>
  );
}
