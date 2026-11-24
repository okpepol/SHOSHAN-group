import { useRef } from 'react';
import { AffiliateLinkTool } from './components/AffiliateLinkTool';
import { CategoriesSection } from './components/CategoriesSection';
import { FooterAndModals } from './components/FooterAndModals';
import { GuidesSection } from './components/GuidesSection';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { HowItWorksAndDeploy } from './components/HowItWorksAndDeploy';

export default function App() {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleFocusSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 150);
  };

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header onFocusSearch={handleFocusSearch} />
      <main className="flex-1">
        <HeroSearch searchInputRef={searchInputRef} />
        <CategoriesSection />
        <GuidesSection />
        <AffiliateLinkTool />
        <HowItWorksAndDeploy />
      </main>
      <FooterAndModals />
    </div>
  );
}
