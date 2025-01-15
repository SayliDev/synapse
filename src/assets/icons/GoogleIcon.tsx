import { siGoogle } from "simple-icons/icons";

const GoogleIcon = ({ size = 24, color = siGoogle.hex }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={`#${color}`}
  >
    <path d={siGoogle.path} />
  </svg>
);

export default GoogleIcon;
