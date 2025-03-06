'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { AppConfig } from '@/utils/AppConfig';

export const Logo = (props: {
  isTextHidden?: boolean;
}) => {
  const { resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState('/assets/images/drexfy/logo-black.png');
  
  // Update logo based on theme
  useEffect(() => {
    if (resolvedTheme === 'dark') {
      setLogoSrc('/assets/images/drexfy/logo-white.png');
    } else {
      setLogoSrc('/assets/images/drexfy/logo-black.png');
    }
  }, [resolvedTheme]);

  return (
    <div className="flex items-center text-xl font-semibold">
      <div className="relative mr-2 h-8 w-32">
        <Image
          src={logoSrc}
          alt={AppConfig.name}
          fill
          sizes="(max-width: 768px) 100vw, 256px"
          style={{ objectFit: 'contain', objectPosition: 'left' }}
          priority
        />
      </div>
      {!props.isTextHidden && <span className="sr-only">{AppConfig.name}</span>}
    </div>
  );
};
