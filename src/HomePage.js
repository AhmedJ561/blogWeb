import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {
  const { data: blogs, isPending, error } = useFetch();

  return (
    <div>
      {/* Hero Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3">
          Latest <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Stories</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-xl">
          Discover insightful articles, tutorials, and stories from our community of writers.
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl mb-6">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isPending && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-violet-100"></div>
            <div className="w-16 h-16 rounded-full border-4 border-violet-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-slate-500 font-medium">Loading blogs...</p>
        </div>
      )}

      {/* Blog List */}
      {blogs && <BlogList blogs={blogs} />}

      {/* Empty State */}
      {blogs && blogs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-1">No blogs yet</h3>
          <p className="text-slate-500">Be the first to share your story!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
