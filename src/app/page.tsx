import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8 sm:p-20 font-[family-name:var(--font-geist-mono)]">
      {/* Hero Section */}
      <section className=" flex gap-4  flex-col items-center text-center mb-16 h-[700px] justify-center relative">
        <span>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_4400_70)">
              <rect width="60" height="60" rx="20" fill="#4D5E4B" />
              <rect x="0.5" y="0.5" width="59" height="59" rx="19.5" stroke="white" stroke-opacity="0.3" />
              <path d="M19.6514 40.95C19.4655 41.1043 19.2822 41.2437 19.1016 41.3671C19.2826 41.2301 19.466 41.091 19.6514 40.95C24.4103 37.0012 30.9156 23.3275 40.2539 20.2148C49.7987 17.0332 30.8325 32.452 19.6514 40.95Z" fill="#D9D9D9" />
              <g filter="url(#filter0_f_4400_70)">
                <path d="M19.6384 41.39C19.4494 41.3725 19.2703 41.3483 19.1014 41.3165C19.2781 41.3409 19.4571 41.3654 19.6384 41.39C24.4734 41.838 35.6799 37.8533 42.5924 41.3075C49.6577 44.8381 30.5652 42.8757 19.6384 41.39Z" fill="black" fill-opacity="0.4" />
              </g>
            </g>
            <defs>
              <filter id="filter0_f_4400_70" x="17.1016" y="37.8862" width="29.0195" height="7.40527" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_4400_70" />
              </filter>
              <clipPath id="clip0_4400_70">
                <rect width="60" height="60" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>

        <h1 className="text-5xl font-bold mb-4">

          Write</h1>
        <p className="text-lg text-neutral-600 mb-6">
          The ultimate distraction-free notes app for macOS, Windows, and Web.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            className="bg-lime-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-lime-700 flex items-center gap-2 ring-2 ring-lime-700 transition-all ease-linear hover:ring-lime-400"
            href="#download"
          >
            {/* Inline SVG for Download */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download ($4.99)
          </a>
          <a
            className="border border-neutral-300 px-6 py-3 rounded-lg font-medium dark:hover:bg-white/10 hover:bg-neutral-100 flex items-center gap-2"
            href="#features"
          >
            {/* Inline SVG for Info */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="8"></line>
            </svg>
            Try in web (Free)
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="text-center mb-16">
        <h2 className="text-3xl font-semibold mb-8">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            {/* Inline SVG for Focus */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="8"></line>
            </svg>
            <h3 className="text-lg font-medium mt-4">Distraction-Free</h3>
            <p className="text-sm text-neutral-600">
              Stay focused with a clean, minimal interface designed for clarity.
            </p>
          </div>
          <div>
            {/* Inline SVG for Sync */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0114.13-3.36L23 10M1 14l5.37 5.37A9 9 0 0020.49 15"></path>
            </svg>
            <h3 className="text-lg font-medium mt-4">Cross-Platform</h3>
            <p className="text-sm text-neutral-600">
              Seamlessly available on macOS, Windows, and Web.
            </p>
          </div>

          <div>
            {/* Inline SVG for Timer */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <h3 className="text-lg font-medium mt-4">Focus Timer</h3>
            <p className="text-sm text-neutral-600">
              Stay productive with built-in 15-minute focus sessions.
            </p>
          </div>
          <div>
            {/* Inline SVG for Fullscreen */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
              <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
              <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
              <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
            </svg>
            <h3 className="text-lg font-medium mt-4">Fullscreen Mode</h3>
            <p className="text-sm text-neutral-600">
              Enter distraction-free writing with one-click fullscreen mode.
            </p>
          </div>
          <div>
            {/* Inline SVG for Cloud */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 16a4 4 0 00-8 0"></path>
              <path d="M3 16a9 9 0 0118 0"></path>
              <line x1="12" y1="20" x2="12" y2="20"></line>
            </svg>
            <h3 className="text-lg font-medium mt-4">Cloud Sync (soon)</h3>
            <p className="text-sm text-neutral-600">
              Access your notes anytime, anywhere with secure cloud sync.
            </p>
          </div>
          <div>
            {/* Inline SVG for Mobile */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12" y2="18"></line>
            </svg>
            <h3 className="text-lg font-medium mt-4">Mobile Apps (soon)</h3>
            <p className="text-sm text-neutral-600">
              You can add the website to home screen to use it as an app for on-the-go writing.
              Still you need Native iOS and Android apps then shoot an email :).
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="text-center mb-16">
        <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
        <ol className="list-decimal list-inside text-left max-w-md mx-auto text-neutral-600">
          <li className="mb-4">
            Download the app for your platform or use the web version.
          </li>
          <li className="mb-4">Create or import your notes effortlessly.</li>
          <li>Start writing distraction-free with no interruptions.</li>
        </ol>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="text-center mb-16 max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-8">What Users Say</h2>

        {/* Carousel container */}
        <div className="testimonial-carousel relative overflow-hidden">
          <div className="testimonial-slide absolute w-full opacity-0 fade-in-out">
            <blockquote className="italic text-neutral-600 text-sm">
              {`"Write has transformed the way I take notes. The simplicity and focus it provides are unmatched!"`}
            </blockquote>
            <p className="mt-4 font-medium">- Alex Johnson</p>
          </div>
          <div className="testimonial-slide absolute w-full opacity-0 fade-in-out">
            <blockquote className="italic text-neutral-600 text-sm">
              {`"The interface is intuitive and makes writing so much easier. I highly recommend Write!"`}
            </blockquote>
            <p className="mt-4 font-medium">- Sarah Lee</p>
          </div>
          <div className="testimonial-slide absolute w-full opacity-0 fade-in-out">
            <blockquote className="italic text-neutral-600 text-sm">
              {`"I've been using Write for months now, and it has truly elevated my note-taking game!"`}
            </blockquote>
            <p className="mt-4 font-medium">- Michael Brown</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="text-center mb-16">
        <h2 className="text-3xl font-semibold mb-8">Pricing</h2>
        <p className="text-lg text-neutral-600">
          Choose the plan that works best for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <div className="border border-neutral-300 p-6 rounded-lg text-center">
            <h3 className="text-xl font-medium mb-2">Web Version</h3>
            <p className="text-sm text-neutral-600 mb-4">
              Enjoy distraction-free writing on the web for free.
            </p>
            <ul className="text-sm text-neutral-600 mb-4 list-disc list-inside items-start justify-start flex flex-col">

              <li>Distraction-Free Interface</li>
              <li>Cross-Platform Access</li>
              <li>Focus Timer</li>
              <li>Fullscreen Mode</li>
            </ul>
            <Link href={'/write'}>
              <p className="text-2xl font-bold">Free</p>
            </Link>
          </div>
          <div className="border border-neutral-300 p-6 rounded-lg text-center">
            <h3 className="text-xl font-medium mb-2">macOS App</h3>
            <p className="text-sm text-neutral-600 mb-4">
              Unlock advanced features with the macOS app.
            </p>
            <ul className="text-sm text-neutral-600 mb-4 list-disc list-inside items-start justify-start flex flex-col">
              <li>All Web Features</li>
              <li>Offline Access</li>
              <li>Advanced Focus Timer</li>
              <li>Priority Support</li>
            </ul>
            <Link href="/download">
              <p className="text-2xl font-bold p-2 bg-lime-700 rounded-md ring-2 ring-lime-700 transition-all ease-linear hover:ring-lime-400">$4.99/month</p>
            </Link>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="text-center mb-16">
        <h2 className="text-3xl font-semibold mb-8">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto text-left">
          <div className="mb-6">
            <h3 className="text-lg font-medium">What platforms is Write available on?</h3>
            <p className="text-sm text-neutral-600">
              Write is available on macOS, Windows, and the Web. Mobile apps for iOS and Android are coming soon.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-medium">Is there a free version of Write?</h3>
            <p className="text-sm text-neutral-600">
              Yes, the web version of Write is completely free to use.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-medium">How much does the macOS app cost?</h3>
            <p className="text-sm text-neutral-600">
              The macOS app is available for $4.99/month and includes advanced features.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-medium">Does Write support cloud sync?</h3>
            <p className="text-sm text-neutral-600">
              Cloud sync is a planned feature and will be available soon.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Can I use Write on mobile devices?</h3>
            <p className="text-sm text-neutral-600">
              You can add the website to your home screen to use it as a web app. Native iOS and Android apps are in development.
            </p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="text-center text-sm mt-auto text-neutral-600">
        <p className="mb-4">
          <a
            className="hover:underline"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>{" "}
          |{" "}
          <a
            className="hover:underline"
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support
          </a>
        </p>
        <p>© 2025 Write. All rights reserved.</p>
      </footer>
    </div >
  );
}