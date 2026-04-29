import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, KeyRound, Copy, RefreshCw, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { mockApiKeys, mockUsageLogs } from '../mockData';

const ApiKeys = () => {
  const [logs, setLogs] = useState(mockUsageLogs);

  useEffect(() => {
    // Attempt to fetch from real backend
    axios.get("http://localhost:8081/api/usage/logs", {
      headers: {
        "x-api-key": "7fc886ed-f0f8-451f-9874-7e6d1b2d12bb"
      }
    })
      .then(res => {
        if (res.data && res.data.length > 0) {
          setLogs(res.data);
        }
      })
      .catch(err => {
        console.log("Backend not reachable, using enhanced mock data.", err);
      });
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Top action bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">API Keys</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage and rotate your gateway access keys.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 transition-colors">
          <Plus size={18} />
          Generate New Key
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* API Keys List */}
        <div className="lg:col-span-1 space-y-4">
          {mockApiKeys.map(key => (
            <div key={key.id} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none relative overflow-hidden group">
              {key.status === 'Active' && (
                <div className="absolute top-0 left-0 w-1 h-full bg-green-400"></div>
              )}
              
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <KeyRound size={18} className={key.status === 'Active' ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'} />
                  <h3 className="font-bold text-slate-800 dark:text-white">{key.name}</h3>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  key.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  {key.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700 mb-4">
                <code className="text-sm font-mono text-slate-600 dark:text-slate-300 truncate mr-2">
                  {key.status === 'Active' ? key.key : '••••••••••••••••••••'}
                </code>
                {key.status === 'Active' && (
                  <button className="text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                    <Copy size={16} />
                  </button>
                )}
              </div>

              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                <span>Created {key.created}</span>
                {key.status === 'Active' && (
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-lg" title="Rotate Key">
                      <RefreshCw size={14} />
                    </button>
                    <button className="p-1.5 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-lg" title="Revoke Key">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Usage Logs */}
        <div className="lg:col-span-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Recent Usage Logs</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="pb-3 font-medium">Timestamp</th>
                  <th className="pb-3 font-medium">Endpoint</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Latency</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {logs.map((log, index) => (
                  <tr key={index} className="border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-4 font-medium text-slate-700 dark:text-slate-200">{log.endpoint}</td>
                    <td className="py-4">
                      {log.status === 200 ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/20 w-max px-2.5 py-1 rounded-md">
                          <CheckCircle2 size={14} /> {log.status}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-medium bg-rose-50 dark:bg-rose-900/20 w-max px-2.5 py-1 rounded-md">
                          <AlertCircle size={14} /> {log.status}
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-slate-600 dark:text-slate-400">
                      {log.latency} ms
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ApiKeys;
