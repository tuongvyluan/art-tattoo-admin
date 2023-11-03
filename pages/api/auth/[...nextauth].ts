import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt'
	},
	providers: [
		CredentialsProvider({
			type: 'credentials',
			credentials: {},
			authorize(credentials, req) {
				const { email, password } = credentials as { email: string, password: string };

        // perform login logic
        // find out user from db
        if (email.toLowerCase() !== 'luantuongvy13@gmail.com' || password !== '123') {
          throw new Error('Invalid credentials')
        }

        // if everything is fine
        return {id: '1234', name: 'Vy Luân', email: 'luantuongvy13@gmail.com'}
			}
		})
	],
	pages: {
		signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
};
export default NextAuth(authOptions);
