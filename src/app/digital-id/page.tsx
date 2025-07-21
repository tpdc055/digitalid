"use client";

export default function DigitalIDPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          PNG Digital ID System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Comprehensive Digital Identity & National Registry Platform
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-600">Digital ID Users</h3>
            <p className="text-3xl font-bold">15,432</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-600">Total Registrations</h3>
            <p className="text-3xl font-bold">45,678</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-600">Registry Systems</h3>
            <p className="text-3xl font-bold">36</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-orange-600">System Uptime</h3>
            <p className="text-3xl font-bold">99.97%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
