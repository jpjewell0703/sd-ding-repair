export default function WaveDivider({ flip }) {
  return (
    <svg
      className="wave-divider"
      viewBox="0 0 1440 70"
      preserveAspectRatio="none"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      aria-hidden="true"
    >
      <path
        d="M0,32 C240,72 480,0 720,24 C960,48 1200,80 1440,40 L1440,70 L0,70 Z"
        fill="currentColor"
      />
    </svg>
  );
}
