import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Webhook, Zap, Save, BellRing, Lock, Key } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('api');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">System Settings</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Configure your gateway, rate limits, and webhooks.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          <button 
            onClick={() => setActiveTab('api')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
              activeTab === 'api' 
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <SettingsIcon size={18} />
            API Configuration
          </button>
          
          <button 
            onClick={() => setActiveTab('limits')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
              activeTab === 'limits' 
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Shield size={18} />
            Rate Limiting (Tokens)
          </button>
          
          <button 
            onClick={() => setActiveTab('webhooks')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
              activeTab === 'webhooks' 
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Webhook size={18} />
            Webhooks & Alerts
          </button>
          
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
              activeTab === 'security' 
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Lock size={18} />
            Security & Auth
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <form onSubmit={handleSave} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none min-h-[500px] flex flex-col">
            
            {activeTab === 'api' && (
              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Global API Settings</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Manage how the gateway interacts with your target endpoints.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Default Target URL</label>
                    <input 
                      type="url" 
                      defaultValue="https://api.yourdomain.com/v1"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-white"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">If an API channel doesn't specify a target, it will route here.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Timeout (ms)</label>
                    <input 
                      type="number" 
                      defaultValue="5000"
                      className="w-full md:w-1/3 px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'limits' && (
              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Rate Limiting</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Configure Token Bucket algorithm parameters to protect your upstream services.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl flex gap-4">
                    <Zap className="text-indigo-500 dark:text-indigo-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm">Token Bucket Enabled</h4>
                      <p className="text-xs text-indigo-700 dark:text-indigo-300/80 mt-1">
                        Requests are processed as long as there are tokens in the bucket. Once depleted, requests return a 429 Too Many Requests status.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Bucket Capacity</label>
                      <input 
                        type="number" 
                        defaultValue="1000"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-white"
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400">Maximum burst of requests allowed.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Refill Rate (Tokens/sec)</label>
                      <input 
                        type="number" 
                        defaultValue="100"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-white"
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400">Steady-state request processing rate.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'webhooks' && (
              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Webhooks & Alerts</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Set up automated notifications for billing thresholds and usage spikes.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl flex gap-4">
                    <BellRing className="text-emerald-500 dark:text-emerald-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">90% Limit Reached Alert</h4>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300/80 mt-1">
                        When a consumer API Key reaches 90% of its monthly quota, we will dispatch a POST request to your webhook URL.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Enable Webhook</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Endpoint URL</label>
                      <input 
                        type="url" 
                        placeholder="https://your-server.com/webhooks/meterflow"
                        defaultValue="https://hooks.slack.com/services/T000/B000/XXX"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Secret Key (for payload verification)</label>
                      <div className="relative">
                        <input 
                          type="password" 
                          defaultValue="whsec_1234567890abcdef"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-white"
                        />
                        <Key size={16} className="absolute left-4 top-3.5 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Security Settings</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Manage how keys are validated and handled.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white text-sm">Key Rotation Strategy</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Allow old keys to work for 24 hours after rotation.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white text-sm">IP Allowlisting</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Only allow gateway requests from specific IP ranges.</p>
                    </div>
                    <button type="button" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700">Configure</button>
                  </div>
                </div>
              </div>
            )}

            {/* Save Action */}
            <div className="pt-6 mt-auto border-t border-slate-100 dark:border-slate-700 flex justify-end">
              <button 
                type="submit"
                className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md ${
                  isSaved 
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
                }`}
              >
                {isSaved ? (
                  <>Saved Successfully</>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
