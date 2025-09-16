import { DraftingCompass } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <DraftingCompass className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight font-headline">Comércio Moz</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
