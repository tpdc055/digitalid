"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Users,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  RefreshCw,
  User,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText,
  Key,
  AlertTriangle,
  MoreHorizontal,
  Settings
} from 'lucide-react';

interface DigitalIdUser {
  id: string;
  digitalIdNumber: string;
  personalInfo: {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    placeOfBirth: string;
    gender: string;
    citizenship: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    province: string;
    district?: string;
  };
  verificationInfo: {
    tier: number;
    level: string;
    status: 'pending' | 'verified' | 'suspended' | 'revoked';
    verifiedAt?: string;
    expiresAt?: string;
  };
  biometricData: {
    fingerprint: boolean;
    facial: boolean;
    iris: boolean;
    voice: boolean;
  };
  issuedCredentials: string[];
  registrationDate: string;
  lastActivity: string;
  statusHistory: Array<{
    status: string;
    timestamp: string;
    reason?: string;
    officer?: string;
  }>;
}

interface UserRegistryProps {
  role?: 'admin' | 'operator' | 'viewer';
  onUserSelect?: (user: DigitalIdUser) => void;
}

export default function UserRegistry({ role = 'viewer', onUserSelect }: UserRegistryProps) {
  const [users, setUsers] = useState<DigitalIdUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<DigitalIdUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<DigitalIdUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  // Mock data - in real implementation this would come from API
  useEffect(() => {
    const mockUsers: DigitalIdUser[] = [
      {
        id: 'user_001',
        digitalIdNumber: 'PNG2024001234',
        personalInfo: {
          firstName: 'John',
          middleName: 'Peter',
          lastName: 'Doe',
          dateOfBirth: '1990-05-15',
          placeOfBirth: 'Port Moresby, NCD',
          gender: 'male',
          citizenship: 'Papua New Guinea'
        },
        contactInfo: {
          email: 'john.doe@email.com',
          phone: '+675 123 4567',
          address: '123 Main Street, Port Moresby',
          province: 'National Capital District',
          district: 'Port Moresby'
        },
        verificationInfo: {
          tier: 3,
          level: 'Enhanced',
          status: 'verified',
          verifiedAt: '2024-01-15T10:30:00Z',
          expiresAt: '2025-01-15T10:30:00Z'
        },
        biometricData: {
          fingerprint: true,
          facial: true,
          iris: false,
          voice: false
        },
        issuedCredentials: ['qr_code', 'digital_certificate', 'mobile_wallet'],
        registrationDate: '2024-01-10T09:00:00Z',
        lastActivity: '2024-01-20T14:22:00Z',
        statusHistory: [
          { status: 'pending', timestamp: '2024-01-10T09:00:00Z' },
          { status: 'verified', timestamp: '2024-01-15T10:30:00Z', officer: 'admin_001' }
        ]
      },
      {
        id: 'user_002',
        digitalIdNumber: 'PNG2024002345',
        personalInfo: {
          firstName: 'Mary',
          lastName: 'Smith',
          dateOfBirth: '1985-08-22',
          placeOfBirth: 'Lae, Morobe',
          gender: 'female',
          citizenship: 'Papua New Guinea'
        },
        contactInfo: {
          email: 'mary.smith@email.com',
          phone: '+675 234 5678',
          address: '456 Second Street, Lae',
          province: 'Morobe',
          district: 'Lae'
        },
        verificationInfo: {
          tier: 2,
          level: 'Standard',
          status: 'pending',
          verifiedAt: undefined,
          expiresAt: undefined
        },
        biometricData: {
          fingerprint: true,
          facial: false,
          iris: false,
          voice: false
        },
        issuedCredentials: ['qr_code'],
        registrationDate: '2024-01-18T11:15:00Z',
        lastActivity: '2024-01-19T16:45:00Z',
        statusHistory: [
          { status: 'pending', timestamp: '2024-01-18T11:15:00Z' }
        ]
      },
      {
        id: 'user_003',
        digitalIdNumber: 'PNG2024003456',
        personalInfo: {
          firstName: 'James',
          middleName: 'Paul',
          lastName: 'Wilson',
          dateOfBirth: '1975-12-03',
          placeOfBirth: 'Mount Hagen, WHP',
          gender: 'male',
          citizenship: 'Papua New Guinea'
        },
        contactInfo: {
          email: 'james.wilson@email.com',
          phone: '+675 345 6789',
          address: '789 Third Avenue, Mount Hagen',
          province: 'Western Highlands',
          district: 'Mount Hagen'
        },
        verificationInfo: {
          tier: 4,
          level: 'Maximum',
          status: 'verified',
          verifiedAt: '2024-01-12T08:20:00Z',
          expiresAt: '2025-01-12T08:20:00Z'
        },
        biometricData: {
          fingerprint: true,
          facial: true,
          iris: true,
          voice: true
        },
        issuedCredentials: ['qr_code', 'digital_certificate', 'mobile_wallet', 'nfc_card'],
        registrationDate: '2024-01-08T13:45:00Z',
        lastActivity: '2024-01-20T09:15:00Z',
        statusHistory: [
          { status: 'pending', timestamp: '2024-01-08T13:45:00Z' },
          { status: 'verified', timestamp: '2024-01-12T08:20:00Z', officer: 'admin_002' }
        ]
      }
    ];

    setLoading(true);
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.digitalIdNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${user.personalInfo.firstName} ${user.personalInfo.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.contactInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.contactInfo.phone.includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.verificationInfo.status === statusFilter);
    }

    // Tier filter
    if (tierFilter !== 'all') {
      filtered = filtered.filter(user => user.verificationInfo.tier.toString() === tierFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, statusFilter, tierFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-orange-100 text-orange-800';
      case 'revoked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1: return 'bg-blue-100 text-blue-800';
      case 2: return 'bg-green-100 text-green-800';
      case 3: return 'bg-orange-100 text-orange-800';
      case 4: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUserAction = (action: string, user: DigitalIdUser) => {
    switch (action) {
      case 'view':
        setSelectedUser(user);
        setShowDetails(true);
        if (onUserSelect) onUserSelect(user);
        break;
      case 'edit':
        console.log('Edit user:', user.id);
        break;
      case 'suspend':
        console.log('Suspend user:', user.id);
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this user?')) {
          console.log('Delete user:', user.id);
        }
        break;
      default:
        break;
    }
  };

  const exportData = () => {
    const csvData = filteredUsers.map(user => ({
      'Digital ID': user.digitalIdNumber,
      'Name': `${user.personalInfo.firstName} ${user.personalInfo.lastName}`,
      'Email': user.contactInfo.email,
      'Phone': user.contactInfo.phone,
      'Province': user.contactInfo.province,
      'Tier': user.verificationInfo.tier,
      'Status': user.verificationInfo.status,
      'Registration Date': new Date(user.registrationDate).toLocaleDateString(),
      'Last Activity': new Date(user.lastActivity).toLocaleDateString()
    }));

    const csvString = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `png_digital_id_users_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2">Loading user registry...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            PNG Digital ID User Registry
          </h1>
          <p className="text-gray-600">
            Manage and monitor all registered Digital ID users
          </p>
        </div>
        <div className="flex gap-2">
          {role === 'admin' && (
            <>
              <Button variant="outline" onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-bold">{users.filter(u => u.verificationInfo.status === 'verified').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{users.filter(u => u.verificationInfo.status === 'pending').length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Today</p>
                <p className="text-2xl font-bold">{users.filter(u =>
                  new Date(u.lastActivity).toDateString() === new Date().toDateString()
                ).length}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by ID, name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="revoked">Revoked</option>
              </select>
            </div>
            <div>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Tiers</option>
                <option value="1">Tier 1</option>
                <option value="2">Tier 2</option>
                <option value="3">Tier 3</option>
                <option value="4">Tier 4</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Complete list of PNG Digital ID users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Digital ID</th>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Contact</th>
                  <th className="text-left p-3">Location</th>
                  <th className="text-left p-3">Tier</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Last Activity</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-mono text-sm">{user.digitalIdNumber}</div>
                      <div className="text-xs text-gray-500">
                        {user.issuedCredentials.length} credentials
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">
                        {user.personalInfo.firstName} {user.personalInfo.lastName}
                      </div>
                      <div className="text-xs text-gray-500">
                        Born: {new Date(user.personalInfo.dateOfBirth).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.contactInfo.email}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Phone className="h-3 w-3" />
                          {user.contactInfo.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {user.contactInfo.province}
                        </div>
                        {user.contactInfo.district && (
                          <div className="text-xs text-gray-500">
                            {user.contactInfo.district}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getTierColor(user.verificationInfo.tier)}>
                        Tier {user.verificationInfo.tier}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(user.verificationInfo.status)}>
                        {user.verificationInfo.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        {new Date(user.lastActivity).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(user.lastActivity).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUserAction('view', user)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        {role === 'admin' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserAction('edit', user)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserAction('suspend', user)}
                            >
                              <Settings className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* User Details Modal */}
      {showDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">User Details</h2>
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  ✕
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <p>{selectedUser.personalInfo.firstName} {selectedUser.personalInfo.middleName} {selectedUser.personalInfo.lastName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Date of Birth</label>
                      <p>{new Date(selectedUser.personalInfo.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Place of Birth</label>
                      <p>{selectedUser.personalInfo.placeOfBirth}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Gender</label>
                      <p className="capitalize">{selectedUser.personalInfo.gender}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Citizenship</label>
                      <p>{selectedUser.personalInfo.citizenship}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p>{selectedUser.contactInfo.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <p>{selectedUser.contactInfo.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Address</label>
                      <p>{selectedUser.contactInfo.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Province</label>
                      <p>{selectedUser.contactInfo.province}</p>
                    </div>
                    {selectedUser.contactInfo.district && (
                      <div>
                        <label className="text-sm font-medium">District</label>
                        <p>{selectedUser.contactInfo.district}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Verification Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Digital ID Number</label>
                      <p className="font-mono">{selectedUser.digitalIdNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Verification Tier</label>
                      <Badge className={getTierColor(selectedUser.verificationInfo.tier)}>
                        Tier {selectedUser.verificationInfo.tier} - {selectedUser.verificationInfo.level}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <Badge className={getStatusColor(selectedUser.verificationInfo.status)}>
                        {selectedUser.verificationInfo.status}
                      </Badge>
                    </div>
                    {selectedUser.verificationInfo.verifiedAt && (
                      <div>
                        <label className="text-sm font-medium">Verified Date</label>
                        <p>{new Date(selectedUser.verificationInfo.verifiedAt).toLocaleDateString()}</p>
                      </div>
                    )}
                    {selectedUser.verificationInfo.expiresAt && (
                      <div>
                        <label className="text-sm font-medium">Expires Date</label>
                        <p>{new Date(selectedUser.verificationInfo.expiresAt).toLocaleDateString()}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Biometric Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        {selectedUser.biometricData.fingerprint ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-400" />
                        )}
                        <span className="text-sm">Fingerprint</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedUser.biometricData.facial ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-400" />
                        )}
                        <span className="text-sm">Facial</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedUser.biometricData.iris ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-400" />
                        )}
                        <span className="text-sm">Iris</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedUser.biometricData.voice ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-400" />
                        )}
                        <span className="text-sm">Voice</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Issued Credentials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.issuedCredentials.map((credential) => (
                      <Badge key={credential} variant="outline">
                        {credential.replace('_', ' ').toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Status History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedUser.statusHistory.map((entry, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium capitalize">{entry.status}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(entry.timestamp).toLocaleString()}
                          </div>
                        </div>
                        {entry.officer && (
                          <div className="text-sm text-gray-500">
                            Officer: {entry.officer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
