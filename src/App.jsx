import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Zap, TrendingUp, AlertTriangle, Database, Shield, CheckCircle, XCircle, Radio, Server } from 'lucide-react';

export default function EnergyAnalyticsPlatform() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [realTimeData, setRealTimeData] = useState([]);
  const [scadaStatus, setScadaStatus] = useState('connected');
  const [alerts, setAlerts] = useState([]);
  const [systemHealth, setSystemHealth] = useState({
    cpu: 45,
    memory: 62,
    disk: 38,
    network: 85
  });

  // Simulate real-time energy data
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const newData = {
        time: timestamp,
        load: Math.floor(Math.random() * 1000) + 800,
        generation: Math.floor(Math.random() * 900) + 850,
        voltage: (Math.random() * 5 + 230).toFixed(2),
        frequency: (Math.random() * 0.2 + 59.9).toFixed(2),
        powerFactor: (Math.random() * 0.1 + 0.9).toFixed(3)
      };

      setRealTimeData(prev => {
        const updated = [...prev, newData];
        return updated.slice(-20);
      });

      // Simulate alerts
      if (Math.random() > 0.95) {
        const alertTypes = [
          { type: 'warning', message: 'High load detected in Sector 3', severity: 'medium' },
          { type: 'critical', message: 'Voltage fluctuation detected', severity: 'high' },
          { type: 'info', message: 'Scheduled maintenance in 2 hours', severity: 'low' }
        ];
        const newAlert = {
          ...alertTypes[Math.floor(Math.random() * alertTypes.length)],
          timestamp: new Date().toLocaleString(),
          id: Date.now()
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 5));
      }

      // Update system health
      setSystemHealth({
        cpu: Math.floor(Math.random() * 30 + 40),
        memory: Math.floor(Math.random() * 20 + 55),
        disk: Math.floor(Math.random() * 15 + 35),
        network: Math.floor(Math.random() * 25 + 75)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const historicalData = [
    { month: 'Jan', consumption: 4200, generation: 4500, efficiency: 93 },
    { month: 'Feb', consumption: 3800, generation: 4100, efficiency: 95 },
    { month: 'Mar', consumption: 4000, generation: 4300, efficiency: 94 },
    { month: 'Apr', consumption: 4500, generation: 4800, efficiency: 92 },
    { month: 'May', consumption: 5000, generation: 5300, efficiency: 91 },
    { month: 'Jun', consumption: 5500, generation: 5800, efficiency: 90 }
  ];

  const gridMetrics = [
    { name: 'Grid A', capacity: 2500, current: 2100, utilization: 84 },
    { name: 'Grid B', capacity: 3000, current: 2700, utilization: 90 },
    { name: 'Grid C', capacity: 2000, current: 1600, utilization: 80 },
    { name: 'Grid D', capacity: 2800, current: 2300, utilization: 82 }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          icon={<Zap className="w-8 h-8 text-yellow-500" />}
          title="Current Load"
          value={realTimeData.length > 0 ? `${realTimeData[realTimeData.length - 1].load} MW` : '0 MW'}
          trend="+5.2%"
          trendUp={true}
        />
        <MetricCard 
          icon={<Activity className="w-8 h-8 text-green-500" />}
          title="Generation"
          value={realTimeData.length > 0 ? `${realTimeData[realTimeData.length - 1].generation} MW` : '0 MW'}
          trend="+3.8%"
          trendUp={true}
        />
        <MetricCard 
          icon={<TrendingUp className="w-8 h-8 text-blue-500" />}
          title="Efficiency"
          value="92.5%"
          trend="+1.2%"
          trendUp={true}
        />
        <MetricCard 
          icon={<AlertTriangle className="w-8 h-8 text-red-500" />}
          title="Active Alerts"
          value={alerts.length.toString()}
          trend={alerts.length > 3 ? 'High' : 'Normal'}
          trendUp={false}
        />
      </div>

      {/* Real-Time Monitoring */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Real-Time Power Flow</h3>
          <div className="flex items-center space-x-2">
            <Radio className={`w-5 h-5 ${scadaStatus === 'connected' ? 'text-green-500' : 'text-red-500'}`} />
            <span className={`text-sm font-medium ${scadaStatus === 'connected' ? 'text-green-600' : 'text-red-600'}`}>
              SCADA {scadaStatus.toUpperCase()}
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={realTimeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="load" stroke="#ef4444" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="generation" stroke="#10b981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Grid Status and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grid Utilization */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Grid Utilization</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={gridMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="capacity" fill="#94a3b8" />
              <Bar dataKey="current" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Active Alerts */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Active Alerts</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                <p>No active alerts</p>
              </div>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                  alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                  alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`font-semibold ${
                        alert.severity === 'high' ? 'text-red-700' :
                        alert.severity === 'medium' ? 'text-yellow-700' :
                        'text-blue-700'
                      }`}>{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                    </div>
                    <AlertTriangle className={`w-5 h-5 ${
                      alert.severity === 'high' ? 'text-red-500' :
                      alert.severity === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Historical Energy Trends</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="consumption" stackId="1" stroke="#ef4444" fill="#fca5a5" />
            <Area type="monotone" dataKey="generation" stackId="2" stroke="#10b981" fill="#86efac" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Efficiency Trends</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[85, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Peak Demand Analysis</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Today Peak</span>
              <span className="font-bold text-blue-600">5,234 MW</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Weekly Avg</span>
              <span className="font-bold text-green-600">4,876 MW</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly High</span>
              <span className="font-bold text-red-600">5,800 MW</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Forecast Tomorrow</span>
              <span className="font-bold text-purple-600">5,100 MW</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Carbon Metrics</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">CO₂ Avoided</span>
              <span className="font-bold text-green-600">1,245 tons</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Renewable %</span>
              <span className="font-bold text-blue-600">34.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Carbon Intensity</span>
              <span className="font-bold text-yellow-600">420 g/kWh</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Target Progress</span>
              <span className="font-bold text-purple-600">67%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSCADA = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">SCADA System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Connection Status</h4>
            <div className="space-y-2">
              {['Substation A', 'Substation B', 'Substation C', 'Control Center'].map((station, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">{station}</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">Online</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Real-Time Parameters</h4>
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Voltage</span>
                  <span className="font-bold text-blue-600">
                    {realTimeData.length > 0 ? `${realTimeData[realTimeData.length - 1].voltage} kV` : '0 kV'}
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '98%'}}></div>
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Frequency</span>
                  <span className="font-bold text-green-600">
                    {realTimeData.length > 0 ? `${realTimeData[realTimeData.length - 1].frequency} Hz` : '0 Hz'}
                  </span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
              <div className="p-3 bg-yellow-50 rounded">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Power Factor</span>
                  <span className="font-bold text-yellow-600">
                    {realTimeData.length > 0 ? realTimeData[realTimeData.length - 1].powerFactor : '0'}
                  </span>
                </div>
                <div className="w-full bg-yellow-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: '95%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">NERC CIP Compliance Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { standard: 'CIP-002-5.1', status: 'Compliant', score: 100 },
            { standard: 'CIP-003-8', status: 'Compliant', score: 100 },
            { standard: 'CIP-005-6', status: 'Compliant', score: 98 },
            { standard: 'CIP-007-6', status: 'Review', score: 95 },
            { standard: 'CIP-010-3', status: 'Compliant', score: 100 },
            { standard: 'CIP-011-2', status: 'Compliant', score: 100 }
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-lg border-2 ${
              item.status === 'Compliant' ? 'bg-green-50 border-green-500' : 'bg-yellow-50 border-yellow-500'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-800">{item.standard}</span>
                {item.status === 'Compliant' ? 
                  <CheckCircle className="w-5 h-5 text-green-600" /> :
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                }
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  item.status === 'Compliant' ? 'text-green-700' : 'text-yellow-700'
                }`}>{item.status}</span>
                <span className="text-sm font-bold text-gray-700">{item.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSystem = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">System Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'CPU Usage', value: systemHealth.cpu, icon: <Server className="w-6 h-6" />, color: 'blue' },
            { name: 'Memory', value: systemHealth.memory, icon: <Database className="w-6 h-6" />, color: 'green' },
            { name: 'Disk I/O', value: systemHealth.disk, icon: <Activity className="w-6 h-6" />, color: 'purple' },
            { name: 'Network', value: systemHealth.network, icon: <Radio className="w-6 h-6" />, color: 'yellow' }
          ].map((metric, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-${metric.color}-600`}>{metric.icon}</span>
                <span className="text-2xl font-bold text-gray-800">{metric.value}%</span>
              </div>
              <p className="text-sm text-gray-600">{metric.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`bg-${metric.color}-600 h-2 rounded-full`} 
                  style={{width: `${metric.value}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Deployment Status</h3>
          <div className="space-y-3">
            {[
              { env: 'Production', version: 'v2.4.1', status: 'Healthy', pods: '12/12' },
              { env: 'Staging', version: 'v2.5.0-rc1', status: 'Healthy', pods: '3/3' },
              { env: 'Development', version: 'v2.5.0-dev', status: 'Updating', pods: '2/3' }
            ].map((dep, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-bold text-gray-800">{dep.env}</p>
                    <p className="text-sm text-gray-600">Version: {dep.version}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      dep.status === 'Healthy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {dep.status}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">Pods: {dep.pods}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Security Scans</h3>
          <div className="space-y-3">
            {[
              { tool: 'Snyk', status: 'Passed', vulnerabilities: 0, lastScan: '5 min ago' },
              { tool: 'Trivy', status: 'Passed', vulnerabilities: 0, lastScan: '10 min ago' },
              { tool: 'Semgrep', status: 'Warning', vulnerabilities: 2, lastScan: '15 min ago' },
              { tool: 'NERC CIP Check', status: 'Passed', vulnerabilities: 0, lastScan: '1 hour ago' }
            ].map((scan, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className={`w-6 h-6 ${
                    scan.status === 'Passed' ? 'text-green-600' : 'text-yellow-600'
                  }`} />
                  <div>
                    <p className="font-bold text-gray-800">{scan.tool}</p>
                    <p className="text-sm text-gray-600">{scan.lastScan}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    scan.status === 'Passed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {scan.status}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{scan.vulnerabilities} issues</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="w-10 h-10 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Energy Analytics Platform</h1>
                <p className="text-sm text-gray-600">Real-Time SCADA Monitoring & Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">System Status</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-5 h-5" /> },
              { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-5 h-5" /> },
              { id: 'scada', label: 'SCADA', icon: <Radio className="w-5 h-5" /> },
              { id: 'system', label: 'System', icon: <Server className="w-5 h-5" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'scada' && renderSCADA()}
        {activeTab === 'system' && renderSystem()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>© 2025 Energy Analytics Platform. NERC CIP Compliant.</p>
            <p>Deployed via GitLab CI/CD | Monitored by Prometheus & Grafana</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MetricCard({ icon, title, value, trend, trendUp }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-3">
        {icon}
        <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-gray-600'}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}