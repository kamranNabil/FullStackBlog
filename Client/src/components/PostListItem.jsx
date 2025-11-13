import { Link } from "react-router-dom";
import Image from "./image";
import { format } from "timeago.js";

const PostListItem = ({ post }) => {
  const placeholderImage = "https://via.placeholder.com/400x300?text=Blog+Post";

  return (
    <div className="flex flex-col md:flex-row gap-8 mb-8">
      {/* Image */}
      <div className="md:w-1/3">
        <Image
          src={post.img || placeholderImage}
          className="rounded-2xl object-cover w-full"
          w="400"
          h="230"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-4 md:w-2/3 mb-4 ">
        <Link to={`/singlepost/${post.slug}`} className="text-xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link className="text-blue-800">{post.user?.username || "Unknown"}</Link>
          <span>on</span>
          <Link className="text-blue-800">{post.category}</Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p>{post.desc}</p>
        <Link to={`/singlepost/${post.slug}`} className="underline text-blue-800 text-sm">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;