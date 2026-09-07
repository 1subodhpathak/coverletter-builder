import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import './index.css'
import BlueLogo from './assets/logos/BlueGray.png'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {PUBLISHABLE_KEY ? (
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        appearance={{
          variables: {
            colorPrimary: '#2F4156',
            colorText: '#0f172a',
            colorTextSecondary: '#64748b',
            colorBackground: '#ffffff',
            colorInputBackground: '#f8fafc',
            colorInputText: '#0f172a',
            borderRadius: '0.875rem',
            fontFamily: 'inherit',
          },
          layout: {
            logoImageUrl: BlueLogo,
            socialButtonsPlacement: 'top',
            socialButtonsVariant: 'blockButton',
            unsafe_disableDevelopmentModeWarnings: true,
          },
          elements: {
            modalBackdrop: 'bg-slate-950/60 backdrop-blur-sm',
            modalContent: 'mx-4',
            cardBox: 'overflow-hidden rounded-3xl shadow-2xl shadow-slate-950/20',
            card: 'border border-slate-200/80 shadow-none',
            logoImage: 'h-12 w-12 object-contain',
            headerTitle: 'text-2xl font-bold tracking-tight text-slate-900',
            headerSubtitle: 'text-sm text-slate-500',
            socialButtonsBlockButton: 'h-12 border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50',
            dividerLine: 'bg-slate-200',
            dividerText: 'text-xs font-medium text-slate-400',
            formFieldLabel: 'text-xs font-semibold text-slate-700',
            formFieldInput: 'h-12 border-slate-200 bg-slate-50 text-sm text-slate-900 shadow-none focus:border-[#2F4156] focus:ring-[#2F4156]/20',
            formButtonPrimary: 'h-12 bg-[#2F4156] text-sm font-semibold shadow-md shadow-[#2F4156]/20 hover:bg-[#233244]',
            footerActionText: 'text-sm text-slate-500',
            footerActionLink: 'text-sm font-semibold text-[#2F4156] hover:text-[#1e293b]',
            footer: 'hidden',
            userButtonPopoverFooter: 'hidden',
            userProfileFooter: 'hidden',
          },
        }}
      >
        <App />
      </ClerkProvider>
    ) : (
      <App />
    )}
  </React.StrictMode>,
)