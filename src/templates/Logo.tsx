'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { AppConfig } from '@/utils/AppConfig';

export const Logo = (props: {
  isTextHidden?: boolean;
}) => {
  // Force light theme logo regardless of system preference
  const [logoSrc] = useState('/assets/images/drexfy/logo-black.png');

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
