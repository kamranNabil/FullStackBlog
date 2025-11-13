import { useUser, useAuth } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const PostMenuActions = ({ post }) => {

  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isFeatured, setIsFeatured] = useState(post?.isFeatured || false);

  const { isPending, error, data: savedPosts } = useQuery({
    queryKey: ['savedPosts', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      try {
        const token = await getToken();
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data || [];
      } catch (err) {
        console.error("Error fetching saved posts:", err);
        return [];
      }
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const isSaved = savedPosts?.some((p) => p === post._id) || false;
  const isAdmin = user?.publicMetadata?.role === "admin" || false;
  const isPostOwner = post?.user?.username === user?.username;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Error deleting post");
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(`${import.meta.env.VITE_API_URL}/users/save`, {
        postId: post._id
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
      toast.success(isSaved ? "Post unsaved!" : "Post saved!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Error saving post");
    },
  });

  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(`${import.meta.env.VITE_API_URL}/posts/${post._id}/feature`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      setIsFeatured(!isFeatured);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success(isFeatured ? "Post unfeatured!" : "Post featured!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Error featuring post");
    },
  });

  const handleSave = () => {
    if (!user) {
      return navigate("/login");
    }
    saveMutation.mutate();
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate();
    }
  };

  const handleFeature = () => {
    featureMutation.mutate();
  };

  return (
    <div className="">
      <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>
      {isPending ? (
        "Loading..."
      ) : error ? (
        "Saved posts fetching failed!"
      ) : (
        <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleSave}>
          {/* Save Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
              stroke="black"
              strokeWidth="2"
              fill={isSaved ? 'black' : 'none'}
            />
          </svg>
          <span>{saveMutation.isPending ? "Saving..." : isSaved ? "Unsave this Post" : "Save this Post"}</span>
        </div>
      )}

      {user?.publicMetadata?.role === "admin" && (
        <div onClick={handleFeature} className="flex items-center gap-2 py-2 text-sm cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFeatured ? "black" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            width="20px"
            height="20px"
          >
            <polygon points="12 2 15.09 10.26 23.83 10.36 17.77 16.01 19.85 24.07 12 18.77 4.15 24.07 6.23 16.01 0.17 10.36 8.91 10.26 12 2" />
          </svg>
          <span>{isFeatured ? "Unfeature this Post" : "Feature this Post"}</span>
        </div>
      )}

      {user && (isPostOwner || isAdmin) && (
        <div onClick={handleDelete} className="flex items-center gap-2 py-2 text-sm cursor-pointer text-red-600 hover:text-red-800">
          {/* Delete Icon (dustbin) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="20px"
            height="20px"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
          <span>{deleteMutation.isPending ? "Deleting..." : "Delete this Post"}</span>
        </div>
      )}
    </div>
  );
};

export default PostMenuActions;