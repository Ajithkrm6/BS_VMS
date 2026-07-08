/**
 * Home Page
 * Public landing page
 */

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">BS-VMS</h1>
          <div className="space-x-4">
            <a href="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </a>
            <a
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Register
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">Vendor Management System</h2>
        <p className="text-xl text-gray-600 mb-8">
          Manage vendors, opportunities, and bench management in one place.{' '}
        </p>
        <a
          href="/register"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 inline-block"
        >
          Get Started Free
        </a>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
          <div className="grid grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <div className="text-4xl mb-4">🏢</div>
              <h4 className="text-xl font-bold mb-2">Vendor Management</h4>
              <p className="text-gray-600">Track and manage your vendors efficiently</p>
            </div>
            <div className="p-6 border rounded-lg">
              <div className="text-4xl mb-4">💼</div>
              <h4 className="text-xl font-bold mb-2">Opportunities</h4>
              <p className="text-gray-600">Post and manage job opportunities</p>
            </div>
            <div className="p-6 border rounded-lg">
              <div className="text-4xl mb-4">🔧</div>
              <h4 className="text-xl font-bold mb-2">Maintenance</h4>
              <p className="text-gray-600">Schedule and track maintenance tasks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2024 BS-VMS. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <a href="/privacy" className="hover:underline">
              Privacy
            </a>
            <a href="/terms" className="hover:underline">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
