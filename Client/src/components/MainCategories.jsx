import { Link } from "react-router-dom";

const MainCategories = () => {
  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-3 shadow-lg items-center justify-between gap-3">
      {/* Links */}
      <div className="flex-1 flex items-center justify-between gap-4">
        <Link
          to="/posts"
          className="bg-blue-800 text-white rounded-full px-4 py-2 whitespace-nowrap"
        >
          All Posts
        </Link>
        <Link
          to="/posts?cat=web Design"
          className="hover:bg-blue-50 rounded-full px-4 py-2 whitespace-nowrap"
        >
          Web Design
        </Link>
        <Link
          to="/posts?cat=App Development"
          className="hover:bg-blue-50 rounded-full px-4 py-2 whitespace-nowrap"
        >
          App Development
        </Link>
        <Link
          to="/posts?cat=Databases"
          className="hover:bg-blue-50 rounded-full px-4 py-2 whitespace-nowrap"
        >
          Databases
        </Link>
        <Link
          to="/posts?cat=SEO"
          className="hover:bg-blue-50 rounded-full px-4 py-2 whitespace-nowrap"
        >
          SEO
        </Link>
        <Link
          to="/posts?cat=Marketing"
          className="hover:bg-blue-50 rounded-full px-4 py-2 whitespace-nowrap"
        >
          Marketing
        </Link>
      </div>
      <span className="text-xl font-medium">|</span>
      {/* Search */}
      <div className="bg-gray-100 rounded-full p-2 flex items-center gap-2 flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="gray"
          strokeWidth="2"
          className="flex-shrink-0"
        >
          <circle cx="10.5" cy="10.5" r="7.5" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
        <input
          type="text"
          placeholder="Search a post..."
          className="bg-transparent outline-none w-32"
        />
      </div>
    </div>
  );
};

export default MainCategories;
