import React from 'react';
import './header.css'; // Headerコンポーネントに対応するCSSファイルをインポート
import  Link  from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link href="/" className="logo">
        ChatOGK
      </Link>
    </header>
  );
};

export default Header;
