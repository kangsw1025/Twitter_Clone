import React from "react";
import { authService } from "../fbase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const onSocialClick = async event => {
    const { name } = event.target;
    var provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Continue With Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue With GitHub
        </button>
      </div>
    </div>
  );
};

export default Auth;
