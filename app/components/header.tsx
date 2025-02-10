import React, { useEffect, useState }  from 'react';
import './header.css'; // Headerコンポーネントに対応するCSSファイルをインポート
import  Link  from 'next/link';
import { FetchUserAttributesOutput, fetchUserAttributes } from 'aws-amplify/auth'; 
import { Authenticator } from "@aws-amplify/ui-react";
import {customComponents, formFields} from "../components/custom_sign_in_up";

const Header: React.FC = () => {
    // ログイン中のユーザ情報を取得して表示する
    const [attr, setAttrResult] = useState<FetchUserAttributesOutput>();

    const [isMenuOpen, setIsMenuOpen] = useState(false); // メニューの開閉状態
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // メニューの状態を切り替え
    };

    const getCurrentUserAsync = async () => {
    const result = await fetchUserAttributes();
        // console.log(result);
        setAttrResult(result);
    };

    useEffect(() => {
        getCurrentUserAsync();
      }, []);

    return (
        <Authenticator formFields={formFields} components={customComponents}>
        {({ signOut, user }) => (
            <header className="header">
            <Link href="/" className="logo">
                Amazon Amplifyで作るWebアプリ
            </Link>

            <div className="user-info">
                {attr?.nickname} 
                    <div className={`arrow-down ${isMenuOpen ? 'rotate-up' : ''}`}
                        onClick={toggleMenu}
                    >

                    </div>

            </div>

            {/* メニュー */}
            {isMenuOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li><Link href="/option">オプション(未実装)</Link></li>
                        <li><button onClick={signOut}>ログアウト</button></li>
                    </ul>
                </div>
            )}

            </header>
        )}
        </Authenticator>
    );
};

export default Header;
