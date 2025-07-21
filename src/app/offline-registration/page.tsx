"use client";

export default function OfflineRegistrationPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Offline Registration System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Mobile units and offline registration capabilities for remote PNG communities
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-600">Mobile Units</h3>
            <p className="text-gray-600 mt-2">Registration vehicles for remote areas</p>
            <div className="text-3xl font-bold text-blue-600 mt-4">8</div>
            <p className="text-sm text-gray-600">Active Units</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-600">Offline Registrations</h3>
            <p className="text-gray-600 mt-2">Completed without internet connection</p>
            <div className="text-3xl font-bold text-green-600 mt-4">2,456</div>
            <p className="text-sm text-gray-600">This Month</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-600">Remote Villages</h3>
            <p className="text-gray-600 mt-2">Communities served offline</p>
            <div className="text-3xl font-bold text-purple-600 mt-4">156</div>
            <p className="text-sm text-gray-600">Villages Reached</p>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Offline Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-3">Mobile Registration Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Complete Digital ID registration without internet</li>
                <li>• Biometric data capture and storage</li>
                <li>• Photo and document scanning</li>
                <li>• Encrypted local data storage</li>
                <li>• Automatic sync when connected</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-3">Supported Services</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Birth certificate registration</li>
                <li>• National ID applications</li>
                <li>• Voter registration</li>
                <li>• Census data collection</li>
                <li>• Government agent enrollment</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Mobile Unit Deployment Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">Central</div>
              <div className="text-sm text-gray-600">2 units active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Highlands</div>
              <div className="text-sm text-gray-600">3 units active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">Islands</div>
              <div className="text-sm text-gray-600">2 units active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Momase</div>
              <div className="text-sm text-gray-600">1 unit active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
