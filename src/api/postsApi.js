export async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("Posts alınırken hata oluştu");
  }

  return response.json();
}
