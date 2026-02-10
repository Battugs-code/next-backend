import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";

const ADD_COMMENT = gql`
  mutation Mutation(
    $name: String!
    $email: String!
    $text: String!
    $movieId: String!
    $date: String!
  ) {
    addComment(
      name: $name
      email: $email
      text: $text
      movie_id: $movieId
      date: $date
    ) {
      _id
      name
      email
      text
      movie_id
      date
    }
  }
`;

export default function AddComments({ movie_id }: { movie_id: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const [addComment, { loading }] = useMutation(ADD_COMMENT, {
    refetchQueries: ["Comment"], // Refetch the GetComments query
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !text) return;

    try {
      await addComment({
        variables: {
          name,
          email,
          text,
          movie_id,
          date: new Date().toISOString(),
        },
      });
      setName("");
      setEmail("");
      setText("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className="mt-12 p-8 glass rounded-[32px] border border-white/5 ring-1 ring-white/10 shadow-2xl">
      <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-3">
        <span className="w-8 h-px bg-blue-500"></span>
        Leave a Comment
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-white/20"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-white/20"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">
            Your Thoughts
          </label>
          <textarea
            placeholder="Share what you think about this film..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-white/20 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full md:w-auto px-10 py-4 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 disabled:opacity-50 overflow-hidden shadow-xl shadow-white/5"
        >
          <span className="relative z-10">
            {loading ? "Posting..." : "Post Comment"}
          </span>
          <div className="absolute inset-0 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </button>
      </form>
    </div>
  );
}
