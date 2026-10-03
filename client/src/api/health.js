export async function fetchHealth() {
  const res = await fetch('http://localhost:5000/api/health');
  if (!res.ok) {
    throw new Error('Health check failed');
  }
  return res.json();
}