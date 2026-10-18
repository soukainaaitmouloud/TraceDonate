 const API_URL = "http://localhost:5000";

export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
      ...(options.headers || {})
    }
  });

  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  }

  return res;
};