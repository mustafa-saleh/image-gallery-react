import React from 'react'

const Logo = ({width = '48', height = '48'}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 48 48"
      style={{fill: '#000000'}}
    >
      <path fill="#dff0fe" d="M4.5 7.5H38.5V35.5H4.5z"></path>
      <path fill="#4788c7" d="M38,8v27H5V8H38 M39,7H4v29h35V7L39,7z"></path>
      <path fill="#dff0fe" d="M1.5 4.5H35.5V32.5H1.5z"></path>
      <path fill="#4788c7" d="M35,5v27H2V5H35 M36,4H1v29h35V4L36,4z"></path>
      <path fill="#98ccfd" d="M25 18L18 24 28 32 35 32 35 27z"></path>
      <path
        fill="#fff"
        d="M28.541 9A2.541 2.5 0 1 0 28.541 14A2.541 2.5 0 1 0 28.541 9Z"
      ></path>
      <path fill="#b6dcfe" d="M30 32L2 32 2 25 13 16z"></path>
      <g>
        <path fill="#fff" d="M33,7v23H4V7H33 M35,5H2v27h33V5L35,5z"></path>
      </g>
    </svg>
  )
}

export {Logo}
