import React from 'react';

const CircleForSvg = (props) => {
  return (
    <circle cx={props.cx} cy='12' r='0' fill={props.fill}>
      <animate
        attributeName='r'
        begin={props.begin}
        calcMode='spline'
        dur='1.5s'
        keySplines='0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8'
        repeatCount='indefinite'
        values='0;2;0;0'
      ></animate>
    </circle>
  );
};

export default CircleForSvg;
