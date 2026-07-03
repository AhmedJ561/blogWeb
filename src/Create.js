import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from './api';
import { useAuth } from './AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-amber-200 overflow-hidden shadow-sm">
          <div className="h-1.5 bg-gradient-to-r from-amber-400 to-orange-500" />
          <div className="p-8 text-center">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Login Required</h2>
            <p className="text-slate-500 mb-6">You need to be logged in to write a new article.</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 shadow-lg shadow-violet-200"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all duration-200"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    try {
      await createBlog({ title, body, author: user.username }, user.token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to publish article.');
      setIsPending(false);
    }
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
        <div className="h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-600" />

        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {/* API Error */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Author badge (readonly) */}
          <div className="flex items-center gap-3 p-3 bg-violet-50 rounded-xl border border-violet-100">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold uppercase shadow-sm">
              {user.username.charAt(0)}
            </div>
            <div>
              <p className="text-xs text-slate-500">Publishing as</p>
              <p className="text-sm font-semibold text-slate-800 capitalize">{user.username}</p>
            </div>
          </div>

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
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-violet-500 focus-within:border-transparent transition-all duration-200">
              <ReactQuill 
                theme="snow" 
                value={body} 
                onChange={setBody} 
                modules={modules}
                placeholder="Write your story here..."
                className="h-64 pb-12"
              />
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
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm hover:from-violet-500 hover:to-indigo-500 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-violet-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isPending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Publishing…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Publish Article
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;