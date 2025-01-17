import { siApple } from "simple-icons";

const AppleIcon = ({ size = 24, color = siApple.hex }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={`#${color}`}
  >
    <path d={siApple.path} />
  </svg>
);

export default AppleIcon;
