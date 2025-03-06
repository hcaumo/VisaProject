import { ReactNode } from 'react';

interface VisaApplicationLayoutProps {
  children: ReactNode;
}

const VisaApplicationLayout = ({ children }: VisaApplicationLayoutProps) => {
  return <div className="container mx-auto py-6">{children}</div>;
};

export default VisaApplicationLayout;