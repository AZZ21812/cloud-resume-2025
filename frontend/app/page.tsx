import Resume from './components/Resume'
import VisitorCounter from './components/VisitorCounter'
import Chatbot from './components/Chatbot'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-500/5 dark:to-purple-500/5"></div>

        <div className="container mx-auto px-4 py-8 max-w-5xl relative">
          <div className="animate-fade-in">
            {/* Modern Header */}
            <div className="mb-12 text-center">
              <div className="flex justify-end mb-4">
                <VisitorCounter />
              </div>
              <div className="inline-block">
                <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
                  Amanuel Z. Alemu
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
              </div>
              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mt-4 font-medium">
                AWS Solutions Architect • Full-Stack Developer • Fintech Specialist
              </p>
            </div>

            {/* Main resume content */}
            <Resume />

            {/* AI Chatbot */}
            <div className="mt-12">
              <Chatbot />
            </div>

            {/* Modern Footer */}
            <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
              <div className="text-center space-y-4">
                <div className="flex justify-center gap-6 flex-wrap text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Powered by AWS
                  </span>
                  <span>Next.js • Lambda • DynamoDB • Bedrock</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  Built as part of the{' '}
                  <a
                    href="https://cloudresumechallenge.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Cloud Resume Challenge
                  </a>
                  {' '}• Demonstrating Cloud-Native Architecture
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  )
}
