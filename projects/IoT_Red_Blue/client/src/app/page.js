"use client";

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Activity, Shield, AlertTriangle, Terminal, Settings,
  Database, RefreshCw, Book, Info, Menu, X, Cpu
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { format } from 'date-fns';

const API_BASE = 'http://localhost:3000/api';

export default function IoTDashboard() {
  const [stats, setStats] = useState({ totalReadings: 0, latest: [] });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [guideContent, setGuideContent] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const statsRes = await axios.get(`${API_BASE}/stats`);
      const logsRes = await axios.get(`${API_BASE}/logs`);
      setStats(statsRes.data);
      setLogs(logsRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard failed to fetch data", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const resetDB = async () => {
    if (confirm("Reset database? This requires admin credentials (internally).")) {
      try {
        await axios.post(`${API_BASE}/reset`, { username: 'admin', password: 'password123' });
        alert("Database Reset Successful");
      } catch (err) {
        alert("Reset Failed: Unauthorized");
      }
    }
  };

  const fetchGuide = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/guides/${id}`);
      setGuideContent(res.data.content);
      setSelectedGuide(id);
      setLoading(false);
    } catch (err) {
      alert("Failed to load guide. Make sure the server is healthy.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex transition-all duration-500">
      {/* Sidebar */}
      <aside className={`${isMenuOpen ? 'w-64' : 'w-20'} glass-panel m-4 flex flex-col transition-all duration-300 border-r-0`}>
        <div className="p-6 flex items-center gap-3">
          <Shield className="text-cyan-400 w-8 h-8 glow-cyan" />
          {isMenuOpen && <span className="font-bold text-xl tracking-tighter">CYBER<span className="text-cyan-400">HACK</span></span>}
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<Activity />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} collapsed={!isMenuOpen} />
          <NavItem icon={<Terminal />} label="Security Logs" active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} collapsed={!isMenuOpen} />
          <NavItem icon={<Book />} label="Lab Guides" active={activeTab === 'labs'} onClick={() => setActiveTab('labs')} collapsed={!isMenuOpen} />
          <NavItem icon={<Settings />} label="Control Panel" active={activeTab === 'admin'} onClick={() => setActiveTab('admin')} collapsed={!isMenuOpen} />
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full flex justify-center p-2 hover:bg-white/5 rounded-lg text-white/50"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold glow-cyan">{activeTab.toUpperCase()}</h1>
            <p className="text-white/40 text-sm">IoT Intrusion & Defense Simulator v1.5.0</p>
          </div>
          <div className="flex gap-4">
            <div className="glass-panel px-4 py-2 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono">SERVER: ONLINE</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <span className="text-xs font-mono text-cyan-400">{stats.totalReadings} PKTS</span>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Total Telemetry" value={stats.totalReadings} icon={<Database />} color="cyan" />
              <StatCard title="Security Alerts" value={logs.length} icon={<AlertTriangle />} color="red" pulse={logs.length > 0} />
              <StatCard title="Active Sensors" value={Array.from(new Set(stats.latest.map(s => s.deviceId))).length} icon={<Cpu />} color="green" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96">
              <div className="glass-panel p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" /> Live Traffic (Temperature)
                </h3>
                <ResponsiveContainer width="100%" height="90%">
                  <AreaChart data={stats.latest.reverse()}>
                    <defs>
                      <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="deviceId" hide />
                    <YAxis stroke="#ffffff40" fontSize={10} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #ffffff10', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="temp" stroke="#06b6d4" fillOpacity={1} fill="url(#colorTemp)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-panel p-6 overflow-hidden flex flex-col">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-red-500">
                  <AlertTriangle className="w-4 h-4" /> Recent Threat Logs
                </h3>
                <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                  {logs.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-white/20">
                      <Shield className="w-12 h-12 mb-2" />
                      <p>No active threats detected.</p>
                    </div>
                  ) : logs.map((log, i) => (
                    <div key={i} className="flex gap-3 text-sm border-l-2 border-red-500 bg-red-500/5 p-3 rounded-r-lg">
                      <div className="font-mono text-red-400 min-w-[70px]">{format(new Date(log.timestamp), 'HH:mm:ss')}</div>
                      <div className="flex-1">
                        <span className="font-bold text-red-300">[{log.type}]</span> {log.message}
                        <div className="text-[10px] text-white/30 uppercase">{log.ip}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="glass-panel p-6 h-[70vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Terminal className="text-cyan-400" /> System Egress Log
              </h2>
            </div>
            <div className="flex-1 font-mono text-xs overflow-y-auto space-y-1 bg-black/40 p-4 rounded-lg">
              {logs.map((log, i) => (
                <div key={i} className={`flex gap-4 p-1 hover:bg-white/5 ${log.type === 'ALERT' ? 'text-red-400' : 'text-cyan-400/70'}`}>
                  <span className="opacity-40">[{log.timestamp}]</span>
                  <span className="font-bold min-w-[60px]">{log.type}</span>
                  <span className="opacity-60">源IP: {log.ip}</span>
                  <span className="text-white/90">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'labs' && (
          <div className="glass-panel p-8">
            {!selectedGuide ? (
              <>
                <h1 className="text-2xl mb-8 flex items-center gap-4">
                  <Book className="text-cyan-400" /> Lab Instructor Guide
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
                  {[
                    { id: 'A', title: 'Static Spoofing', desc: 'Learn to intercept and replay HTTP traffic.' },
                    { id: 'B', title: 'NoSQL Injection', desc: 'Identify hidden devices using query operators.' },
                    { id: 'C', title: 'Brute Force', desc: 'Crack admin login with credential stuffing.' },
                    { id: 'D', title: 'Denial of Service', desc: 'Flood the system to disrupt legitimate nodes.' },
                    { id: 'E', title: 'Defense & Analysis', desc: 'Using this dashboard to mitigate threats.' }
                  ].map(lab => (
                    <div
                      key={lab.id}
                      onClick={() => fetchGuide(lab.id)}
                      className="glass-panel p-6 hover:border-cyan-400/50 transition-colors group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400 font-bold mb-4 group-hover:scale-110 transition-transform">
                        {lab.id}
                      </div>
                      <h3 className="font-bold text-lg mb-2">{lab.title}</h3>
                      <p className="text-white/50 text-sm mb-4">{lab.desc}</p>
                      <button className="text-cyan-400 text-xs font-bold hover:underline">READ GUIDE &rarr;</button>
                    </div>
                  ))}
                </div>
                <div className="mt-12 bg-white/5 p-6 rounded-xl flex items-center gap-6">
                  <Info className="text-cyan-400 w-12 h-12" />
                  <div>
                    <h4 className="font-bold italic">Lab Environment Note</h4>
                    <p className="text-sm text-white/60">This dashboard is part of your Blue Team toolkit. Use it to observe Red Team activities in real-time. All guides are located in the <code>/docs</code> directory of the project root.</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col h-[70vh]">
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={() => setSelectedGuide(null)}
                    className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors"
                  >
                    <Activity className="rotate-180 w-4 h-4" /> BACK TO LABS
                  </button>
                  <h2 className="text-xl font-bold">Lab Phase {selectedGuide}: Instructions</h2>
                </div>
                <div className="flex-1 bg-black/40 rounded-xl p-8 overflow-y-auto font-mono text-sm border border-white/5 whitespace-pre-wrap">
                  {guideContent}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="max-w-2xl mx-auto py-12">
            <div className="glass-panel p-8 border-red-500/20">
              <div className="flex items-center gap-4 mb-8">
                <Settings className="text-red-500 w-12 h-12" />
                <div>
                  <h2 className="text-2xl font-bold">System Control Panel</h2>
                  <p className="text-white/40">Destructive actions and system configuration.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
                  <h3 className="font-bold mb-2 flex items-center gap-2"><AlertTriangle className="text-red-500 w-4 h-4" /> Emergency Database Purge</h3>
                  <p className="text-sm text-white/60 mb-6">Clears all historical sensor data. This cannot be undone. Useful for resetting the lab state.</p>
                  <button
                    onClick={resetDB}
                    className="cyber-button cyber-button-red w-full justify-center"
                  >
                    <RefreshCw className="w-4 h-4" /> RESET SYSTEM DATABASE
                  </button>
                </div>

                <div className="p-6 border border-white/10 rounded-xl">
                  <h3 className="font-bold mb-2">Simulated Network Latency</h3>
                  <p className="text-sm text-white/40 mb-4">Add artificial lag to incoming packets (Conceptual).</p>
                  <input type="range" className="w-full accent-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick, collapsed }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${active ? 'bg-cyan-500/20 text-cyan-400 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)] border border-cyan-400/20' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
    >
      <span className={active ? 'glow-cyan' : ''}>{React.cloneElement(icon, { size: 20 })}</span>
      {!collapsed && <span className="font-medium text-sm tracking-wide">{label}</span>}
    </button>
  );
}

function StatCard({ title, value, icon, color, pulse }) {
  const colors = {
    cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    red: 'text-red-400 bg-red-400/10 border-red-400/20',
    green: 'text-green-400 bg-green-400/10 border-green-400/20'
  };

  return (
    <div className="glass-panel p-6 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500 ${colors[color].split(' ')[0]}`}>
        {React.cloneElement(icon, { size: 64 })}
      </div>
      <div className="relative z-10">
        <div className="text-white/40 text-xs font-mono mb-1 uppercase tracking-widest">{title}</div>
        <div className={`text-4xl font-bold ${pulse ? 'animate-pulse' : ''} ${colors[color].split(' ')[0]}`}>{value}</div>
      </div>
      {pulse && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-ping" />}
    </div>
  );
}
