import { useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';

interface LoginViewProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, password: string) => void;
  error: string;
  onClearError: () => void;
}

export default function LoginView({ onLogin, onRegister, error, onClearError }: LoginViewProps) {
  const { t } = useLocale();
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
      <div className="relative min-h-screen flex items-center justify-center p-lg bg-background dark:bg-[#051424] overflow-hidden">
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-2xl -start-2xl w-[500px] h-[500px] bg-primary/5 dark:bg-[#0d1c2d] rounded-full blur-[100px]" />
          <div className="absolute bottom-2xl end-0 w-[400px] h-[400px] bg-tertiary-fixed/30 dark:bg-[#1c2b3c] rounded-full blur-[120px]" />
        </div>

        <main className="relative z-10 w-full max-w-[440px] flex flex-col gap-lg">
          <header className="flex flex-col items-center text-center gap-sm">
            <div className="w-16 h-16 bg-primary-container dark:surface-glass rounded-xl flex items-center justify-center shadow-sm dark:shadow-lg dark:border dark:border-secondary/20">
              <span className="material-symbols-outlined text-on-primary dark:text-secondary text-headline-lg" style={{ fontVariationSettings: "'FILL' 1" }}>wb_sunny</span>
            </div>
            <h1 className="font-display text-display text-on-surface dark:text-on-surface">{t.app.name}</h1>
          </header>

          <section className="bg-surface-container-lowest dark:surface-glass rounded-lg p-lg md:p-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] dark:shadow-2xl border border-[#F1F5F9] dark:border-[rgba(255,255,255,0.1)]">
            <h2 className="font-headline-md text-headline-md text-on-surface dark:text-on-surface mb-lg">Create Account</h2>

            {error && (
              <div className="mb-md p-md bg-error-container dark:bg-[#93000a]/30 text-on-error-container dark:text-error-container rounded-lg font-body text-body-md flex items-center justify-between">
                <span>{error}</span>
                <button type="button" className="ms-sm hover:opacity-70" onClick={onClearError} aria-label="Dismiss error">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            )}

            <form className="space-y-md" onSubmit={handleRegisterSubmit}>
              <div>
                <label className="block font-label-md text-label-md text-on-surface dark:text-on-surface mb-xs px-base" htmlFor="reg-name">Name</label>
                <input id="reg-name" type="text" value={registerName} onChange={e => setRegisterName(e.target.value)} placeholder="Your name" className="w-full bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] border-0 focus:ring-2 focus:ring-primary dark:focus:ring-secondary rounded-md px-md py-md font-body-md text-body-md transition-all outline-none text-on-surface dark:text-on-surface placeholder:text-on-surface-variant/40" autoComplete="name" required />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface dark:text-on-surface mb-xs px-base" htmlFor="reg-email">Email</label>
                <input id="reg-email" type="email" value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] border-0 focus:ring-2 focus:ring-primary dark:focus:ring-secondary rounded-md px-md py-md font-body-md text-body-md transition-all outline-none text-on-surface dark:text-on-surface placeholder:text-on-surface-variant/40" autoComplete="email" required />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface dark:text-on-surface mb-xs px-base" htmlFor="reg-password">Password</label>
                <div className="relative">
                  <input id="reg-password" type={showRegisterPassword ? 'text' : 'password'} value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} placeholder="At least 8 characters" className="w-full bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] border-0 focus:ring-2 focus:ring-primary dark:focus:ring-secondary rounded-md px-md py-md font-body-md text-body-md transition-all outline-none text-on-surface dark:text-on-surface placeholder:text-on-surface-variant/40 pe-12" autoComplete="new-password" required minLength={8} />
                  <button type="button" className="absolute end-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors" onClick={() => setShowRegisterPassword(!showRegisterPassword)} aria-label={showRegisterPassword ? 'Hide password' : 'Show password'}>
                    <span className="material-symbols-outlined">{showRegisterPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <button type="submit" className="w-full bg-primary dark:bg-[#2563eb] hover:bg-surface-tint dark:hover:bg-[#1d4ed8] text-on-primary dark:text-white font-label-md py-md rounded-full dark:rounded-DEFAULT transition-all active:scale-95 flex items-center justify-center gap-sm mt-lg shadow-[0_10px_20px_rgba(37,99,235,0.3)]">
                Create Account
              </button>
            </form>

            <p className="text-center font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant mt-lg">
              Already have an account?
              <button type="button" className="font-label-md text-label-md text-primary dark:text-secondary hover:underline ms-xs" onClick={() => setShowRegister(false)}>
                Sign in
              </button>
            </p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-lg bg-background dark:bg-[#051424] overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-2xl -start-2xl w-[500px] h-[500px] bg-primary/5 dark:bg-[#0d1c2d] rounded-full blur-[100px]" />
        <div className="absolute bottom-2xl end-0 w-[400px] h-[400px] bg-tertiary-fixed/30 dark:bg-[#1c2b3c] rounded-full blur-[120px]" />
        <div className="animated-blob hidden dark:block" style={{ top: '-100px', insetInlineStart: '-100px' }} />
        <div className="animated-blob hidden dark:block" style={{ bottom: '-100px', insetInlineEnd: '-100px', animationDelay: '-5s' }} />
      </div>

      <main className="relative z-10 w-full max-w-[440px] flex flex-col gap-lg">
        <header className="flex flex-col items-center text-center gap-sm">
          <div className="w-16 h-16 bg-primary-container dark:surface-glass rounded-xl flex items-center justify-center shadow-sm dark:shadow-lg dark:border dark:border-secondary/20">
            <span className="material-symbols-outlined text-on-primary dark:text-secondary text-headline-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              wb_sunny
            </span>
          </div>
          <h1 className="font-display text-display text-on-surface dark:text-on-surface">{t.app.name}</h1>
          <p className="font-body-md text-on-surface-variant dark:text-on-surface-variant max-w-[280px]">
            {t.app.tagline === 'Weather & Wellness'
              ? 'Smart weather and wellness recommendations.'
              : t.app.tagline === 'Météo & Bien-être'
                ? 'Recommandations météo et bien-être intelligentes.'
                : 'توصيات ذكية للطقس والعافية.'}
          </p>
        </header>

        <section className="bg-surface-container-lowest dark:surface-glass rounded-lg p-lg md:p-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] dark:shadow-2xl border border-[#F1F5F9] dark:border-[rgba(255,255,255,0.1)]">
          <div className="mb-lg">
            <h2 className="font-headline-md text-headline-md text-on-surface dark:text-on-surface">{t.login.title}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant">{t.login.subtitle}</p>
          </div>

          {error && (
            <div className="mb-md p-md bg-error-container dark:bg-[#93000a]/30 text-on-error-container dark:text-error-container rounded-lg font-body text-body-md flex items-center justify-between">
              <span>{error}</span>
              <button type="button" className="ms-sm hover:opacity-70" onClick={onClearError} aria-label="Dismiss error">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          )}

          <form className="space-y-md" onSubmit={handleSubmit}>
            <div>
              <label className="block font-label-md text-label-md text-on-surface dark:text-on-surface mb-xs px-base" htmlFor="email">
                {t.login.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t.login.emailPlaceholder}
                className="w-full bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] border-0 focus:ring-2 focus:ring-primary dark:focus:ring-secondary rounded-md px-md py-md font-body-md text-body-md transition-all outline-none text-on-surface dark:text-on-surface placeholder:text-on-surface-variant/40"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-xs px-base">
                <label className="font-label-md text-label-md text-on-surface dark:text-on-surface" htmlFor="password">
                  {t.login.passwordLabel}
                </label>
                <button type="button" className="font-label-md text-label-md text-primary dark:text-secondary hover:underline" onClick={() => alert('Password reset link would be sent to your email.')}>
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
                  className="w-full bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] border-0 focus:ring-2 focus:ring-primary dark:focus:ring-secondary rounded-md px-md py-md font-body-md text-body-md transition-all outline-none text-on-surface dark:text-on-surface placeholder:text-on-surface-variant/40 pe-12"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary dark:bg-[#2563eb] hover:bg-surface-tint dark:hover:bg-[#1d4ed8] text-on-primary dark:text-white font-label-md py-md rounded-full dark:rounded-DEFAULT transition-all active:scale-95 flex items-center justify-center gap-sm mt-lg shadow-[0_10px_20px_rgba(37,99,235,0.3)]"
            >
              {t.login.signIn}
              <span className="material-symbols-outlined text-[20px] no-flip">arrow_forward</span>
            </button>
          </form>

          <div className="relative my-xl flex items-center">
            <div className="flex-grow border-t border-outline-variant dark:border-outline-variant" />
            <span className="flex-shrink mx-md font-label-sm text-label-sm text-outline dark:text-outline">{t.login.orContinue}</span>
            <div className="flex-grow border-t border-outline-variant dark:border-outline-variant" />
          </div>

          <div className="grid grid-cols-2 gap-md">
            <button className="flex items-center justify-center gap-sm bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] hover:bg-secondary-container dark:hover:bg-surface-container-high transition-colors py-md rounded-full font-label-md text-label-md text-on-surface dark:text-on-surface">
              <img
                alt="Google"
                className="w-5 h-5 dark:grayscale dark:opacity-70"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcccOPEAI5sPPltfP8wkXWZWl8ZdKVOlEiC5dB328hQyDaj8KnyrwVlyMVcDfKtmsBjHdOhQMhYI5VfxJzsd39uPZJHdTBrvJL9H5JIM4CAYb7ZADDa1_TH0VM4wtJOAz-9C3ZuMebtUhV0tKJdtTHawNAZkgAIiSicUuGBngkd4zl2pNaGLuWy5neg4D2Zky2mJN3O_7VDfsfXGksq1WKo4wJ3nOsBmMo530yarAfHLRryo4D1ttAOF-P3mX72HpGOEmmXeOk7us"
              />
              {t.login.google}
            </button>
            <button className="flex items-center justify-center gap-sm bg-[#F1F5F9] dark:bg-[rgba(1,15,31,0.4)] dark:border dark:border-[rgba(144,144,151,0.2)] hover:bg-secondary-container dark:hover:bg-surface-container-high transition-colors py-md rounded-full font-label-md text-label-md text-on-surface dark:text-on-surface">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>apps</span>
              {t.login.apple}
            </button>
          </div>
        </section>

        <p className="text-center font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant">
          {t.login.noAccount}
          <button type="button" className="font-label-md text-label-md text-primary dark:text-secondary hover:underline ms-xs" onClick={() => setShowRegister(true)}>
            {t.login.createAccount}
          </button>
        </p>

        <div className="flex flex-col items-center text-center gap-md opacity-40">
          <div className="flex gap-4">
            <button type="button" className="font-label-sm text-label-sm text-outline dark:text-outline hover:text-on-surface-variant dark:hover:text-on-surface-variant transition-colors" onClick={() => alert('Privacy Policy page coming soon.')}>
              {t.login.privacy}
            </button>
            <span className="text-outline/20 dark:text-outline/20">•</span>
            <button type="button" className="font-label-sm text-label-sm text-outline dark:text-outline hover:text-on-surface-variant dark:hover:text-on-surface-variant transition-colors" onClick={() => alert('Terms of Service page coming soon.')}>
              {t.login.terms}
            </button>
          </div>
          <div className="w-12 h-1 bg-primary-container dark:bg-secondary/30 rounded-full" />
          <p className="font-label-sm text-label-sm text-outline dark:text-outline leading-relaxed italic max-w-[280px]">
            {t.login.quote}
          </p>
        </div>
      </main>

      <style>{`
        .dark .surface-glass {
          background: rgba(18, 33, 49, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .animated-blob {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(93, 230, 255, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(60px);
          animation: blobMove 20s infinite alternate ease-in-out;
        }
        @keyframes blobMove {
          from { transform: translate(-10%, -10%); }
          to { transform: translate(20%, 20%); }
        }
      `}</style>
    </div>
  );
}
