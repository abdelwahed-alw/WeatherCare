import { useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';

interface LoginViewProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, password: string) => void;
  error: string;
  onClearError: () => void;
}

export default function LoginView({ onLogin, onRegister, error, onClearError }: LoginViewProps) {
  const { t, dir } = useLocale();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(registerName, registerEmail, registerPassword);
  };

  if (showRegister) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-lg bg-background dark:bg-[#051424]">
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-2xl -start-2xl w-[500px] h-[500px] bg-primary/5 dark:bg-[#0d1c2d] rounded-full blur-[100px]" />
          <div className="absolute bottom-2xl end-0 w-[400px] h-[400px] bg-tertiary-fixed/30 dark:bg-[#1c2b3c] rounded-full blur-[120px]" />
        </div>

        <main className="relative z-10 w-full max-w-[420px]">
          <div className="bg-white dark:bg-[#0f1d30] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)] border border-[#F1F5F9] dark:border-[#2a3a52] p-xl">
            <div className="flex flex-col items-center text-center mb-lg">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-md">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>wb_sunny</span>
              </div>
              <h1 className="font-display text-[28px] font-bold text-on-surface dark:text-inverse-on-surface">{t.app.name}</h1>
            </div>

            <h2 className="font-headline text-headline-md text-on-surface dark:text-inverse-on-surface mb-lg">Create Account</h2>

            {error && (
              <div className="mb-md p-md bg-error-container dark:bg-[#93000a]/30 text-on-error-container dark:text-error-container rounded-xl font-body text-body-md flex items-center justify-between" role="alert">
                <span>{error}</span>
                <button type="button" className="ms-sm hover:opacity-70 flex-shrink-0" onClick={onClearError} aria-label="Dismiss error">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            )}

            <form className="space-y-lg" onSubmit={handleRegisterSubmit}>
              <div className="space-y-xs">
                <label className="block font-label text-label-md text-on-surface dark:text-inverse-on-surface" htmlFor="reg-name">Name</label>
                <input id="reg-name" type="text" value={registerName} onChange={e => setRegisterName(e.target.value)} placeholder="Your name" className="w-full bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] border-0 focus:ring-2 focus:ring-primary dark:focus:ring-primary-fixed-dim rounded-xl px-md py-md font-body text-body-md transition-all outline-none text-on-surface dark:text-inverse-on-surface placeholder:text-on-surface-variant/40" autoComplete="name" required />
              </div>
              <div className="space-y-xs">
                <label className="block font-label text-label-md text-on-surface dark:text-inverse-on-surface" htmlFor="reg-email">Email</label>
                <input id="reg-email" type="email" value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] border-0 focus:ring-2 focus:ring-primary dark:focus:ring-primary-fixed-dim rounded-xl px-md py-md font-body text-body-md transition-all outline-none text-on-surface dark:text-inverse-on-surface placeholder:text-on-surface-variant/40" autoComplete="email" required />
              </div>
              <div className="space-y-xs">
                <label className="block font-label text-label-md text-on-surface dark:text-inverse-on-surface" htmlFor="reg-password">Password</label>
                <div className="relative">
                  <input id="reg-password" type={showRegisterPassword ? 'text' : 'password'} value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} placeholder="At least 8 characters" className="w-full bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] border-0 focus:ring-2 focus:ring-primary dark:focus:ring-primary-fixed-dim rounded-xl px-md py-md font-body text-body-md transition-all outline-none text-on-surface dark:text-inverse-on-surface placeholder:text-on-surface-variant/40 pe-12" autoComplete="new-password" required minLength={8} />
                  <button type="button" className="absolute end-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-secondary-fixed-dim hover:text-on-surface dark:hover:text-inverse-on-surface transition-colors" onClick={() => setShowRegisterPassword(!showRegisterPassword)} aria-label={showRegisterPassword ? 'Hide password' : 'Show password'}>
                    <span className="material-symbols-outlined">{showRegisterPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <button type="submit" className="w-full bg-primary dark:bg-primary-fixed-dim hover:bg-[#003ea8] dark:hover:bg-primary text-on-primary dark:text-on-primary-fixed font-label py-md rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-sm">
                Create Account
              </button>
            </form>

            <p className="text-center font-body text-body-md text-on-surface-variant dark:text-secondary-fixed-dim mt-lg">
              Already have an account?{' '}
              <button type="button" className="font-label text-label-md text-primary dark:text-primary-fixed-dim font-semibold hover:underline" onClick={() => setShowRegister(false)}>
                Sign in
              </button>
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-lg bg-background dark:bg-[#051424]">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-2xl -start-2xl w-[500px] h-[500px] bg-primary/5 dark:bg-[#0d1c2d] rounded-full blur-[100px]" />
        <div className="absolute bottom-2xl end-0 w-[400px] h-[400px] bg-tertiary-fixed/30 dark:bg-[#1c2b3c] rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 w-full max-w-[420px]">
        <div className="bg-white dark:bg-[#0f1d30] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)] border border-[#F1F5F9] dark:border-[#2a3a52] p-xl">
          {/* Brand */}
          <div className="flex flex-col items-center text-center mb-xl">
            <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-md shadow-sm">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>wb_sunny</span>
            </div>
            <h1 className="font-display text-[32px] font-bold text-on-surface dark:text-inverse-on-surface">{t.app.name}</h1>
            <p className="font-body text-body-md text-on-surface-variant dark:text-secondary-fixed-dim mt-xs">
              {t.app.tagline === 'Weather & Wellness'
                ? 'Smart weather and wellness recommendations.'
                : t.app.tagline === 'Météo & Bien-être'
                  ? 'Recommandations météo et bien-être intelligentes.'
                  : 'توصيات ذكية للطقس والعافية.'}
            </p>
          </div>

          <div className="mb-lg">
            <h2 className="font-headline text-headline-md text-on-surface dark:text-inverse-on-surface">{t.login.title}</h2>
            <p className="font-body text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">{t.login.subtitle}</p>
          </div>

          {error && (
            <div className="mb-md p-md bg-error-container dark:bg-[#93000a]/30 text-on-error-container dark:text-error-container rounded-xl font-body text-body-md flex items-center justify-between" role="alert">
              <span>{error}</span>
              <button type="button" className="ms-sm hover:opacity-70 flex-shrink-0" onClick={onClearError} aria-label="Dismiss error">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          )}

          <form className="space-y-lg" onSubmit={handleSubmit}>
            <div className="space-y-xs">
              <label className="block font-label text-label-md text-on-surface dark:text-inverse-on-surface" htmlFor="email">
                {t.login.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t.login.emailPlaceholder}
                className="w-full bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] border-0 focus:ring-2 focus:ring-primary dark:focus:ring-primary-fixed-dim rounded-xl px-md py-md font-body text-body-md transition-all outline-none text-on-surface dark:text-inverse-on-surface placeholder:text-on-surface-variant/40"
                autoComplete="email"
                name="email"
              />
            </div>

            <div className="space-y-xs">
              <div className="flex items-center justify-between">
                <label className="font-label text-label-md text-on-surface dark:text-inverse-on-surface" htmlFor="password">
                  {t.login.passwordLabel}
                </label>
                <button type="button" className="font-label text-label-sm text-primary dark:text-primary-fixed-dim hover:underline" onClick={() => alert('Password reset link would be sent to your email.')}>
                  {t.login.forgotPassword}
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={t.login.passwordPlaceholder}
                  className="w-full bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] border-0 focus:ring-2 focus:ring-primary dark:focus:ring-primary-fixed-dim rounded-xl px-md py-md font-body text-body-md transition-all outline-none text-on-surface dark:text-inverse-on-surface placeholder:text-on-surface-variant/40 pe-12"
                  autoComplete="current-password"
                  name="password"
                />
                <button
                  type="button"
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-secondary-fixed-dim hover:text-on-surface dark:hover:text-inverse-on-surface transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary dark:bg-primary-fixed-dim hover:bg-[#003ea8] dark:hover:bg-primary text-on-primary dark:text-on-primary-fixed font-label py-md rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-sm"
            >
              {t.login.signIn}
              <span className="material-symbols-outlined text-[20px] no-flip">arrow_forward</span>
            </button>
          </form>

          <div className="relative my-xl flex items-center">
            <div className="flex-grow border-t border-outline-variant dark:border-[#2a3a52]" />
            <span className="flex-shrink mx-md font-label text-label-sm text-outline dark:text-secondary-fixed-dim">{t.login.orContinue}</span>
            <div className="flex-grow border-t border-outline-variant dark:border-[#2a3a52]" />
          </div>

          <div className="grid grid-cols-2 gap-md">
            <button className="flex items-center justify-center gap-sm bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] hover:bg-secondary-container dark:hover:bg-surface-container-high transition-colors py-md rounded-xl font-label text-label-md text-on-surface dark:text-inverse-on-surface">
              <svg className="w-5 h-5 dark:opacity-70" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t.login.google}
            </button>
            <button className="flex items-center justify-center gap-sm bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] hover:bg-secondary-container dark:hover:bg-surface-container-high transition-colors py-md rounded-xl font-label text-label-md text-on-surface dark:text-inverse-on-surface">
              <svg className="w-5 h-5 dark:opacity-70" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              {t.login.apple}
            </button>
          </div>
        </div>

        <p className="text-center font-body text-body-md text-on-surface-variant dark:text-secondary-fixed-dim mt-lg">
          {t.login.noAccount}{' '}
          <button type="button" className="font-label text-label-md text-primary dark:text-primary-fixed-dim font-semibold hover:underline" onClick={() => setShowRegister(true)}>
            {t.login.createAccount}
          </button>
        </p>

        <div className="flex flex-col items-center text-center gap-md mt-xl opacity-40">
          <div className="flex gap-4">
            <button type="button" className="font-label text-label-sm text-outline dark:text-secondary-fixed-dim hover:text-on-surface-variant dark:hover:text-inverse-on-surface transition-colors" onClick={() => alert('Privacy Policy page coming soon.')}>
              {t.login.privacy}
            </button>
            <span className="text-outline/20 dark:text-secondary-fixed-dim/20">•</span>
            <button type="button" className="font-label text-label-sm text-outline dark:text-secondary-fixed-dim hover:text-on-surface-variant dark:hover:text-inverse-on-surface transition-colors" onClick={() => alert('Terms of Service page coming soon.')}>
              {t.login.terms}
            </button>
          </div>
          <p className="font-label text-label-sm text-outline dark:text-secondary-fixed-dim leading-relaxed italic max-w-[280px]">
            {t.login.quote}
          </p>
        </div>
      </main>
    </div>
  );
}
