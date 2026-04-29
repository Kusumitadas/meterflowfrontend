export const mockUsageLogs = [
  { id: "log-9128", endpoint: "/api/v1/chat/completions", status: 200, latency: 145, timestamp: "2026-04-28T09:15:00Z" },
  { id: "log-9129", endpoint: "/api/v1/payments/create", status: 200, latency: 220, timestamp: "2026-04-28T09:18:00Z" },
  { id: "log-9130", endpoint: "/api/v1/messages/send", status: 401, latency: 30, timestamp: "2026-04-28T09:22:00Z" },
  { id: "log-9131", endpoint: "/api/v1/chat/completions", status: 200, latency: 165, timestamp: "2026-04-28T09:25:00Z" },
  { id: "log-9132", endpoint: "/api/v1/users/profile", status: 500, latency: 850, timestamp: "2026-04-28T09:30:00Z" },
  { id: "log-9133", endpoint: "/api/v1/payments/create", status: 200, latency: 180, timestamp: "2026-04-28T09:35:00Z" },
  { id: "log-9134", endpoint: "/api/v1/messages/send", status: 200, latency: 85, timestamp: "2026-04-28T09:40:00Z" },
  { id: "log-9135", endpoint: "/api/v1/chat/completions", status: 429, latency: 15, timestamp: "2026-04-28T09:45:00Z" },
];

export const mockTrafficData = [
  { time: "04:00", requests: 120, errors: 2 },
  { time: "05:00", requests: 300, errors: 5 },
  { time: "06:00", requests: 250, errors: 1 },
  { time: "07:00", requests: 800, errors: 15 },
  { time: "08:00", requests: 650, errors: 8 },
  { time: "09:00", requests: 900, errors: 2 },
  { time: "10:00", requests: 1200, errors: 4 },
];

export const mockApiKeys = [
  { id: "key-1", name: "Production Gateway Key", key: "7fc886ed-f0f8-451f-9874-7e6d1b2d12bb", status: "Active", created: "2026-01-15" },
  { id: "key-2", name: "Development Env Key", key: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d", status: "Active", created: "2026-03-22" },
  { id: "key-3", name: "Legacy Integration Key", key: "9f8e7d6c-5b4a-3f2e-1d0c-b9a8f7e6d5c4", status: "Revoked", created: "2025-11-05" },
];

export const mockBillingHistory = [
  { id: "inv-104", amount: "$65.00", status: "Pending", date: "Apr 28, 2026", method: "Visa 5432" },
  { id: "inv-103", amount: "$250.00", status: "Completed", date: "Mar 28, 2026", method: "Visa 5432" },
  { id: "inv-102", amount: "$50.00", status: "Completed", date: "Feb 28, 2026", method: "Visa 5432" },
  { id: "inv-101", amount: "$50.00", status: "Completed", date: "Jan 28, 2026", method: "Visa 5432" },
];

export const mockApps = [
  { id: "app-1", name: "OpenAI GPT-4 Integration", color: "bg-emerald-500", requests: "1,250,400", trend: "up" },
  { id: "app-2", name: "Stripe Payment Gateway", color: "bg-indigo-500", requests: "890,124", trend: "up" },
  { id: "app-3", name: "Twilio SMS Service", color: "bg-rose-500", requests: "430,089", trend: "down" },
];
