import { Logo } from './Logo';

export function Header() {
  return (
    <header className="w-full flex items-center justify-center py-5 bg-gray-700 border-b border-gray-600">
      <Logo />
    </header>
  );
}
