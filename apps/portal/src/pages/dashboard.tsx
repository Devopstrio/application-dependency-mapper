import React from 'react';

// Devopstrio ADM Platform Portal
// High-Level Architecture View: Impact Simulation and Global Topology
// React Force-Directed Graph placeholders utilized.

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-[#050511] text-slate-200 font-sans selection:bg-indigo-500/30">
            {/* Global Topbar */}
            <header className="border-b border-indigo-900/50 bg-[#050511]/80 backdrop-blur sticky top-0 z-50">
                <div className="max-w-screen-2xl mx-auto px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-fuchsia-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/20">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h1 className="text-lg font-bold text-white tracking-tight">App Dependency Mapper</h1>
                    </div>
                    <nav className="flex gap-6 text-sm font-semibold">
                        <a href="#" className="text-white">Topology Map</a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">Blast Radius Simulator</a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">Vulnerability Overlays</a>
                    </nav>
                </div>
            </header>

            <main className="max-w-screen-2xl mx-auto px-8 py-8">
                {/* Executive Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Platform Nodes Covered', value: '4,812', trend: '+14% this week', alert: false },
                        { label: 'Active Service Edges', value: '18,485', trend: '+5% this week', alert: false },
                        { label: 'Single Points of Failure', value: '23', trend: '-2 since yesterday', alert: true },
                        { label: 'CMDB Sync Accuracy', value: '98.4%', trend: 'Healthy', alert: false }
                    ].map((kpi, idx) => (
                        <div key={idx} className="bg-slate-900/40 p-6 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-colors">
                            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">{kpi.label}</div>
                            <div className={`text-3xl font-black ${kpi.alert ? 'text-rose-400' : 'text-white'}`}>{kpi.value}</div>
                            <div className="text-xs text-slate-500 mt-2">{kpi.trend}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Graph Visualiser Console (Conceptual Placeholder) */}
                    <div className="xl:col-span-2 bg-[#020617] rounded-3xl border border-indigo-500/20 p-6 h-[600px] relative overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center mb-4 z-10 relative">
                            <h2 className="text-lg font-bold text-white">Live Service Topology (Auto-Discovered)</h2>
                            <div className="flex gap-2">
                                <button className="bg-slate-800 text-xs px-3 py-1 rounded text-slate-300 font-bold hover:text-white">Filter: DBs Only</button>
                                <button className="bg-indigo-600 text-xs px-3 py-1 rounded text-white font-bold hover:bg-indigo-500">Run Rescan</button>
                            </div>
                        </div>

                        {/* Mock Graph Representation */}
                        <div className="flex-1 border border-dashed border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            {/* Abstract Nodes */}
                            <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-blue-500/20 border-2 border-blue-400 rounded-full flex flex-col items-center justify-center z-20 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                                <span className="text-[10px] font-bold text-white">API GW</span>
                            </div>

                            <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-purple-500/20 border-2 border-purple-400 rounded-lg flex flex-col items-center justify-center z-20">
                                <span className="text-[10px] font-bold text-white">Auth</span>
                            </div>

                            <div className="absolute bottom-1/4 left-1/2 w-16 h-16 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex flex-col items-center justify-center z-20">
                                <span className="text-[10px] font-bold text-white">Payments</span>
                            </div>

                            {/* Abstract Edges - SVG Lines */}
                            <svg className="absolute inset-0 w-full h-full z-10" pointerEvents="none">
                                <path d="M 33% 25% L 75% 50%" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                                <path d="M 33% 25% L 50% 75%" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="2" fill="none" />
                                <path d="M 50% 75% L 75% 50%" stroke="rgba(244, 63, 94, 0.6)" strokeWidth="3" fill="none" /> {/* High Risk Edge */}
                            </svg>

                            <p className="text-slate-500 text-sm font-mono absolute bottom-4 left-4 z-20">Neo4j Graph Renderer Initialized. 4812 Nodes bound.</p>
                        </div>
                    </div>

                    {/* Blast Radius Engine Panel */}
                    <div className="bg-slate-900/60 rounded-3xl border border-white/5 p-6 flex flex-col">
                        <h2 className="text-lg font-bold text-white mb-6">Blast Radius Simulator</h2>

                        <div className="mb-6">
                            <label className="text-xs text-slate-400 font-bold uppercase mb-2 block">Target Node (Simulate Failure)</label>
                            <input type="text" className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none" defaultValue="db-pay-01 (Payments PostgreSQL)" />
                        </div>

                        <button className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-lg transition-colors mb-8 shadow-lg shadow-rose-600/20">
                            Calculate Impact Traversal
                        </button>

                        <div className="flex-1 bg-black/30 rounded-xl p-4 border border-white/5 overflow-y-auto">
                            <h3 className="text-rose-400 font-bold text-sm mb-4">CRITICAL: 2 Systems Affected</h3>

                            <div className="space-y-3">
                                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-white text-sm font-bold">Payments Orchestrator API</span>
                                        <span className="text-[10px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded font-black max-w-max">Tier 1</span>
                                    </div>
                                    <p className="text-xs text-slate-400">Directly writes to target db-pay-01. Will experience 100% failure rate on checkout endpoints.</p>
                                </div>

                                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-white text-sm font-bold">Global API Gateway</span>
                                        <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-black">Tier 1</span>
                                    </div>
                                    <p className="text-xs text-slate-400">Upstream dependency of Payments API. Expect elevated 500 errors. Gateway will survive.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default Dashboard;
