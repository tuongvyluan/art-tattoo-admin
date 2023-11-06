import Register from 'components/Register';
import { ROLE } from 'lib/status';
import { useState } from 'react';

const RegisterPage = () => {
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		password: '',
		cpassword: '',
    role: ROLE.STUDIO
	});
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
      Router.replace('/auth/signin')
    }
  }

	return <Register user={user} setUser={handleSetUser} handleSubmit={handleSubmit} />;
};

RegisterPage.getInitialProps = async () => ({
	namespacesRequired: ['register']
});

export default RegisterPage;
