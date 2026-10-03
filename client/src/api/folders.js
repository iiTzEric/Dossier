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

export async function createFolder(folderData) {
  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:5000/api/folders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(folderData),
  });

  if (!res.ok) {
    throw new Error('Failed to create folder');
  }
  return res.json();
}