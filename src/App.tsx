import { useState, useEffect } from 'react';
import { useRouter, matchRoute } from './lib/router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Homepage } from './pages/Homepage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailsPage } from './pages/CategoryDetailsPage';
import { TasksPage } from './pages/TasksPage';
import { TaskDetailsPage } from './pages/TaskDetailsPage';

function App() {
  const { route, navigate } = useRouter();
  const [search, setSearch] = useState('');

  // Reset search when switching between list pages
  useEffect(() => {
    if (route.path !== '/categories' && route.path !== '/tasks') {
      setSearch('');
    }
  }, [route.path]);

  // Clear search when navigating away from the current list page
  const handleNavigate = (path: string) => {
    if (path !== '/categories' && path !== '/tasks') {
      setSearch('');
    }
    navigate(path);
  };

  const renderPage = () => {
    const path = route.path;

    if (path === '/' || path === '') {
      return <Homepage onNavigate={handleNavigate} />;
    }

    if (path === '/categories') {
      return (
        <CategoriesPage
          search={search}
          onSearchChange={setSearch}
          onNavigate={handleNavigate}
        />
      );
    }

    const catMatch = matchRoute('/categories/:slug', path);
    if (catMatch) {
      return <CategoryDetailsPage slug={catMatch.slug} onNavigate={handleNavigate} />;
    }

    if (path === '/tasks') {
      return (
        <TasksPage
          search={search}
          onSearchChange={setSearch}
          onNavigate={handleNavigate}
        />
      );
    }

    const taskMatch = matchRoute('/tasks/:slug', path);
    if (taskMatch) {
      return <TaskDetailsPage slug={taskMatch.slug} onNavigate={handleNavigate} />;
    }

    // 404
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-ink-900">Page not found</h1>
        <p className="text-sm text-ink-400 mt-2">
          The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => handleNavigate('/')}
          className="mt-6 inline-flex items-center h-9 px-4 text-sm font-medium bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Go home
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-surface-1">
      <Navbar currentPath={route.path} onNavigate={handleNavigate} />
      <main className="pt-14">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
