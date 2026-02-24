export const LoginSchema = `
    type Login {

        email: String
        password: String
    }
        type SignUp {
        name: String
        email: String
        password: String
        }

`;

export const authMutationSchema = `
      signUp(name: String!, email: String!, password: String!, VerifyPassword: String!):String
      login(email: String!, password: String!): String  

`;
