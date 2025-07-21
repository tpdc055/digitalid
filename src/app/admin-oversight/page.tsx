"use client";

export default function AdminOversightPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Admin Oversight & Compliance
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Enhanced Security Framework monitoring and PNG DGA 2022 compliance dashboard
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-600">System Uptime</h3>
            <p className="text-3xl font-bold">99.97%</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-600">Security Score</h3>
            <p className="text-3xl font-bold">98.5/100</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-orange-600">Threats Blocked</h3>
            <p className="text-3xl font-bold">156</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-600">DGA 2022 Compliance</h3>
            <p className="text-3xl font-bold">94%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
