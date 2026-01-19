import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  name: string;
  url: string;
  size?: number;
}

export default function LogoCompany({ name = "Sistema contable", url = "/home", size = 28 }: Props) {
  return (
    <Link href={url} className="flex items-center gap-2">
      <Image
        src="/favicon.svg"
        alt="Logo del sistema"
        width={size}
        height={size}
      />
      <span className="text-2xl font-bold bg-gradient-to-tr from-violet-600 via-pink-600 to-orange-500 bg-clip-text text-transparent hidden md:block">
        {name}
      </span>
    </Link>
  )
}