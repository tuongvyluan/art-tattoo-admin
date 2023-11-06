import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ROLE } from '../../../lib/status';
const authOptions = {
	session: {
		strategy: 'jwt'
	},
	providers: [
		CredentialsProvider({
			type: 'credentials',
			credentials: {},
			authorize(credentials, req) {
				const { email, password } = credentials;

				// perform login logic
				// find out user from db
				if (
					email.toLowerCase() !== 'luantuongvy13@gmail.com' &&
					email.toLowerCase() !== 'admin@gmail.com'
				) {
					throw new Error('Invalid credentials');
				}
				if (email.toLowerCase() === 'admin@gmail.com') {
					return {
						id: '0123',
						name: 'ADMIN',
						email: 'admin@gmail.com',
						role: ROLE.ADMIN
					};
				}
				// if everything is fine
				return {
					id: '1234',
					name: 'Vy Luân',
					email: 'luantuongvy13@gmail.com',
					role: ROLE.STUDIO
				};
			}
		})
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.role = user.role;
				token.id = user.id;
			};
			return token;
		},
		session({ session, token }) {
			if (token && session.user) {
				session.user.role = token.role
				session.user.id = token.id
			}
			return session;
		}
	},
	pages: {
		signIn: '/auth/signin',
		signOut: '/auth/signout',
		error: '/auth/error', // Error code passed in query string as ?error=
		verifyRequest: '/auth/verify-request', // (used for check email message)
		newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
	}
};
export default NextAuth(authOptions);
