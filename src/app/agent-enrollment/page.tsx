"use client";

export default function AgentEnrollmentPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Government Agent Enrollment
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Digital ID system registration for PNG government agents and officials
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-600">Agent Registration</h3>
            <p className="text-gray-600 mt-2">Register new government agents in the Digital ID system</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Start Registration
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-600">Biometric Enrollment</h3>
            <p className="text-gray-600 mt-2">Capture and verify biometric data for secure access</p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Enroll Biometrics
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-600">Credential Issuance</h3>
            <p className="text-gray-600 mt-2">Issue digital credentials and access cards</p>
            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Issue Credentials
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Enrollment Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-gray-600">Enrolled Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">98.5%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">23</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">15</div>
              <div className="text-sm text-gray-600">Departments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
