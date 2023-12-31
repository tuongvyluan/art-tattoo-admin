import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { ROLE } from '../../../lib/status';
import { fetcherPost, readJwt } from 'lib';
import { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from 'lib/env';
import { signOut } from 'next-auth/react';

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
				};
				const res = await fetcherPost(BASE_URL + '/Auth/Login', payload);

				// Read token from response
				const jwtObj = readJwt(res.jwt);
				// Check role
				const roleString = jwtObj['role'];
				let role;
				switch (roleString) {
					case 'StudioManager':
						role = ROLE.STUDIO;
						break;
					case 'Admin':
						role = ROLE.ADMIN;
						break;
					default:
						role = -1;
				}

				if (role === -1) {
					throw new Error('You are not allowed to access');
				}

				// if everything is fine
				return {
					id: res.accountId,
					studioId: res.studioId,
					token: res.jwt,
					role: role,
					email: jwtObj['emailaddress'],
					fullName: res.fullName,
					accountId: res.accountId,
					avatar: res.avatar,
					studioName: res.studioName,
					validUntil: res.validUntil
				};
			}
		}),
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		})
	],
	callbacks: {
		async jwt({ token, user, profile, trigger, session }) {
			if (trigger === 'update') {
				return { ...token, ...session.user };
			}
			// Only login with google the first time profile is not null
			// Here we fetch BE to get user info, the following time jwt will
			// not fall into this scope
			if (profile) {
				const data = await fetcherPost(`${BASE_URL}/Auth/GoogleAuth`, {
					token: user.name,
					studio: {
						studioName: ''
					}
				});
				if (data.result.success) {
					const jwtObj = readJwt(data.accountResult.jwt);
					// Check role
					const roleString = jwtObj['role'];
					let role;
					switch (roleString) {
						case 'StudioManager':
							role = ROLE.STUDIO;
							break;
						case 'Admin':
							role = ROLE.ADMIN;
							break;
						default:
							role = -1;
					}
					if (role === -1) {
						signOut();
					}
					return {
						id: data?.accountResult?.accountId,
						studioId: data?.accountResult?.studioId,
						token: data?.accountResult?.jwt,
						role: role,
						email: jwtObj['emailaddress'],
						fullName: data?.accountResult?.fullName,
						accountId: data?.accountResult?.accountId,
						avatar: data?.accountResult?.avatar,
						studioName: data?.accountResult?.studioName,
						validUntil: data?.accountResult?.validUntil
					};
				} else {
					signOut();
				}
			}
			if (user) {
				return {
					...token,
					accessToken: user.token,
					id: user.id,
					role: user.role,
					fullName: user.fullName,
					studioId: user.studioId,
					customerId: user.customerId,
					artistId: user.artistId,
					accountId: user.accountId,
					avatar: user.avatar,
					studioName: user.studioName,
					validUntil: user.validUntil
				};
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.role = token.role;
				session.user.id = token.id;
				session.user.accessToken = token.accessToken;
				session.user.fullName = token.fullName;
				session.user.studioId = token.studioId;
				session.user.customerId = token.customerId;
				session.user.artistId = token.artistId;
				session.user.accountId = token.accountId;
				session.user.avatar = token.avatar;
				session.user.studioName = token.studioName;
				session.user.validUntil = token.validUntil
			}
			return session;
		},
		async signIn({ account, profile, user, credentials }, options) {
			if (account.provider === 'google') {
				user.name = account.id_token;
				// console.log(account.id_token);
				return profile.email_verified;
			} else {
				const { email, password } = credentials;

				// perform login logic
				// find out user from db
				const payload = {
					email: email,
					password: password
				};
				const res = await fetcherPost(BASE_URL + '/Auth/Login', payload);

				// console.log(res)

				// Read token from response
				const jwtObj = readJwt(res.jwt);
				// Check role
				const roleString = jwtObj['role'];
				let role;
				switch (roleString) {
					case 'Admin':
						role = ROLE.ADMIN;
						break;
					case 'StudioManager':
						role = ROLE.STUDIO;
						break;
					default:
						role = -1;
						break;
				}

				if (role === -1) {
					throw new Error('You are not allowed to access');
				}

				const token = {
					id: res.accountId,
					token: res.jwt,
					role: role,
					email: jwtObj['emailaddress'],
					fullName: res.fullName,
					studioId: res.studioId,
					customerId: res.customerId,
					artistId: res.artistId,
					accountId: res.accountId,
					avatar: res.avatar,
					studioName: res.studioName,
					validUntil: res.validUntil
				};

				// if everything is fine
				return token;
			}
		}
	},
	pages: {
		signIn: '/auth/signin',
		signOut: '/auth/signout',
		error: '/auth/error', // Error code passed in query string as ?error=
		verifyRequest: '/auth/verify', // (used for check email message)
		newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
	},
	secret: process.env.NEXT_PUBLIC_SECRET
};
export default NextAuth(authOptions);
