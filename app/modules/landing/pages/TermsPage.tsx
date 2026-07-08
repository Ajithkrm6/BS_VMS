/**
 * Terms of Service Page
 * Public page - accessible to anyone
 */

export function TermsPage() {
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
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using BS-VMS, you accept and agree to be bound by the terms and
              provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information
              or software) on BS-VMS for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. Disclaimer</h2>
            <p>
              The materials on BS-VMS are provided on an 'as is' basis. BS-VMS makes no warranties,
              expressed or implied.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Limitations</h2>
            <p>
              In no event shall BS-VMS or its suppliers be liable for any damages arising out of the
              use or inability to use the materials on BS-VMS.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Contact Us</h2>
            <p>If you have questions about these Terms, please contact us at legal@bs-vms.com</p>
          </section>
        </div>
      </main>
    </div>
  );
}
