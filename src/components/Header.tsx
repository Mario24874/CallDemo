export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="https://www.segurident.com/wp-content/uploads/2023/03/logo-nuevo.jpg"
            alt="Segurident"
            className="h-10 sm:h-12 w-auto object-contain"
            onError={(e) => {
              // Fallback if logo doesn't load
              const target = e.currentTarget;
              target.style.display = 'none';
              const sibling = target.nextElementSibling as HTMLElement;
              if (sibling) sibling.style.display = 'flex';
            }}
          />
          {/* Text fallback */}
          <div className="hidden items-center gap-1" style={{ display: 'none' }}>
            <span className="text-2xl font-bold text-[#1B3A5C]">SEGURI</span>
            <span className="text-2xl font-bold text-[#2E9DD8]">DENT</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Natasha disponible
          </span>
          <a
            href="https://www.segurident.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#1B3A5C] hover:text-[#2E9DD8] font-medium transition-colors duration-200 hidden sm:block"
          >
            segurident.com
          </a>
        </div>
      </div>
    </header>
  );
}
