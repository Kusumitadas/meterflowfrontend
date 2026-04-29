import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, Activity, Globe, MoreHorizontal, Download, X, CheckCircle2 } from 'lucide-react';
import { mockTrafficData, mockApps, mockUsageLogs } from '../mockData';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const [logs, setLogs] = useState(mockUsageLogs);
  const { isDarkMode } = useTheme();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiName, setApiName] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');

  const handleProvision = async (e) => {
    e.preventDefault();
    setIsProvisioning(true);
    try {
      const response = await axios.post("http://localhost:8081/api/provision", {
        name: apiName,
        targetUrl: targetUrl
      });
      setGeneratedKey(response.data.apiKey);
      setIsProvisioning(false);
      setShowSuccess(true);
      // We removed the auto-close timeout so the user can copy their API key.
    } catch (err) {
      console.error("Failed to provision API", err);
      setIsProvisioning(false);
    }
  };

  useEffect(() => {
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

  const total = logs.length;
  const successCount = logs.filter(l => l.status >= 200 && l.status < 300).length;
  const errorCount = logs.filter(l => l.status >= 400).length;
  // Latency is simulated as the remainder or just high latency requests
  const highLatencyCount = logs.filter(l => l.latency > 150).length;

  const successPercent = total > 0 ? Math.round((successCount / total) * 100) : 0;
  
  const pieData = [
    { name: 'Success', value: successCount },
    { name: 'Errors', value: errorCount },
    { name: 'Latency', value: highLatencyCount },
  ];
  const COLORS = ['#818cf8', '#fb7185', '#c084fc'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Top row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Traffic Chart */}
        <div className="col-span-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Traffic Analysis</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Requests processed over time</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                <button className="px-3 py-1 rounded bg-white dark:bg-slate-700 shadow-sm">Hour</button>
                <button className="px-3 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Day</button>
                <button className="px-3 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Week</button>
              </div>
              <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <Download size={16} />
              </button>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%" minHeight={256} minWidth={0}>
              <AreaChart data={mockTrafficData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', backgroundColor: isDarkMode ? '#1e293b' : '#fff', color: isDarkMode ? '#f8fafc' : '#0f172a' }}
                  itemStyle={{ fontWeight: 600, color: isDarkMode ? '#f8fafc' : '#0f172a' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorRequests)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Chart */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Summary</h3>
          <div className="flex-1 flex flex-col items-center justify-center relative w-full min-h-[200px]">
            <ResponsiveContainer width="100%" height={200} minHeight={200} minWidth={0}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: isDarkMode ? '#1e293b' : '#fff', color: isDarkMode ? '#f8fafc' : '#0f172a' }} itemStyle={{ color: isDarkMode ? '#f8fafc' : '#0f172a' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-slate-800 dark:text-white">{successPercent}%</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Success</span>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Success</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-400"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Errors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Latency</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Apps / Channels */}
        <div className="lg:col-span-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Your APIs (Channels)</h3>
            <div className="relative w-full sm:w-auto">
              <input type="text" placeholder="Search APIs..." className="w-full sm:w-64 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500" />
            </div>
          </div>
          
          <div className="space-y-4">
            {mockApps.map(app => (
              <div key={app.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer group gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${app.color} flex items-center justify-center text-white shadow-sm shrink-0`}>
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm sm:text-base">{app.name}</h4>
                  </div>
                </div>
                
                <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-8">
                  <div className="flex items-center gap-2 text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full font-semibold text-xs sm:text-sm whitespace-nowrap">
                    <Activity size={14} />
                    {app.requests}
                  </div>
                  
                  <div className="hidden sm:block w-12 h-6 shrink-0">
                     <svg viewBox="0 0 100 30" className="w-full h-full stroke-indigo-400 stroke-2 fill-none stroke-linecap-round stroke-linejoin-round">
                       <path d="M0 15 Q 25 5, 50 15 T 100 15" />
                     </svg>
                  </div>

                  <div className="w-10 sm:w-12 h-6 bg-indigo-50 dark:bg-slate-700 rounded-full relative shrink-0">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-indigo-500 rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Channel Widget */}
        <div className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81] p-6 rounded-3xl shadow-xl text-white relative overflow-hidden flex flex-col">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/30 blur-[40px] pointer-events-none" />
          
          <div className="flex justify-between items-start mb-6 z-10">
            <h3 className="text-lg font-bold">Add New Channel</h3>
            <button className="text-indigo-200 hover:text-white transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <p className="text-sm text-indigo-200 mb-6 z-10 leading-relaxed">
            Create a new API gateway channel to start monitoring and monetizing your traffic securely.
          </p>

          <div className="mt-auto z-10 space-y-4">
            <div className="bg-white/10 border border-white/20 p-3 rounded-xl font-mono text-xs text-indigo-100 truncate">
              https://api.meterflow.io/v1/...
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
            >
              Configure Gateway API
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

      </div>

      {/* Provisioning Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 dark:border-slate-700 transform transition-all">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Provision New API</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {showSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white">API Provisioned!</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Your gateway is ready to proxy traffic.</p>
                  
                  <div className="mt-6 w-full text-left">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your API Key (Save this!)</label>
                    <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
                      <code className="text-sm text-indigo-600 dark:text-indigo-400 font-mono break-all">{generatedKey}</code>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setShowSuccess(false);
                      setIsModalOpen(false);
                      setApiName('');
                      setTargetUrl('');
                      setGeneratedKey('');
                    }}
                    className="mt-8 bg-slate-800 dark:bg-white text-white dark:text-slate-800 px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleProvision} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">API Name</label>
                    <input 
                      type="text" 
                      required
                      value={apiName}
                      onChange={(e) => setApiName(e.target.value)}
                      placeholder="e.g., Payment Service"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Target Backend URL (Reverse Proxy)</label>
                    <input 
                      type="url" 
                      required
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder="https://api.yourdomain.com/v1"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 ml-1">Traffic hitting the gateway will be forwarded here.</p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isProvisioning}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center min-w-[140px] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isProvisioning ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        "Generate API Key"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
