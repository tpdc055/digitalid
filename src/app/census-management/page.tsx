"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  Users,
  MapPin,
  ArrowLeft,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Eye,
  TrendingUp,
  TrendingDown,
  Calendar,
  Database,
  FileText,
  Globe,
  Activity,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import TopNavigation from '@/components/TopNavigation';

export default function CensusManagementPage() {
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [dateRange, setDateRange] = useState('2024');

  const censusStats = {
    totalPopulation: 9856234,
    registeredCitizens: 7234567,
    coveragePercentage: 73.4,
    malePopulation: 5123456,
    femalePopulation: 4732778,
    averageAge: 24.7,
    householdsRegistered: 1867432,
    birthsThisYear: 298765,
    deathsThisYear: 87654
  };

  const provinceData = [
    { name: 'National Capital District', population: 674640, registered: 612453, coverage: 90.8, households: 156780 },
    { name: 'Western Highlands', population: 362825, registered: 289456, coverage: 79.8, households: 89234 },
    { name: 'Morobe', population: 674810, registered: 445623, coverage: 66.0, households: 167834 },
    { name: 'Eastern Highlands', population: 579825, registered: 367234, coverage: 63.3, households: 143567 },
    { name: 'Southern Highlands', population: 515511, registered: 298765, coverage: 58.0, households: 127234 }
  ];

  const ageGroups = [
    { group: '0-14', population: 3456789, percentage: 35.1 },
    { group: '15-64', population: 5789234, percentage: 58.7 },
    { group: '65+', population: 610211, percentage: 6.2 }
  ];

  const registrationTrends = [
    { month: 'Jan 2024', registrations: 23456, target: 25000 },
    { month: 'Feb 2024', registrations: 28934, target: 25000 },
    { month: 'Mar 2024', registrations: 31245, target: 30000 },
    { month: 'Apr 2024', registrations: 27834, target: 30000 },
    { month: 'May 2024', registrations: 35678, target: 32000 },
    { month: 'Jun 2024', registrations: 42134, target: 35000 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <TopNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/digital-id">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Registry
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Census Data Management</h1>
              <p className="text-slate-600">National population and demographic data analysis</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Population</p>
                    <p className="text-2xl font-bold text-blue-600">{censusStats.totalPopulation.toLocaleString()}</p>
                  </div>
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-green-600">+2.1% from last census</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Registered Citizens</p>
                    <p className="text-2xl font-bold text-green-600">{censusStats.registeredCitizens.toLocaleString()}</p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="mt-2">
                  <Progress value={censusStats.coveragePercentage} className="h-2" />
                  <span className="text-xs text-gray-500">{censusStats.coveragePercentage}% coverage</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Households</p>
                    <p className="text-2xl font-bold text-purple-600">{censusStats.householdsRegistered.toLocaleString()}</p>
                  </div>
                  <Database className="h-6 w-6 text-purple-600" />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Avg 5.3 members per household
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Age</p>
                    <p className="text-2xl font-bold text-orange-600">{censusStats.averageAge}</p>
                  </div>
                  <Activity className="h-6 w-6 text-orange-600" />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Years (median age)
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="provincial">Provincial Data</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Population Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Population Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Urban Population</span>
                      <div className="flex items-center gap-2">
                        <Progress value={28} className="w-20" />
                        <span className="text-sm font-medium">28%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Rural Population</span>
                      <div className="flex items-center gap-2">
                        <Progress value={72} className="w-20" />
                        <span className="text-sm font-medium">72%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Coastal Areas</span>
                      <div className="flex items-center gap-2">
                        <Progress value={35} className="w-20" />
                        <span className="text-sm font-medium">35%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Highlands</span>
                      <div className="flex items-center gap-2">
                        <Progress value={45} className="w-20" />
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Age Groups */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Age Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ageGroups.map((group) => (
                      <div key={group.group} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{group.group} years</div>
                          <div className="text-sm text-gray-600">{group.population.toLocaleString()} people</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={group.percentage} className="w-20" />
                          <span className="text-sm font-medium">{group.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Coverage Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Registration Coverage by Province
                </CardTitle>
                <CardDescription>
                  Digital ID registration coverage across PNG provinces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-8 rounded-lg text-center">
                  <Globe className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                  <p className="text-gray-600 mb-4">
                    Provincial registration coverage visualization would be displayed here
                  </p>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Interactive Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Provincial Data Tab */}
          <TabsContent value="provincial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Provincial Registration Data</CardTitle>
                <CardDescription>
                  Digital ID registration statistics by province
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {provinceData.map((province) => (
                    <Card key={province.name} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{province.name}</h3>
                          <Badge className={`${
                            province.coverage > 80 ? 'bg-green-100 text-green-800' :
                            province.coverage > 60 ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {province.coverage}% covered
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Population:</span>
                            <div className="font-medium">{province.population.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Registered:</span>
                            <div className="font-medium">{province.registered.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Households:</span>
                            <div className="font-medium">{province.households.toLocaleString()}</div>
                          </div>
                        </div>
                        <Progress value={province.coverage} className="mt-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Demographics Tab */}
          <TabsContent value="demographics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gender Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Male</span>
                      <div className="flex items-center gap-2">
                        <Progress value={52} className="w-24" />
                        <span className="text-sm font-medium">52% ({censusStats.malePopulation.toLocaleString()})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Female</span>
                      <div className="flex items-center gap-2">
                        <Progress value={48} className="w-24" />
                        <span className="text-sm font-medium">48% ({censusStats.femalePopulation.toLocaleString()})</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vital Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Births this year</span>
                      <span className="font-medium text-green-600">+{censusStats.birthsThisYear.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Deaths this year</span>
                      <span className="font-medium text-red-600">-{censusStats.deathsThisYear.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Net population growth</span>
                      <span className="font-medium text-blue-600">+{(censusStats.birthsThisYear - censusStats.deathsThisYear).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generate Census Reports
                </CardTitle>
                <CardDescription>
                  Create comprehensive census and demographic reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <Download className="h-6 w-6" />
                    Population Report
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <Download className="h-6 w-6" />
                    Demographic Analysis
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <Download className="h-6 w-6" />
                    Provincial Summary
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <Download className="h-6 w-6" />
                    Registration Coverage
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <Download className="h-6 w-6" />
                    Household Data
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <Download className="h-6 w-6" />
                    Custom Report
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
