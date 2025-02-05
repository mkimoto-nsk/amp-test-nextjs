"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react"; // 追加！

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Bedrock Talk</h1>
          <p>Welcome to Bedrock Talk!</p>
          <p>
            {user ? (
              <button onClick={signOut}>Sign Out</button>
            ) : (
              <button onClick={() => console.log("Sign In")}>Sign In</button>
            )}
          </p>

        </main>
      )}
    </Authenticator>
  );
}
