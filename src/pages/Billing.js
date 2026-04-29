import React, { useState, useEffect } from 'react';
import { CreditCard, Zap, Database, Download, Loader2, X, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { mockBillingHistory } from '../mockData';

const Billing = () => {
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState(mockBillingHistory);
  
  // Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('25.00');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:8081/api/payments/history');
      if (res.data && res.data.length > 0) {
        setInvoices(res.data);
      }
    } catch (e) {
      console.log("Using mock history");
    }
  };

  const openPaymentModal = (planName) => {
    setSelectedPlan(planName);
    setPaymentAmount(planName === 'Enterprise' ? '100.00' : '25.00');
    setIsPaymentModalOpen(true);
    setShowSuccess(false);
  };

  const handleProcessPayment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Process Payment & Save to DB
      await axios.post('http://localhost:8081/api/payments/process-mock', { 
        plan: selectedPlan,
        amount: paymentAmount
      });
      
      // Refresh History
      await fetchHistory();
      setShowSuccess(true);
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Plan Details & Next Payment */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Current Plan */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl shadow-[0_8px_30px_rgba(79,70,229,0.3)] text-white relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-white/10 blur-[40px]" />
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <p className="text-blue-200 text-sm font-medium mb-1">Current subscription plan</p>
                  <h3 className="text-3xl font-bold flex items-end gap-1">
                    $25<span className="text-lg font-normal text-blue-200">.00</span>
                  </h3>
                  <p className="text-blue-100 font-medium mt-1">Company Plus</p>
                </div>
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                  <Zap size={24} className="text-yellow-300 fill-yellow-300" />
                </div>
              </div>
              
              <button 
                onClick={() => openPaymentModal('Pro')}
                className="bg-white text-indigo-700 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg shadow-black/10 relative z-10 flex items-center gap-2">
                Change Plan
              </button>
            </div>

            {/* Next Payment */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex flex-col justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Next payment</p>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-white flex items-end gap-1">
                  $50<span className="text-lg font-normal text-slate-500 dark:text-slate-400">.00</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 font-medium mt-1">on May 15, 2024</p>
              </div>
              
              <button 
                onClick={() => openPaymentModal('Pro')}
                className="bg-slate-900 dark:bg-slate-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm w-max hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors shadow-md mt-4">
                Pay Now
              </button>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Payment history</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider">
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Payment Method</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {invoices.map((invoice, index) => (
                    <tr key={invoice.id || index} className="border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="py-4 font-bold text-slate-800 dark:text-white">{invoice.amount}</td>
                      <td className="py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                          invoice.status === 'Completed' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-4 text-slate-600 dark:text-slate-400 font-medium">{invoice.date}</td>
                      <td className="py-4 text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <CreditCard size={16} className="text-slate-400 dark:text-slate-500" />
                        {invoice.method}
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          <Download size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar widgets */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Payment Method */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white">Payment information</h3>
              <button className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Edit</button>
            </div>
            
            <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-4 text-white relative overflow-hidden shadow-lg shadow-slate-900/20 dark:shadow-none">
              <div className="absolute right-[-10%] bottom-[-20%] w-24 h-24 bg-white/10 rounded-full blur-xl" />
              <div className="flex justify-between items-center mb-4">
                <CreditCard size={24} className="text-white/80" />
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded-full bg-red-500 opacity-80 mix-blend-multiply"></div>
                  <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-80 mix-blend-multiply -ml-3"></div>
                </div>
              </div>
              <p className="font-mono tracking-widest mb-1 text-slate-200">**** **** **** 5432</p>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Mastercard</span>
                <span>Exp: 12/24</span>
              </div>
            </div>
          </div>

          {/* Usage/Storage Widget */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none text-center">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 dark:text-white">API Usage</h3>
              <Database size={18} className="text-slate-400 dark:text-slate-500" />
            </div>
            
            <div className="mb-4">
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
              </div>
              <p className="text-left text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Using <span className="text-slate-800 dark:text-white font-bold">650k</span> from 1M requests included
              </p>
            </div>

            <div className="bg-indigo-50 dark:bg-slate-900/50 rounded-2xl p-6 mt-6 border border-indigo-100/50 dark:border-slate-700">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-indigo-500 dark:text-indigo-400">
                <Zap size={32} />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white mb-2">Upgrade for more limits!</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                You are approaching your plan limit. Upgrade now to avoid service interruptions.
              </p>
              <button 
                onClick={() => openPaymentModal('Enterprise')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-indigo-600/20 dark:shadow-indigo-900/20 flex items-center justify-center gap-2">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Payment Form Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 dark:border-slate-700 transform transition-all">
            
            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Complete Payment</h3>
              <button 
                onClick={() => setIsPaymentModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {showSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white">Payment Successful!</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Your payment of ${paymentAmount} for {selectedPlan} plan has been processed and saved to the database.</p>
                  
                  <button 
                    onClick={() => setIsPaymentModalOpen(false)}
                    className="mt-8 bg-slate-800 dark:bg-white text-white dark:text-slate-800 px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleProcessPayment} className="space-y-5">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex justify-between items-center mb-6">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Selected Plan</p>
                      <p className="font-bold text-slate-800 dark:text-white">{selectedPlan} Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Amount</p>
                      <p className="font-bold text-indigo-600 dark:text-indigo-400">${paymentAmount}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        required
                        placeholder="0000 0000 0000 0000"
                        defaultValue="4242 4242 4242 4242"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-white placeholder-slate-400 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Expiry</label>
                      <input 
                        type="text" 
                        required
                        placeholder="MM/YY"
                        defaultValue="12/25"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-white placeholder-slate-400 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">CVC</label>
                      <input 
                        type="text" 
                        required
                        placeholder="123"
                        defaultValue="123"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-white placeholder-slate-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-700">
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        `Pay $${paymentAmount}`
                      )}
                    </button>
                    <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                      Payments are processed securely and stored in the database.
                    </p>
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

export default Billing;
