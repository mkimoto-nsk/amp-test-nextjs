"use client"; // クライアントを使用するためのディレクティブ

// 必要に応じてインポートを追加
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react"; 
import  Link  from 'next/link';

//　headerとfooterをインポート
import Header from "./components/header";
import Footer from "./components/footer";

// 標準コンポーネントを日本語化する
// import { I18n } from 'aws-amplify/utils';
// import { PT_BR } from "../translations/ja.js";
// I18n.putVocabularies(PT_BR);
// I18n.setLanguage('ja');

// カスタムコンポーネントを定義
import {customComponents, formFields} from "./components/custom_sign_in_up";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  return (
    <Authenticator formFields={formFields} components={customComponents}>
      {({ signOut, user }) => (
        <>
          <Header />
            <h1>Welcome!</h1>
              <main>
                {user ? user.username : "no user"} さん
                <h1>My todos</h1>
                <button onClick={signOut}>Sign out</button> 
                <br />
                <button onClick={createTodo}>Create todo</button>
                <ul>
                  {todos.map((todo) => (
                    <li key={todo.id}>{todo.content}</li>
                  ))}
                </ul>
                <Link href="/Bedrock-talk">OGKと会話する</Link>
              </main>
        <Footer />
        </>
      )}
    </Authenticator>
  );
}
