function LoadingSvg() {
  return (
    <button>
      <svg width='3em' height='3em' viewBox='0 0 24 24'>
        <circle cx='18' cy='12' r='0' fill='#888888'>
          <animate
            attributeName='r'
            begin='.67'
            calcMode='spline'
            dur='1.5s'
            keySplines='0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8'
            repeatCount='indefinite'
            values='0;2;0;0'
          ></animate>
        </circle>
        <circle cx='12' cy='12' r='0' fill='currentColor'>
          <animate
            attributeName='r'
            begin='.33'
            calcMode='spline'
            dur='1.5s'
            keySplines='0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8'
            repeatCount='indefinite'
            values='0;2;0;0'
          ></animate>
        </circle>
        <circle cx='6' cy='12' r='0' fill='currentColor'>
          <animate
            attributeName='r'
            begin='0'
            calcMode='spline'
            dur='1.5s'
            keySplines='0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8'
            repeatCount='indefinite'
            values='0;2;0;0'
          ></animate>
        </circle>
      </svg>
    </button>
  );
}

export default LoadingSvg;
