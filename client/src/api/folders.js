export async function fetchFolders() {
const token = localStorage.getItem('token');

const res = await fetch('http://localhost:5000/api/folders', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
if (!res.ok) {
  throw new Error('Failed to fetch folders');
}
return res.json();
}