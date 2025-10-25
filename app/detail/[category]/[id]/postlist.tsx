"use client";
import { useEffect, useState } from "react";

export default function PostList({movieId}:{movieId:String}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`/api/post/${movieId}`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        return
      }
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 sm:p-8">
      <h3 className="text-xl font-bold text-white mb-4">Comments</h3>
      {posts.length === 0 ? (
        null
      ) : (
        posts.map((post: any) => (
          <div key={post._id} className="flex flex-col mb-2 gap-2 p-4 bg-white/5 rounded-lg border border-purple-500/10">
            <label className="text-xs">{post.userId.username}</label>
            <p className="text-lg">{post.text}</p>
          </div>
        ))
      )}
      </div>
    </div>
  );
}
