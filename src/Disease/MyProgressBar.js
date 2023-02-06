import React from 'react'

function MyProgressBar(props) {
  return (
    <div style= {{width: "100%",height: "5px", backgroundColor: "grey"}}>
        <div style={{width: `${props.value}%`,height: "5px" ,backgroundColor: props.progressColor}}></div>
    </div>
  )
}

export default MyProgressBar