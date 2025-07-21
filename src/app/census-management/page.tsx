"use client";

export default function CensusManagementPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          PNG National Census Management
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Population data collection and demographic analysis for Papua New Guinea
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-600">Total Population</h3>
            <p className="text-3xl font-bold">9.1M</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-600">Census Records</h3>
            <p className="text-3xl font-bold">45,678</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-600">Provinces Covered</h3>
            <p className="text-3xl font-bold">20</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-orange-600">Digital ID Linked</h3>
            <p className="text-3xl font-bold">15,432</p>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Census Data Collection
          </h2>
          <p className="text-gray-600 mb-4">
            Comprehensive population data collection integrated with the PNG Digital ID System
            for accurate demographic analysis and government planning.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            View Census Data
          </button>
        </div>
      </div>
    </div>
  );
}
