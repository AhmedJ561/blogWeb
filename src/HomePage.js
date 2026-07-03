import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {
  const { data: blogs, isPending, error } = useFetch();

  return (
    <div>
      {/* Hero Section */}
      <div className="relative mb-16 rounded-3xl overflow-hidden bg-slate-900 shadow-2xl">
        {/* Background Gradients & Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-900 opacity-90"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Content */}
        <div className="relative z-10 px-8 py-20 md:py-28 md:px-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Welcome to the New Era of Blogging
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Share Your Voice With <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">The World</span>
            </h1>
            <p className="text-slate-200 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
              Join a vibrant community of thinkers and creators. Discover insightful articles, tutorials, and stories, or write your own.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="/create" className="px-8 py-4 rounded-xl bg-white text-violet-900 font-bold hover:bg-slate-50 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center">
                Start Writing
              </a>
              <a href="#latest" className="px-8 py-4 rounded-xl border border-white/30 text-white font-bold hover:bg-white/10 transition-all duration-300 w-full sm:w-auto text-center backdrop-blur-sm">
                Read Stories
              </a>
            </div>
          </div>
          
          {/* Decorative Stats/Cards */}
          <div className="hidden lg:flex flex-col gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-64 transform translate-x-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="text-3xl font-bold text-white mb-1">10k+</div>
              <div className="text-slate-300 text-sm">Active Readers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-64 transform -translate-x-4 hover:-translate-y-2 transition-transform duration-300 delay-100">
              <div className="text-3xl font-bold text-amber-300 mb-1">500+</div>
              <div className="text-slate-300 text-sm">Published Articles</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div id="latest" className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-slate-900">
          Latest <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Stories</span>
        </h2>
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

      {/* Newsletter Section */}
      <div className="mt-24 mb-12 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-3xl border border-violet-100 p-10 md:p-16 text-center">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Subscribe to our Newsletter</h2>
        <p className="text-slate-600 max-w-xl mx-auto mb-8 text-lg">
          Get the latest articles, tutorials, and community updates delivered straight to your inbox. No spam, ever.
        </p>
        <form className="max-w-md mx-auto flex gap-3" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email address..." 
            className="flex-1 px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all shadow-sm"
            required
          />
          <button 
            type="submit"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold hover:from-violet-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-violet-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
