import NextAuth from "next-auth";

class JWTProvider extends NextAuthProvider {
  name = "jwt";

  authorize(req, res) {
    // Check if the user is authenticated by checking the JWT token in the request header
    if (req.headers.authorization) {
      // Parse the JWT token
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = JSON.parse(atob(token));

      // If the token is valid, return the user
      if (decodedToken.id && decodedToken.name) {
        return {
          user: {
            id: decodedToken.id,
            name: decodedToken.name,
          },
        };
      }
    }

    // If the user is not authenticated, return null
    return null;
  }

  login(req, res) {
    // Generate a new JWT token
    const token = JSON.stringify({
      id: req.user.id,
      name: req.user.name,
    });
    const encodedToken = btoa(token);

    // Set the JWT token in the response header
    res.setHeader('Authorization', `Bearer ${encodedToken}`);

    // Return the user
    return req.user;
  }

  logout(req, res) {
    // Delete the JWT token from the session
    req.session.destroy();

    // Return the user
    return null;
  }

  handle(req, res) {
    // Check if the user is authenticated
    if (req.user) {
      // If the user is authenticated, return the user
      return req.user;
    }

    // If the user is not authenticated, return null
    return null;
  }

  onUnauthenticated(req, res) {
    // Handle the case where the user is not authenticated
    // For example, you could redirect the user to a login page
  }

  onRedirect(req, res) {
    // Handle the case where the user is redirected from a provider
    // For example, you could update the user's session with the provider's data
  }
}

export default JWTProvider;