import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from './blogStore';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog({ title, body, author });
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Write a New <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Article</span>
        </h1>
        <p className="text-slate-500">Share your thoughts and ideas with the world.</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-600"></div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {/* Title Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a compelling title..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:bg-white transition-all duration-200"
            />
          </div>

          {/* Body Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Blog Content <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your story here..."
              rows={8}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:bg-white transition-all duration-200 resize-y"
            />
          </div>

          {/* Author Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Author
            </label>
            <div className="relative">
              <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="mario">Mario</option>
                <option value="yoshi">Yoshi</option>
                <option value="luigi">Luigi</option>
                <option value="peach">Peach</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm hover:from-violet-500 hover:to-indigo-500 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-violet-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;