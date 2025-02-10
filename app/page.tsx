"use client"; 

// 必要に応じてインポートを追加
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "./../app/app.css";
import { Authenticator } from "@aws-amplify/ui-react"; 
import { FetchUserAttributesOutput, fetchUserAttributes } from 'aws-amplify/auth';
import  Link  from 'next/link';

//　headerとfooterをインポート
import Header from "./components/header";
import Footer from "./components/footer";

// カスタムコンポーネントを定義
import {customComponents, formFields} from "./components/custom_sign_in_up";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [attr, setAttrResult] = useState<FetchUserAttributesOutput>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // サイドバーの開閉状態

  const getCurrentUserAsync = async () => {
    const result = await fetchUserAttributes();
    // console.log(result);
    setAttrResult(result);
  };

  useEffect(() => {
    listTodos();
    getCurrentUserAsync();
  }, []);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }


  return (
    <Authenticator formFields={formFields} components={customComponents}>
      {({ signOut, user }) => (
        <><Header />

          <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            ☰
          </button>

          {/* サイドバー */}
          <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>✖</button>
            <ul>
              <li><Link href="/">ホーム</Link></li>
              <li><Link href="/Bedrock-talk">AIと会話</Link></li>
            </ul>
          </div>

          {/* メインコンテンツ */}
          <main className={`content ${isSidebarOpen ? "shifted" : ""}`}>
            <h1>My todos</h1>
            <button onClick={signOut}>Sign out</button> 
            <br />
            <button onClick={createTodo}>Create todo</button>
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>{todo.content}</li>
              ))}
            </ul>
            <Link href="/Bedrock-talk">AIと会話する(未実装)</Link>
          </main>


        <Footer /></>
      )}
    </Authenticator>
  );
}
