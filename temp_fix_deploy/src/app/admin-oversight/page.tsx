"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Shield,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  MapPin,
  Clock,
  Database,
  Server,
  Monitor,
  Settings,
  Eye,
  Download,
  RefreshCw,
  ArrowLeft,
  Search,
  Filter,
  Bell,
  Flag,
  Zap,
  Globe,
  Smartphone,
  WifiOff,
  UserCheck,
  UserX,
  FileText,
  Calendar,
  Target
} from 'lucide-react';
import Link from 'next/link';
import TopNavigation from '@/components/TopNavigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Cell, AreaChart, Area } from 'recharts';

export default function AdminOversightPage() {
  const [userRole] = useState<'super_admin' | 'admin' | 'supervisor' | 'analyst'>('super_admin');
  const [refreshTime, setRefreshTime] = useState(new Date());
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [alerts, setAlerts] = useState([]);
  const [systemHealth, setSystemHealth] = useState({
    overall: 98,
    api: 99,
    database: 97,
    sync: 95,
    mobile: 92
  });

  // Mock real-time data
  const [dashboardData, setDashboardData] = useState({
    totalRegistrations: 1247892,
    dailyRegistrations: 1456,
    activeAgents: 456,
    mobileUnits: 89,
    pendingVerifications: 2341,
    fraudAlerts: 12,
    systemUptime: 99.97,
    avgProcessingTime: 2.3,
    provinceCoverage: 13.9,
    biometricCaptures: 1189453,
    documentUploads: 1534782,
    apiRequests: 89765,
    errorRate: 0.02
  });

  const registrationTrends = [
    { month: 'Aug', registrations: 45000, target: 50000 },
    { month: 'Sep', registrations: 52000, target: 55000 },
    { month: 'Oct', registrations: 48000, target: 60000 },
    { month: 'Nov', registrations: 67000, target: 65000 },
    { month: 'Dec', registrations: 78000, target: 70000 },
    { month: 'Jan', registrations: 89000, target: 75000 }
  ];

  const provinceData = [
    { name: 'NCD', registrations: 234567, coverage: 45.2, color: '#8884d8' },
    { name: 'Morobe', registrations: 156789, coverage: 23.4, color: '#82ca9d' },
    { name: 'Western Highlands', registrations: 134567, coverage: 18.9, color: '#ffc658' },
    { name: 'Southern Highlands', registrations: 123456, coverage: 16.7, color: '#ff7300' },
    { name: 'Others', registrations: 598513, coverage: 12.1, color: '#8dd1e1' }
  ];

  const hourlyActivity = [
    { hour: '00', enrollments: 23, verifications: 145 },
    { hour: '06', enrollments: 45, verifications: 234 },
    { hour: '08', enrollments: 89, verifications: 456 },
    { hour: '10', enrollments: 134, verifications: 678 },
    { hour: '12', enrollments: 156, verifications: 789 },
    { hour: '14', enrollments: 178, verifications: 834 },
    { hour: '16', enrollments: 145, verifications: 567 },
    { hour: '18', enrollments: 89, verifications: 345 },
    { hour: '20', enrollments: 67, verifications: 234 },
    { hour: '22', enrollments: 34, verifications: 123 }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Mobile Unit Offline',
      message: 'Mobile Unit MU-045 in Enga Province has been offline for 6 hours',
      timestamp: '2024-01-20T10:30:00Z',
      category: 'connectivity'
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Processing Load',
      message: 'Document processing queue has reached 85% capacity',
      timestamp: '2024-01-20T09:15:00Z',
      category: 'performance'
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'Database maintenance scheduled for tonight 02:00 AM',
      timestamp: '2024-01-20T08:45:00Z',
      category: 'maintenance'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Suspicious Activity',
      message: '5 failed biometric verification attempts from same location',
      timestamp: '2024-01-20T08:30:00Z',
      category: 'security'
    }
  ];

  const mobileUnitsStatus = [
    { id: 'MU-001', location: 'Port Moresby', status: 'online', enrollments: 23, lastSync: '2 min ago' },
    { id: 'MU-045', location: 'Enga Province', status: 'offline', enrollments: 0, lastSync: '6 hours ago' },
    { id: 'MU-078', location: 'Mount Hagen', status: 'online', enrollments: 15, lastSync: '5 min ago' },
    { id: 'MU-089', location: 'Madang', status: 'syncing', enrollments: 8, lastSync: 'syncing...' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(new Date());
      // Simulate real-time updates
      setDashboardData(prev => ({
        ...prev,
        dailyRegistrations: prev.dailyRegistrations + Math.floor(Math.random() * 3),
        apiRequests: prev.apiRequests + Math.floor(Math.random() * 50)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-orange-500 bg-orange-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'syncing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportReport = (type) => {
    const reportData = {
      type,
      generatedAt: new Date().toISOString(),
      timeRange: selectedTimeRange,
      data: dashboardData,
      alerts: systemAlerts,
      mobileUnits: mobileUnitsStatus
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const fileName = `admin_report_${type}_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', fileName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      <TopNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/digital-id">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Digital ID
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Administrative Oversight Dashboard</h1>
              <p className="text-slate-600">System monitoring, analytics, and administration</p>
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                System Operational
              </Badge>
              <span className="text-sm text-gray-600">
                Last updated: {refreshTime.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Units</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Registrations</p>
                      <p className="text-2xl font-bold text-blue-600">{dashboardData.totalRegistrations.toLocaleString()}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-green-600">+{dashboardData.dailyRegistrations} today</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Agents</p>
                      <p className="text-2xl font-bold text-green-600">{dashboardData.activeAgents}</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-gray-600">Across 22 provinces</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Mobile Units</p>
                      <p className="text-2xl font-bold text-purple-600">{dashboardData.mobileUnits}</p>
                    </div>
                    <Smartphone className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-gray-600">4 offline units</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">System Uptime</p>
                      <p className="text-2xl font-bold text-emerald-600">{dashboardData.systemUptime}%</p>
                    </div>
                    <Activity className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-gray-600">Last 30 days</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  System Health Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-5 gap-4">
                  {Object.entries(systemHealth).map(([component, health]) => (
                    <div key={component} className="text-center">
                      <div className="mb-2">
                        <div className={`text-2xl font-bold ${health >= 95 ? 'text-green-600' : health >= 90 ? 'text-orange-600' : 'text-red-600'}`}>
                          {health}%
                        </div>
                        <div className="text-xs text-gray-600 capitalize">{component}</div>
                      </div>
                      <Progress value={health} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  System Alerts
                  <Badge className="bg-red-100 text-red-800">
                    {systemAlerts.filter(alert => alert.type === 'critical').length} Critical
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemAlerts.slice(0, 4).map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{alert.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {alert.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(alert.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Investigate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Registration Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Registration Trends</CardTitle>
                  <CardDescription>Monthly registration vs targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={registrationTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="registrations" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="target" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Province Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Province Coverage</CardTitle>
                  <CardDescription>Registration distribution by province</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={provinceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="registrations"
                        label={({ name, coverage }) => `${name}: ${coverage}%`}
                      >
                        {provinceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Activity Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Activity Pattern</CardTitle>
                <CardDescription>Enrollments and verifications by hour</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hourlyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="enrollments" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="verifications" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mobile Units Tab */}
          <TabsContent value="mobile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Mobile Unit Status
                </CardTitle>
                <CardDescription>
                  Real-time status of mobile registration units across PNG
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mobileUnitsStatus.map((unit) => (
                    <Card key={unit.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{unit.id}</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                {unit.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3" />
                                Last sync: {unit.lastSync}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(unit.status)}>
                              {unit.status.toUpperCase()}
                            </Badge>
                            <div className="mt-2 text-sm text-gray-600">
                              {unit.enrollments} enrollments today
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generate Reports
                </CardTitle>
                <CardDescription>
                  Export comprehensive reports for analysis and compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => exportReport('registration')}
                    variant="outline"
                    className="h-24 flex-col gap-2"
                  >
                    <Download className="h-6 w-6" />
                    Registration Report
                  </Button>
                  <Button
                    onClick={() => exportReport('security')}
                    variant="outline"
                    className="h-24 flex-col gap-2"
                  >
                    <Download className="h-6 w-6" />
                    Security Report
                  </Button>
                  <Button
                    onClick={() => exportReport('performance')}
                    variant="outline"
                    className="h-24 flex-col gap-2"
                  >
                    <Download className="h-6 w-6" />
                    Performance Report
                  </Button>
                  <Button
                    onClick={() => exportReport('compliance')}
                    variant="outline"
                    className="h-24 flex-col gap-2"
                  >
                    <Download className="h-6 w-6" />
                    Compliance Report
                  </Button>
                  <Button
                    onClick={() => exportReport('mobile')}
                    variant="outline"
                    className="h-24 flex-col gap-2"
                  >
                    <Download className="h-6 w-6" />
                    Mobile Units Report
                  </Button>
                  <Button
                    onClick={() => exportReport('analytics')}
                    variant="outline"
                    className="h-24 flex-col gap-2"
                  >
                    <Download className="h-6 w-6" />
                    Analytics Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
