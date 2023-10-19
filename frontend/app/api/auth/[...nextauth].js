import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const options = {
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        // Aquí debes verificar las credenciales del usuario
        // y devolver un objeto que contenga la información del usuario
        // o null si las credenciales son inválidas
        const { email, password } = credentials;
        const user = await getUserByEmail(email);

        if (!user) {
          throw new Error('Credenciales inválidas');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          throw new Error('Credenciales inválidas');
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          token,
        };
      },
    }),
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: '/login',
  },
};

export default (req, res) => NextAuth(req, res, options);