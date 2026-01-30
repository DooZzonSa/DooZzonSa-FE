'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navigationLinks = [
  { label: '약관 분석', href: '/' },
  { label: '악용 이슈', href: '/dashboard' },
  { label: '수집 통계', href: '/visualization' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/image/Logo.png"
              alt="pYakkan Logo"
              width={120}
              height={40}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#506FB2] ${
                  pathname === link.href
                    ? 'text-[#506FB2]'
                    : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
