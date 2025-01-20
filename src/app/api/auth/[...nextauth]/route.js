// import { baseUrl, login } from "@/utils/Endpoint";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from 'next-auth/providers/credentials';

// const authOptions = {
//     providers: [
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {},

//             async authorize(credentials) {
//                 try {
//                     const res = await fetch(`${baseUrl}${credentials?.route}`, {
//                         method: 'POST',
//                         body: JSON.stringify(credentials),
//                         headers: { 'Content-Type': 'application/json' },
//                     });

//                     const user = await res.json();

//                     if (res.ok && user) {
//                         console.log("User from the auth option", user);
//                         return user;
//                     }
//                     console.error("Authorization failed", res.status, user);
//                     return null;
//                 } catch (error) {
//                     console.error("Error in authorization:", error);
//                     return null;
//                 }
//             },
//         }),
//     ],
//     session: {
//         strategy: "jwt",
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//         signIn: "/",
//     },
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.user = user
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             if (token) {
//                 session.user = token?.user // Assuming you have a role field
//             }
//             return session;
//         },
//     },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
