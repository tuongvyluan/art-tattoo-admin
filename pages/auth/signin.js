import Login from '../../components/Login';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect, useState } from 'react';

const LoginPage = () => {
	const { status, data } = useSession();

	useEffect(() => {
		if (status === 'authenticated') {
			Router.replace('/');
		}
	}, [status]);

	const [user, setUser] = useState({ email: '', password: '' });

	return (
		<div className="relative">

			<Login user={user} />
		</div>
	);
};

LoginPage.getInitialProps = async () => ({
	namespacesRequired: ['login']
});

export default LoginPage;
