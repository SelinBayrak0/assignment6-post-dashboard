import { useEffect, useReducer, useState } from "react";
import { fetchPosts } from "./api/postsApi";
import { postsReducer, initialState } from "./reducer/postsReducer";
import PostList from "./components/PostList";
import FilterForm from "./components/FilterForm";

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      dispatch({ type: "FETCH_START" });

      try {
        const data = await fetchPosts();
        if (isMounted) {
          dispatch({ type: "FETCH_SUCCESS", payload: data });
        }
      } catch (error) {
        if (isMounted) {
          dispatch({ type: "FETCH_ERROR", payload: error.message });
        }
      }
    }

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPosts = state.posts.filter((post) =>
    post.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (state.loading) {
    return <p>Loading posts...</p>;
  }

  if (state.error) {
    return <p>Error: {state.error}</p>;
  }

  return (
    <div>
      <h1>Post Dashboard</h1>

      <FilterForm filter={filter} setFilter={setFilter} />

      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <PostList posts={filteredPosts} />
      )}
    </div>
  );
}

export default App;
