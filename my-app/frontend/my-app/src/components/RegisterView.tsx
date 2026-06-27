import { useState } from 'react';

interface RegisterViewProps {
  onNext: (data: { name: string; email: string; password: string }) => void;
  onSignIn: () => void;
}

export default function RegisterView({ onNext, onSignIn }: RegisterViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) { setError('Please enter your full name'); return; }
    if (!email.trim()) { setError('Please enter your email address'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }

    onNext({ name: name.trim(), email: email.trim(), password });
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background dark:bg-[#051424] overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-2xl -start-2xl w-[500px] h-[500px] bg-primary/5 dark:bg-[#0d1c2d] rounded-full blur-[100px]" />
        <div className="absolute bottom-2xl end-0 w-[400px] h-[400px] bg-tertiary-fixed/30 dark:bg-[#1c2b3c] rounded-full blur-[120px]" />
      </div>

      <header className="w-full top-0 sticky bg-surface/80 dark:bg-[#051424]/80 backdrop-blur-md z-50">
        <div className="flex items-center justify-between px-md py-sm w-full mx-auto">
          <div className="w-10" />
          <h1 className="font-headline text-headline-md text-primary dark:text-secondary">
            Create Account
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="relative z-10 w-full max-w-md mx-auto px-lg pt-xl pb-3xl flex-grow flex flex-col">
        <div className="relative w-full h-48 mb-xl rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-tertiary-fixed/20 dark:from-[#0d1c2d] dark:to-[#1c2b3c]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 dark:to-black/20 flex flex-col justify-end p-lg">
            <h2 className="font-headline text-headline-md text-primary dark:text-secondary">
              Welcome to WeatherCare
            </h2>
            <p className="font-body text-body-md text-secondary dark:text-on-surface-variant">
              Step 1: Personal Details
            </p>
          </div>
        </div>

        <div className="w-full flex gap-xs mb-xl">
          <div className="h-1 flex-grow bg-primary dark:bg-secondary rounded-full" />
          <div className="h-1 flex-grow bg-secondary-container dark:bg-[rgba(255,255,255,0.1)] rounded-full" />
          <div className="h-1 flex-grow bg-secondary-container dark:bg-[rgba(255,255,255,0.1)] rounded-full" />
        </div>

        {error && (
          <div className="mb-lg p-md bg-error-container dark:bg-[#93000a]/30 text-on-error-container dark:text-error-container rounded-lg font-body text-body-md">
            {error}
          </div>
        )}

        <form className="space-y-lg flex-grow" onSubmit={handleSubmit}>
          <div className="space-y-xs">
            <label className="block font-label text-label-md text-on-surface-variant dark:text-on-surface-variant ms-xs" htmlFor="reg-name">
              Full Name
            </label>
            <div className="relative group">
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="John Doe"
                className="wc-input w-full px-lg py-md bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] border-none rounded-lg font-body text-body-md transition-all duration-200 text-on-surface dark:text-on-surface placeholder:text-on-surface-variant/40"
              />
              <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-outline dark:text-outline group-focus-within:text-primary dark:group-focus-within:text-secondary transition-colors">
                person
              </span>
            </div>
          </div>

          <div className="space-y-xs">
            <label className="block font-label text-label-md text-on-surface-variant dark:text-on-surface-variant ms-xs" htmlFor="reg-email">
              Email Address
            </label>
            <div className="relative group">
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="hello@weathercare.app"
                className="wc-input w-full px-lg py-md bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] border-none rounded-lg font-body text-body-md transition-all duration-200 text-on-surface dark:text-on-surface placeholder:text-on-surface-variant/40"
              />
              <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-outline dark:text-outline group-focus-within:text-primary dark:group-focus-within:text-secondary transition-colors">
                mail
              </span>
            </div>
          </div>

          <div className="space-y-xs">
            <label className="block font-label text-label-md text-on-surface-variant dark:text-on-surface-variant ms-xs" htmlFor="reg-password">
              Password
            </label>
            <div className="relative group">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="wc-input w-full px-lg py-md bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] border-none rounded-lg font-body text-body-md transition-all duration-200 text-on-surface dark:text-on-surface placeholder:text-on-surface-variant/40"
              />
              <button
                type="button"
                className="absolute end-md top-1/2 -translate-y-1/2 text-outline dark:text-outline hover:text-primary dark:hover:text-secondary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
            <p className="text-[11px] text-outline dark:text-outline ms-xs mt-xs">
              Must be at least 8 characters with a symbol.
            </p>
          </div>

          <div className="pt-xl space-y-md">
            <button
              type="submit"
              className="w-full bg-primary dark:bg-[#2563eb] text-on-primary dark:text-white font-label text-label-md py-lg rounded-full hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-sm shadow-[0_4px_12px_rgba(0,74,198,0.3)]"
            >
              Next
              <span className="material-symbols-outlined no-flip">arrow_forward</span>
            </button>

            <div className="flex items-center justify-center pt-md">
              <p className="font-body text-body-md text-on-surface-variant dark:text-on-surface-variant">
                Already have an account?{' '}
                <button type="button" className="text-primary dark:text-secondary font-label text-label-md hover:underline transition-all" onClick={onSignIn}>
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </form>

        <div className="mt-3xl p-lg bg-surface-container-low dark:bg-[rgba(1,15,31,0.4)] rounded-lg border border-[#F1F5F9] dark:border-[rgba(255,255,255,0.1)] flex items-start gap-md">
          <span className="material-symbols-outlined text-primary-container dark:text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
            spark
          </span>
          <p className="font-body text-body-md text-on-surface-variant dark:text-on-surface-variant italic">
            "The morning is an opportunity to set the tone for your whole day."
          </p>
        </div>
      </main>

      <nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-[#051424] flex justify-around items-center px-xl py-md shadow-sm border-t border-outline-variant dark:border-[rgba(255,255,255,0.1)]">
        <button className="flex flex-col items-center justify-center bg-primary-container dark:bg-[#2563eb]/20 text-on-primary-container dark:text-secondary rounded-full px-lg py-xs active:scale-95 transition-transform">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label text-label-md">Personal Details</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant px-lg py-xs transition-colors">
          <span className="material-symbols-outlined">settings_heart</span>
          <span className="font-label text-label-md">Preferences</span>
        </button>
      </nav>
    </div>
  );
}
