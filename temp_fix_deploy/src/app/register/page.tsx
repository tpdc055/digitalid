"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  User,
  Camera,
  Fingerprint,
  FileText,
  Shield,
  CheckCircle,
  AlertTriangle,
  Upload,
  ArrowLeft,
  ArrowRight,
  Clock,
  Phone,
  MapPin,
  CreditCard,
  Key,
  QrCode
} from 'lucide-react';
import Link from 'next/link';
import TopNavigation from '@/components/TopNavigation';

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    gender: '',
    citizenship: 'Papua New Guinea',
    email: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    birthCertificate: null,
    passport: null,
    biometricConsent: false,
    fingerprintData: null,
    faceData: null,
    verificationLevel: 'tier2'
  });

  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [digitalIdNumber, setDigitalIdNumber] = useState('');

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const provinces = [
    'National Capital District', 'Central', 'Gulf', 'Milne Bay', 'Oro',
    'Western', 'Southern Highlands', 'Western Highlands', 'Enga', 'Hela',
    'Jiwaka', 'Morobe', 'Madang', 'East Sepik', 'West Sepik', 'Manus',
    'New Ireland', 'East New Britain', 'West New Britain', 'AROB'
  ];

  const verificationTiers = [
    {
      id: 'tier1',
      name: 'Tier 1 - Basic',
      description: 'Basic identity verification with minimal documentation',
      timeframe: '1-2 days',
      cost: 'Free',
      requirements: ['Name, DOB, Address', 'Phone verification']
    },
    {
      id: 'tier2',
      name: 'Tier 2 - Standard',
      description: 'Standard verification with document validation',
      timeframe: '3-5 days',
      cost: 'K 5.00',
      requirements: ['Birth certificate', 'Address proof', 'Phone verification']
    },
    {
      id: 'tier3',
      name: 'Tier 3 - Enhanced',
      description: 'Enhanced verification for high-security services',
      timeframe: '7-14 days',
      cost: 'K 15.00',
      requirements: ['Government ID', 'Biometrics', 'Background check']
    },
    {
      id: 'tier4',
      name: 'Tier 4 - Maximum',
      description: 'Maximum security for government and banking services',
      timeframe: '14-21 days',
      cost: 'K 25.00',
      requirements: ['Multiple IDs', 'Full biometrics', 'In-person verification']
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleFileUpload = (field, file) => {
    setUploadProgress(prev => ({ ...prev, [field]: 0 }));

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = (prev[field] || 0) + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setFormData(prevData => ({
            ...prevData,
            [field]: file
          }));
          return { ...prev, [field]: 100 };
        }
        return { ...prev, [field]: newProgress };
      });
    }, 200);
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.placeOfBirth) newErrors.placeOfBirth = 'Place of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        break;
      case 2:
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.province) newErrors.province = 'Province is required';
        break;
      case 3:
        if (formData.verificationLevel !== 'tier1' && !formData.birthCertificate) {
          newErrors.birthCertificate = 'Birth certificate is required for this verification level';
        }
        break;
      case 4:
        if (formData.verificationLevel !== 'tier1' && !formData.biometricConsent) {
          newErrors.biometricConsent = 'Biometric consent is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const submitRegistration = async () => {
    if (validateStep(currentStep)) {
      // Generate Digital ID Number
      const year = new Date().getFullYear();
      const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      const newDigitalId = `PNG${year}${random}`;

      setDigitalIdNumber(newDigitalId);
      setRegistrationComplete(true);

      console.log('Registration submitted:', { ...formData, digitalIdNumber: newDigitalId });
    }
  };

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <TopNavigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mt-2" />
            </div>

            <h1 className="text-3xl font-bold text-green-800 mb-4">
              Digital ID Registration Successful!
            </h1>

            <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Your PNG Digital ID</h2>
                <div className="text-3xl font-mono bg-gray-100 p-4 rounded-lg">
                  {digitalIdNumber}
                </div>
              </div>

              <Alert className="mb-6">
                <Key className="h-4 w-4" />
                <AlertTitle>Important: Save Your Digital ID Number</AlertTitle>
                <AlertDescription>
                  This is your unique PNG Digital ID number. You'll need it to access government services.
                  Keep it secure and don't share it with unauthorized persons.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="text-left">
                  <h3 className="font-semibold mb-2">Registration Details:</h3>
                  <div className="text-sm space-y-1">
                    <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                    <div><strong>Verification Level:</strong> {verificationTiers.find(t => t.id === formData.verificationLevel)?.name}</div>
                    <div><strong>Registration Date:</strong> {new Date().toLocaleDateString()}</div>
                    <div><strong>Status:</strong> <Badge className="bg-orange-100 text-orange-800">Pending Verification</Badge></div>
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold mb-2">Next Steps:</h3>
                  <div className="text-sm space-y-1">
                    <div>• Check your email for verification instructions</div>
                    <div>• Document review: {verificationTiers.find(t => t.id === formData.verificationLevel)?.timeframe}</div>
                    <div>• You'll receive SMS updates</div>
                    <div>• Download the PNG Digital ID app</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                <Link href="/credentials">
                  <Button>
                    <CreditCard className="h-4 w-4 mr-2" />
                    View My Credentials
                  </Button>
                </Link>
                <Link href="/digital-id">
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Digital ID Dashboard
                  </Button>
                </Link>
              </div>

              <div className="text-sm text-gray-600">
                <p>Your registration has been submitted for verification.</p>
                <p>You will receive an email confirmation shortly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <TopNavigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/digital-id">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Digital ID
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Register PNG Digital Identity</h1>
              <p className="text-slate-600">Complete your digital identity registration for government services</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Registration Progress</span>
              <span className="text-sm text-slate-600">Step {currentStep} of {totalSteps}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span>Personal Info</span>
              <span>Contact</span>
              <span>Documents</span>
              <span>Biometrics</span>
              <span>Review</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </h2>
                    <p className="text-slate-600 mb-6">
                      Provide your basic personal details as they appear on your official documents.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="middleName">Middle Name</Label>
                      <Input
                        id="middleName"
                        value={formData.middleName}
                        onChange={(e) => handleInputChange('middleName', e.target.value)}
                        placeholder="Enter your middle name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      />
                      {errors.dateOfBirth && (
                        <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="placeOfBirth">Place of Birth *</Label>
                      <Input
                        id="placeOfBirth"
                        value={formData.placeOfBirth}
                        onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                        placeholder="e.g., Port Moresby, NCD"
                      />
                      {errors.placeOfBirth && (
                        <p className="text-red-500 text-sm mt-1">{errors.placeOfBirth}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <select
                        id="gender"
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                      )}
                    </div>
                  </div>

                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertTitle>Data Security</AlertTitle>
                    <AlertDescription>
                      Your personal information is encrypted and stored securely in compliance with PNG Data Protection Act 2020.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Contact Information
                    </h2>
                    <p className="text-slate-600 mb-6">
                      Provide your current contact details for verification and communication.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+675 XXXX XXXX"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="address">Residential Address *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter your full residential address"
                        rows={3}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="province">Province *</Label>
                      <select
                        id="province"
                        value={formData.province}
                        onChange={(e) => handleInputChange('province', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select province</option>
                        {provinces.map((province) => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                      {errors.province && (
                        <p className="text-red-500 text-sm mt-1">{errors.province}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="district">District</Label>
                      <Input
                        id="district"
                        value={formData.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                        placeholder="Enter your district"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Choose Verification Level & Upload Documents
                    </h2>
                    <p className="text-slate-600 mb-6">
                      Select your desired verification level and upload required documents.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Choose Verification Level:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {verificationTiers.map((tier) => (
                        <Card
                          key={tier.id}
                          className={`cursor-pointer transition-all ${
                            formData.verificationLevel === tier.id
                              ? 'ring-2 ring-blue-500 bg-blue-50'
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => handleInputChange('verificationLevel', tier.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant={formData.verificationLevel === tier.id ? 'default' : 'secondary'}>
                                {tier.name}
                              </Badge>
                              <div className="text-right">
                                <div className="text-sm font-medium">{tier.cost}</div>
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {tier.timeframe}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-slate-600 mb-3">{tier.description}</p>
                            <div className="text-xs">
                              <div className="font-medium mb-1">Requirements:</div>
                              <div className="space-y-1">
                                {tier.requirements.map((req, idx) => (
                                  <div key={idx} className="flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                    <span>{req}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {formData.verificationLevel !== 'tier1' && (
                    <div className="space-y-4">
                      <div>
                        <Label>Birth Certificate *</Label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                          {formData.birthCertificate ? (
                            <div className="text-green-600">
                              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                              <p>Birth Certificate Uploaded</p>
                            </div>
                          ) : (
                            <div>
                              <Upload className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                              <p className="text-slate-600">Click to upload birth certificate</p>
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => e.target.files[0] && handleFileUpload('birthCertificate', e.target.files[0])}
                                className="hidden"
                                id="birthCertificate"
                              />
                              <label htmlFor="birthCertificate" className="cursor-pointer">
                                <Button variant="outline" className="mt-2">
                                  Choose File
                                </Button>
                              </label>
                            </div>
                          )}
                          {uploadProgress.birthCertificate && uploadProgress.birthCertificate < 100 && (
                            <Progress value={uploadProgress.birthCertificate} className="mt-2" />
                          )}
                        </div>
                        {errors.birthCertificate && (
                          <p className="text-red-500 text-sm mt-1">{errors.birthCertificate}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertTitle>Document Requirements</AlertTitle>
                    <AlertDescription>
                      Documents must be clear, high-resolution images or PDFs. All documents are verified against PNG government databases.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Fingerprint className="h-5 w-5" />
                      Biometric Enrollment
                    </h2>
                    <p className="text-slate-600 mb-6">
                      Enroll your biometric data for secure authentication.
                    </p>
                  </div>

                  {formData.verificationLevel !== 'tier1' ? (
                    <div className="space-y-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="biometricConsent"
                            checked={formData.biometricConsent}
                            onChange={(e) => handleInputChange('biometricConsent', e.target.checked)}
                            className="mt-1"
                          />
                          <div>
                            <label htmlFor="biometricConsent" className="font-medium cursor-pointer">
                              I consent to biometric data collection *
                            </label>
                            <p className="text-sm text-slate-600 mt-1">
                              I authorize the PNG Digital ID system to collect, store, and process my biometric data
                              for identity verification purposes in accordance with PNG Data Protection Act 2020.
                            </p>
                          </div>
                        </div>
                        {errors.biometricConsent && (
                          <p className="text-red-500 text-sm mt-2">{errors.biometricConsent}</p>
                        )}
                      </div>

                      {formData.biometricConsent && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardContent className="p-6 text-center">
                              <Fingerprint className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                              <h3 className="font-medium mb-2">Fingerprint Enrollment</h3>
                              <p className="text-sm text-slate-600 mb-4">
                                Scan your fingerprints for secure authentication
                              </p>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setTimeout(() => {
                                    handleInputChange('fingerprintData', 'fingerprint_captured');
                                  }, 2000);
                                }}
                                disabled={formData.fingerprintData}
                              >
                                {formData.fingerprintData ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Captured
                                  </>
                                ) : (
                                  'Start Fingerprint Scan'
                                )}
                              </Button>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-6 text-center">
                              <Camera className="h-12 w-12 mx-auto mb-4 text-green-600" />
                              <h3 className="font-medium mb-2">Facial Recognition</h3>
                              <p className="text-sm text-slate-600 mb-4">
                                Take a photo for facial recognition setup
                              </p>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setTimeout(() => {
                                    handleInputChange('faceData', 'face_captured');
                                  }, 2000);
                                }}
                                disabled={formData.faceData}
                              >
                                {formData.faceData ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Captured
                                  </>
                                ) : (
                                  'Take Photo'
                                )}
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertTitle>Tier 1 Verification</AlertTitle>
                      <AlertDescription>
                        Biometric enrollment is not required for Tier 1 verification. You can upgrade
                        to higher tiers later to access additional services.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Review and Submit
                    </h2>
                    <p className="text-slate-600 mb-6">
                      Review your information before submitting your Digital ID registration.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div><strong>Name:</strong> {formData.firstName} {formData.middleName} {formData.lastName}</div>
                          <div><strong>Date of Birth:</strong> {formData.dateOfBirth}</div>
                          <div><strong>Place of Birth:</strong> {formData.placeOfBirth}</div>
                          <div><strong>Gender:</strong> {formData.gender}</div>
                          <div><strong>Citizenship:</strong> {formData.citizenship}</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div><strong>Email:</strong> {formData.email}</div>
                          <div><strong>Phone:</strong> {formData.phone}</div>
                          <div><strong>Address:</strong> {formData.address}</div>
                          <div><strong>Province:</strong> {formData.province}</div>
                          {formData.district && <div><strong>District:</strong> {formData.district}</div>}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Verification Level</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Badge variant="default" className="mb-2">
                          {verificationTiers.find(tier => tier.id === formData.verificationLevel)?.name}
                        </Badge>
                        <p className="text-sm text-slate-600">
                          {verificationTiers.find(tier => tier.id === formData.verificationLevel)?.description}
                        </p>
                        <div className="mt-2 text-xs text-slate-500">
                          Cost: {verificationTiers.find(tier => tier.id === formData.verificationLevel)?.cost}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Documents & Biometrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            {formData.birthCertificate ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-slate-300" />
                            )}
                            Birth Certificate
                          </div>
                          <div className="flex items-center gap-2">
                            {formData.fingerprintData ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-slate-300" />
                            )}
                            Fingerprint Data
                          </div>
                          <div className="flex items-center gap-2">
                            {formData.faceData ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-slate-300" />
                            )}
                            Facial Recognition Data
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Important Notice</AlertTitle>
                    <AlertDescription>
                      By submitting this registration, you confirm that all information provided is accurate
                      and agree to the PNG Digital ID Terms of Service and Privacy Policy. A processing fee
                      of {verificationTiers.find(tier => tier.id === formData.verificationLevel)?.cost} will be charged for this verification level.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              <div className="flex justify-between pt-8 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button onClick={nextStep}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={submitRegistration} className="bg-green-600 hover:bg-green-700">
                    Submit Registration
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
