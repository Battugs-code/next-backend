export const CommentsSchema = `
type Comment {
    _id: ID
    name: String
    email: String
    text: String
    movie_id: String
    date: String
}

`;
export const CommentsQuerySchema = `
comments: [Comment]
comment(_id: ID, movie_id: ID): [Comment]
`;

export const CommentsMutationSchema = `
addComment(name: String!, email: String!, text: String!, movie_id: String!, date: String!): Comment
`;
