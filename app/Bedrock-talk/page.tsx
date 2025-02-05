"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react"; // 追加！
import  Link  from 'next/link';

import Header from "../components/header";
import Footer from "../components/footer";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  return (
    <Authenticator>
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
