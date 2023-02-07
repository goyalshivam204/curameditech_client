import React from 'react'


function MyProgressBar(props) {

  const style = {
    color: "white",
    display: "inline-block",
    textAlign: "center",
    fontSize: "1rem",
    borderRadius: "8px",
    width: "100px",
    fontWeight: 600,
    padding: "2px 2px",
    backgroundImage: `linear-gradient(to right,var(--color-bg-2) ${props.progress}% ,silver ${props.progress}%)`
  }

  return (
    <div style={style}>
        {props.progress}%
    </div>
  )
}

export default MyProgressBar