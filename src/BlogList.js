import { Link } from 'react-router-dom';

const COLORS = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-amber-600',
  'from-pink-500 to-rose-600',
  'from-cyan-500 to-blue-600',
];

const BlogList = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog, index) => {
        const gradient = COLORS[index % COLORS.length];
        const initial = blog.author ? blog.author.charAt(0).toUpperCase() : '?';

        return (
          <Link
            to={`/blogs/${blog.id}`}
            key={blog.id}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-violet-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            {/* Card Top Bar */}
            <div className={`h-2 w-full bg-gradient-to-r ${gradient}`}></div>

            <div className="p-6 flex flex-col flex-1">
              {/* Title */}
              <h2 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-violet-700 transition-colors duration-200 line-clamp-2">
                {blog.title}
              </h2>

              {/* Excerpt */}
              {blog.body && (
                <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                  {blog.body}
                </p>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                    {initial}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-700 capitalize">{blog.author}</p>
                    <p className="text-xs text-slate-400">Author</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-violet-600 group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1">
                  Read
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogList;