import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";






export const authoptions = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    // OAuth authentication providers...
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log(credentials,"hiii")
        const user={username: credentials.username, email: credentials.email}
        return user
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider == "credentials") {
        return true
      }
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    }
    
  },
})

export { authoptions as GET, authoptions as POST }