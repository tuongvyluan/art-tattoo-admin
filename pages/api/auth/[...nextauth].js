import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ROLE } from '../../../lib/status';
import { fetcherPost, readJwt } from 'lib';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASEURL
const authOptions = {
	session: {
		strategy: 'jwt'
	},
	providers: [
		CredentialsProvider({
			id: 'credentials',
			type: 'credentials',
			credentials: {},
			async authorize(credentials, req) {
				const { email, password } = credentials;

				// perform login logic
				// find out user from db
				const payload = {
					email: email,
					password: password
				}
				const res = await fetcherPost(BASE_URL + '/Auth/Login', payload)

				// Read token from response
				const jwtObj = readJwt(res.jwt)
				// Check role
				const roleString = jwtObj['role']
				let role
				switch (roleString) {
					case 'StudioManager':
						role = ROLE.STUDIO
						break;
					case 'Admin':
						role = ROLE.ADMIN
						break;
					default:
						role = -1
				}

				if (role === -1) {
					throw new Error('You are not allowed to access')
				}
				
				// if everything is fine
				return {
					id: res.accountId,
					token: res.jwt,
					role: role,
					email: jwtObj['emailaddress'],
					firstName: jwtObj['surname']
				};
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				return {
					...token,
					accessToken: user.token,
					id: user.id,
					role: user.role,
					firstName: user.firstName
				}
			};
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.role = token.role
				session.user.id = token.id
				session.user.accessToken = token.accessToken
				session.user.firstName = token.firstName
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
	},
	secret: process.env.NEXT_PUBLIC_SECRET
};
export default NextAuth(authOptions);
