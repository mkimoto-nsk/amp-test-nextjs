"use client";

// 必要に応じてインポートを追加
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "./../Bedrock-talk/app.css";
import { Authenticator } from "@aws-amplify/ui-react"; 
import { FetchUserAttributesOutput, fetchUserAttributes } from 'aws-amplify/auth';
import  Link  from 'next/link';

//　headerとfooterをインポート
import Header from "../components/header";
import Footer from "../components/footer";

// カスタムコンポーネントを定義
import {customComponents, formFields} from "../components/custom_sign_in_up";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  return (
    <Authenticator formFields={formFields} components={customComponents}>
      {({ signOut, user }) => (
        <><Header />
            <main>
              <h1>Bedrock Talk</h1>
              <p>Welcome to Bedrock Talk!</p>
              <Link href="/">メインページに戻る</Link>
              <p>
                {user ? (
                  <button onClick={signOut}>Sign Out</button>
                ) : (
                  <button onClick={() => console.log("Sign In")}>Sign In</button>
                )}
              </p>

            </main>
        <Footer /></>
      )}
    </Authenticator>
  );
}
