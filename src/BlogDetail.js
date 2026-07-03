import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogById, deleteBlog } from './api';
import { useAuth } from './AuthContext';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import 'react-quill/dist/quill.snow.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    let cancelled = false;
    getBlogById(id)
      .then((data) => { if (!cancelled) setBlog(data); })
      .catch((err) => { if (!cancelled) setError(err.message || 'Blog not found.'); });
    return () => { cancelled = true; };
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    setDeleting(true);
    try {
      await deleteBlog(id, user.token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Could not delete blog.');
      setDeleting(false);
    }
  };

  // Can delete only if logged in and the blog belongs to them
  const canDelete = user && blog && blog.createdBy?._id === user._id;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Loading skeleton */}
      {!blog && !error && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-pulse">
          <div className="h-1.5 bg-gradient-to-r from-violet-300 to-indigo-300" />
          <div className="p-8 sm:p-12 space-y-4">
            <div className="h-8 bg-slate-100 rounded-lg w-3/4" />
            <div className="h-4 bg-slate-100 rounded w-1/4" />
            <div className="space-y-2 pt-6">
              <div className="h-3 bg-slate-100 rounded" />
              <div className="h-3 bg-slate-100 rounded" />
              <div className="h-3 bg-slate-100 rounded w-4/5" />
            </div>
          </div>
        </div>
      )}

      {/* Blog Content */}
      {blog && (
        <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Gradient Header Bar */}
          <div className="h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-600" />

          <div className="p-8 sm:p-12">
            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors duration-200 mb-8 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all blogs
            </button>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
              {blog.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 mb-10 pb-8 border-b border-slate-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold uppercase shadow-md">
                {blog.author ? blog.author.charAt(0) : '?'}
              </div>
              <div>
                <p className="font-semibold text-slate-800 capitalize">{blog.author}</p>
                <p className="text-xs text-slate-400">
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })
                    : 'Author'}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="text-slate-700 text-base leading-8 mb-12 ql-snow">
              <div 
                className="ql-editor p-0"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(blog.body || '')) }} 
              />
            </div>

            {/* Delete — only visible to the author */}
            {canDelete && (
              <div className="pt-8 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  {deleting ? 'Deleting…' : 'Delete Article'}
                </button>
              </div>
            )}
          </div>
        </article>
      )}
    </div>
  );
};

export default BlogDetail;
