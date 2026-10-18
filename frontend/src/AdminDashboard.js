import { useEffect, useState } from "react";
import { authFetch } from "./api";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      // ✅ STATS
      const statsRes = await authFetch("/admin/stats");
      setStats(await statsRes.json());

      // ✅ USERS
      const usersRes = await authFetch("/users");
      setUsers(await usersRes.json());

      // ✅ DONATIONS
      const donationsRes = await authFetch("/all-donations");
      setDonations(await donationsRes.json());

      // ✅ REQUESTS
      const requestsRes = await authFetch("/all-requests");
      setRequests(await requestsRes.json());

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center" }}>🧑‍💼 Admin Dashboard</h1>

      {/* 📊 STATS */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <p>👤 Users: {stats.users || 0}</p>
        <p>💰 Donations: {stats.donations || 0}</p>
        <p>📩 Requests: {stats.requests || 0}</p>
      </div>

      {/* 👤 USERS */}
      <h2>Users</h2>
      {users.map(u => (
        <div key={u.id}>
          {u.name} — {u.email} — {u.role}
        </div>
      ))}

      {/* 💰 DONATIONS */}
      <h2>Donations</h2>
      {donations.map(d => (
        <div key={d.id}>
          ${d.amount} — User {d.user_id}
        </div>
      ))}

      {/* 📩 REQUESTS */}
      <h2>Requests</h2>
      {requests.map(r => (
        <div key={r.id}>
          {r.title} — {r.status}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;