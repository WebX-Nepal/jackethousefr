import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_LOGIN_URL,

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
      async authorize(credentials, req) {
        if (credentials && process.env.NEXT_PUBLIC_NEXTAUTH_LOGIN_URL) {
          const { email, password } = credentials;

          const res = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_LOGIN_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });

          console.log(res);
          const user = await res.json();
          if (res.ok && user) {
            console.log;
            return user;
          } else return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },
    async session({ session, token, user }: any) {
      session.user = token;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
