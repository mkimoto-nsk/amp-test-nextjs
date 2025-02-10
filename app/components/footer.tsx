import React from 'react';
import './footer.css'; // Headerコンポーネントに対応するCSSファイルをインポート
import  Link  from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© Nihon System Kaihatsu Co., Ltd.</p>
    </footer>
  );
};

export default Footer;