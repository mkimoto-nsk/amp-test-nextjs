import React, { useEffect, useState }  from 'react';
import './header.css'; // Headerコンポーネントに対応するCSSファイルをインポート
import  Link  from 'next/link';
import { FetchUserAttributesOutput, fetchUserAttributes } from 'aws-amplify/auth';

const Header: React.FC = () => {
    // ログイン中のユーザ情報を取得して表示する
    const [attr, setAttrResult] = useState<FetchUserAttributesOutput>();
    const getCurrentUserAsync = async () => {
    const result = await fetchUserAttributes();
        // console.log(result);
        setAttrResult(result);
    };

    useEffect(() => {
        getCurrentUserAsync();
      }, []);

    return (
        <header className="header">
        <Link href="/" className="logo">
            Amazon Amplifyで作るWebアプリ
        </Link>
        <div user-info>
            ログイン中：{attr?.nickname}
        </div>
        </header>
    );
};

export default Header;
