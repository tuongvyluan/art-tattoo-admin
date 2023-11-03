import Login from "../../components/Login";
import { signIn } from 'next-auth/react'
import Router from "next/router";
import { useState } from "react";

const LoginPage = () => {
  const [user, setUser] = useState({email: '', password: ''})
  const handleSetUser = (newUser) => {
    setUser(newUser)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await signIn('credentials', {
      email: user.email,
      password: user.password,
      redirect: false
    })

    if (res.ok) {
      Router.replace('/')
    }
  }
  return (
    <Login handleSubmit={handleSubmit} user={user} setUser={handleSetUser} />
  )
};

LoginPage.getInitialProps = async () => ({
  namespacesRequired: ["login"],
});

export default LoginPage;
