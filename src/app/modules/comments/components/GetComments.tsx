import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_COMMENT = gql`
  query Query($movieId: ID) {
    comment(movie_id: $movieId) {
      _id
      name
      email
      text
      movie_id
      date
    }
  }
`;

export default function GetComments({ movieId }: { movieId: string }) {
  const { data, loading, error }: any = useQuery(GET_COMMENT, {
    variables: { movie_id: movieId },
  });
  console.log(data, "comments");

  if (loading)
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 bg-white/5 rounded-3xl border border-white/5"
          />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-[32px]">
        <p className="text-red-400 text-xs font-black uppercase tracking-widest">
          Failed to load comments
        </p>
      </div>
    );

  const comments = data?.comment || [];

  if (comments.length === 0) {
    return (
      <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-[40px]">
        <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em]">
          No comments yet. Be the first to share!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-3">
          <span className="w-8 h-px bg-emerald-500"></span>
          {comments.length} Thoughts
        </h3>
      </div>

      <div className="grid gap-6">
        {comments.map((comment: any) => (
          <div
            key={comment._id}
            className="group glass p-6 md:p-8 rounded-[32px] border border-white/5 hover:border-white/20 transition-all duration-500 ring-1 ring-white/5"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20">
                  {comment.name ? comment.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-tight text-base">
                    {comment.name}
                  </h4>
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest opacity-60">
                    Verified Film Critic
                  </p>
                </div>
              </div>
              <span className="text-gray-500 text-[9px] font-black uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-xl">
                {new Date(comment.date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed font-medium italic">
              {comment.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
