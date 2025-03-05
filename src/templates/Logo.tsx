import { AppConfig } from '@/utils/AppConfig';

export const Logo = (props: {
  isTextHidden?: boolean;
}) => (
  <div className="flex items-center text-xl font-semibold">
    <svg
      className="mr-1 size-8 stroke-current stroke-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 12h10" />
      <path d="M7 16h10" />
      <path d="M17 8h.01" />
    </svg>
    {!props.isTextHidden && AppConfig.name}
  </div>
);
