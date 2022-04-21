import CircleForSvg from './CircleForSvg';

function LoadingSvg() {
  return (
    <button>
      <svg width='3em' height='3em' viewBox='0 0 24 24'>
        <CircleForSvg cx='18' fill='#888888' begin='.67' />
        <CircleForSvg cx='12' fill='currentColor' begin='.33' />
        <CircleForSvg cx='6' fill='currentColor' begin='0' />
      </svg>
    </button>
  );
}

export default LoadingSvg;
