import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { TextFactChecker } from './components/TextFactChecker';
import { CallAnalyzer } from './components/CallAnalyzer';
import { LabExperiment } from './components/LabExperiment';
import { DatabaseLookup } from './components/DatabaseLookup';
import { ProjectPaper } from './components/ProjectPaper';
import { HistoryView } from './components/HistoryView';
import { AuthView } from './components/AuthView';

const MainApp: React.FC = () => {
  const { currentTab, setCurrentTab } = useApp();

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      const valid = ['/cuoc-goi', '/mo-phong', '/tra-cuu', '/du-an', '/lich-su', '/auth'].includes(p)
        ? p
        : '/';
      setCurrentTab(valid);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setCurrentTab]);

  const renderContent = () => {
    switch (currentTab) {
      case '/cuoc-goi':
        return <CallAnalyzer />;
      case '/mo-phong':
        return <LabExperiment />;
      case '/tra-cuu':
        return <DatabaseLookup />;
      case '/du-an':
        return <ProjectPaper />;
      case '/lich-su':
        return <HistoryView />;
      case '/auth':
        return <AuthView />;
      default:
        return <TextFactChecker />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main>{renderContent()}</main>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
