
import React from 'react';
import { BLOG_POSTS } from '../constants';
import GeminiImage from '../components/GeminiImage';

const BlogCard: React.FC<{ post: typeof BLOG_POSTS[0] }> = ({ post }) => {
  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="h-64 overflow-hidden relative">
        <GeminiImage 
          prompt={`A high-quality travel blog cover photo for an article titled "${post.title}". Scenic Peruvian landscape, cinematic lighting.`}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          aspectRatio="16:9"
        />
        <div className="absolute top-6 left-6">
          <span className="bg-[#FFAF04] text-[#011A52] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#011A52]/10 flex items-center justify-center text-[10px] font-bold text-[#011A52]">
            {post.author[0]}
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{post.author} • {post.date}</span>
        </div>
        <h3 className="text-2xl font-bold text-[#011A52] mb-4 group-hover:text-[#FFAF04] transition-colors">{post.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-8 line-clamp-3">{post.excerpt}</p>
        <button className="text-[#011A52] font-black text-xs uppercase tracking-widest border-b-2 border-[#FFAF04] pb-1 hover:border-[#011A52] transition">
          Read Article →
        </button>
      </div>
    </div>
  );
};

const Blog: React.FC = () => {
  return (
    <div className="bg-[#fdfdfd] pt-32 pb-24 px-6 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#FFAF04] font-black uppercase tracking-[0.4em] text-sm mb-4 block">Adventure Journal</span>
          <h1 className="text-5xl md:text-7xl font-bold text-[#011A52] mb-6">Expert <span className="text-[#FFAF04]">Insights</span></h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Tips, guides, and stories from the heart of the Andes to help you prepare for the journey of a lifetime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
          
          {/* Decorative CTA card for new writers */}
          <div className="bg-[#011A52] rounded-[2.5rem] p-10 flex flex-col justify-center text-center border border-white/10 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
               <GeminiImage 
                 prompt="A close up of an antique typewriter on a wooden desk with a window view of the Andes mountains"
                 alt="Write for us"
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="relative z-10">
              <span className="text-4xl mb-6 block">✍️</span>
              <h3 className="text-2xl font-bold text-white mb-4">Share Your Story</h3>
              <p className="text-sm text-gray-300 mb-8 leading-relaxed">Are you a traveler with a passion for Cusco? Join our community of guest contributors.</p>
              <button className="bg-[#FFAF04] text-[#011A52] px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition shadow-lg">
                Submit Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
