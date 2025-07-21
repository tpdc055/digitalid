"use client";

export default function APIIntegrationPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          API Integration Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Third-party service integration for PNG Digital ID System
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-600">Government APIs</h3>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-gray-600">Connected Services</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-600">Banking Partners</h3>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-gray-600">Financial Institutions</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-600">Healthcare Systems</h3>
            <p className="text-3xl font-bold">8</p>
            <p className="text-sm text-gray-600">Medical Providers</p>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Integration Management
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>PNG Civil Registration Database</span>
              <span className="text-green-600 font-medium">✓ Connected</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>Immigration & Citizenship System</span>
              <span className="text-green-600 font-medium">✓ Connected</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>Business Registration System</span>
              <span className="text-green-600 font-medium">✓ Connected</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>Motor Vehicle Registry</span>
              <span className="text-green-600 font-medium">✓ Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
