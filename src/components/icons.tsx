import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 9l3 3-3 3" />
      <path d="M12 18V6" />
      <path d="M6 18V6h2c2.2 0 4 1.8 4 4s-1.8 4-4 4H6Z" />
      <path d="M18 6v12h-2c-2.2 0-4-1.8-4-4s1.8-4 4-4h2z" />
    </svg>
  );
}
