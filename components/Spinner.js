import React from 'react';

export default () => (
  <div className="loader">
    <style jsx>{`
      .loader {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .ball-scale-ripple-multiple > div {
        background-color: orange;
      }
    `}</style>
    <div className="ball-scale-ripple-multiple">
      <div />
      <div />
      <div />
    </div>
  </div>
);
