import { useState, useCallback } from "react";

export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("bme_admin_token"));
  const [admin, setAdmin] = useState<{ name: string; email: string } | null>(() => {
    const s = localStorage.getItem("bme_admin_info");
    return s ? JSON.parse(s) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Login failed");
    }
    const data = await res.json();
    localStorage.setItem("bme_admin_token", data.token);
    localStorage.setItem("bme_admin_info", JSON.stringify({ name: data.name, email: data.email }));
    setToken(data.token);
    setAdmin({ name: data.name, email: data.email });
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("bme_admin_token");
    localStorage.removeItem("bme_admin_info");
    setToken(null);
    setAdmin(null);
  }, []);

  return { token, admin, login, logout, isAuthenticated: !!token };
}

export function adminFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("bme_admin_token");
  return fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });
}
