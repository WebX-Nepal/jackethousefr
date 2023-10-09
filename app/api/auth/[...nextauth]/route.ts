// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// export const authOptions = {
//   pages: {
//     signIn: "/login",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "text",
//           placeholder: "Enter email",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Enter Password",
//         },
//       },
//       async authorize(credentials, req) {
//         if (credentials && process.env.NEXT_PUBLIC_NEXTAUTH_LOGIN_URL) {
//           const { email, password } = credentials;

//           const res = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_LOGIN_URL, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               email,
//               password,
//             }),
//           });

//           console.log(res);
//           const user = await res.json();
//           if (res.ok && user) {
//             console.log;
//             return user;
//           } else return null;
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXT_PUBLIC_NEXTAUTH_LOGIN_URL,

//   callbacks: {
//     async jwt({ token, user }: any) {
//       return { ...token, ...user };
//     },
//     async session({ session, token, user }: any) {
//       session.user = token;
//       return session;
//     },
//   },
// };
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials) {
        const { email, password }: any = credentials;

        // Ensure that NEXT_PUBLIC_NEXTAUTH_LOGIN_URL is properly defined in your environment
        const loginUrl = process.env.NEXT_PUBLIC_NEXTAUTH_LOGIN_URL;

        if (!loginUrl) {
          throw new Error("NEXT_PUBLIC_NEXTAUTH_LOGIN_URL is not defined.");
        }

        const res = await fetch(loginUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const user = await res.json();
        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: "your-secret-key-here", // Replace with a secure secret key
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },
    async session({ session, token }: any) {
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
