/**
 * Privacy Policy Page
 * Public page - accessible to anyone
 */

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <a href="/" className="text-blue-600 hover:text-blue-700">
            ← Back to Home
          </a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Introduction</h2>
            <p>
              BS-VMS ("we", "our", or "us") values your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Information We Collect</h2>
            <p>We collect information you provide directly, such as:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Account information (name, email, password)</li>
              <li>Profile information (company, role, preferences)</li>
              <li>Content you create (vehicles, opportunities, notes)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Provide and maintain our service</li>
              <li>Improve and personalize your experience</li>
              <li>Communicate with you about updates and changes</li>
              <li>Protect against fraud and unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Security</h2>
            <p>
              We implement appropriate security measures to protect your information, including
              encryption and secure authentication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at
              privacy@bs-vms.com
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
