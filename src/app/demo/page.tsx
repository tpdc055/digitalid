"use client";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          PNG Digital ID System Demo
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Interactive demonstration of Enhanced Security Framework and Digital Government services
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-600">Digital ID Issuance</h3>
            <p className="text-gray-600 mt-2">Experience secure digital credential creation</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Try Demo
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-600">Biometric Authentication</h3>
            <p className="text-gray-600 mt-2">Test fingerprint and facial recognition systems</p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Test Authentication
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-600">Registry System</h3>
            <p className="text-gray-600 mt-2">Explore integrated government registry modules</p>
            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              View Registry
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Enhanced Security Framework Demo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-sm text-gray-600">Encryption Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">94%</div>
              <div className="text-sm text-gray-600">DGA 2022 Compliance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">99.97%</div>
              <div className="text-sm text-gray-600">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">15,432</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              🔒 Security Features Demonstration
            </h3>
            <ul className="space-y-2 text-green-700">
              <li>✓ End-to-end encryption (AES-256-GCM)</li>
              <li>✓ Multi-factor authentication</li>
              <li>✓ Biometric verification</li>
              <li>✓ Blockchain document verification</li>
              <li>✓ Real-time threat detection</li>
              <li>✓ DGA 2022 compliance monitoring</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              🏛️ Government Services Available
            </h3>
            <ul className="space-y-2 text-blue-700">
              <li>• Birth Certificate Registration</li>
              <li>• Business License Management</li>
              <li>• Motor Vehicle Registry</li>
              <li>• National ID Issuance</li>
              <li>• Census Data Management</li>
              <li>• Agent Enrollment System</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-red-600 via-black to-yellow-600 p-6 rounded-lg text-white">
          <h2 className="text-2xl font-bold mb-2">
            Papua New Guinea Digital Government Transformation
          </h2>
          <p className="mb-4">
            Experience the most advanced digital government platform in the Pacific region,
            featuring integrated registry systems, enhanced security, and multi-language support.
          </p>
          <button className="bg-white text-gray-900 px-6 py-2 rounded font-medium hover:bg-gray-100">
            Start Live Demo
          </button>
        </div>
      </div>
    </div>
  );
}
