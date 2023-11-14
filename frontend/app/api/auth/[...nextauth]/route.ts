import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import nextAuth from "next-auth";

const handler = NextAuth({
  providers:
    // Configure one or more authentication providers
    [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          mail: {
            label: "Mail",
            type: "email",
            placeholder: "sumail@gmail.com",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied

          const res = await fetch("http://localhost:5000/usuarios/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mail: credentials?.mail,
              password: credentials?.password,
            }),
          });
          const user = await res.json();

          console.log(user, "user");

          if (res.ok && user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
          }
        },
      }),

      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        },
      })
      
    ],
    callbacks: {
      async jwt({ token, user }) {
        console.log("callback token " + token.email);
    
        try {
          // Realiza una petición al backend
          const response = await axios.post("http://localhost:5000/usuarios/loginGoogle", {
            // Puedes enviar cualquier dato adicional que necesites al backend
            email: user.email,
          });
    
          console.log("Respuesta del backend:", response.data);
    
          if (response.status === 200 && response.data.accesToken) {
            // Si la petición al backend es exitosa, actualiza el token con el usuario y el nuevo token
            const userFromBackend = response.data.userLogueado;
            const sessionUser = {
              id: userFromBackend._id,
              email: userFromBackend.mail,
              nombre: userFromBackend.nombre,
              apellido :userFromBackend.apellido,
              imagenPerfil: userFromBackend.imagenPerfil,
              celular : userFromBackend.celular,
              localidad : userFromBackend.localidad,
              provincia : userFromBackend.provincia,
              nacionalidad : userFromBackend.nacionalidad,
              codigoPostal : userFromBackend.codigoPostal,
              casita : userFromBackend.casita,
              intentosFallidos : userFromBackend.intentosFallidos,
              bloqueado : userFromBackend.bloqueado,
              // Puedes agregar más campos según lo necesites
            };
    
            return { ...token, ...sessionUser, accessToken: response.data.accesToken };
          }
        } catch (error) {
          console.error("Error al realizar la petición al backend:", error);
        }
    
        // Si hay algún error, puedes devolver el token original
        return token;
      },
    
      async session({ session, token, user }) {
        session.user = token;
        console.log("callback session " + session.user );
        return session;
      },
    
      async signIn({ user, account, profile, email, credentials }): Promise<any> {
        // Lógica adicional después de la autenticación exitosa con Google
        try {
          // Realiza una petición al backend
          const response = await axios.post("http://localhost:5000/usuarios/loginGoogle", {
            // Puedes enviar cualquier dato adicional que necesites al backend
            email: user.email,
          });
        
          if (response.status === 200 && response.data.accesToken) {
            // Si la petición al backend es exitosa, actualiza la sesión con el usuario y el token
            const userFromBackend = response.data.userLogueado;
            const sessionUser = {
              id: userFromBackend._id,
              email: userFromBackend.mail,
              name: `${userFromBackend.nombre} ${userFromBackend.apellido}`,
              image: userFromBackend.imagenPerfil,
              // Puedes agregar más campos según lo necesites
            };
    
            return { ...sessionUser, token: response.data.accesToken };
          }
        } catch (error) {
          console.error("Error al realizar la petición al backend:", error);
        }
        // Si hay algún error, puedes devolver `false` o un mensaje de error, según tu lógica.
        return false;
      },
    },
    
 
  pages: {
    signIn: "/signIn",
  },

});

export { handler as GET, handler as POST };
