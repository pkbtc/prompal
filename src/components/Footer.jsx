function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white bg-opacity-90 backdrop-blur-sm border-t border-[#e0aaff] py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-['Pacifico'] text-[#9d4edd]">PromPal✨</h2>
            <p className="text-sm text-[#240046] mt-1">
              Making prom memories magical, one match at a time
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-[#240046]">
              &copy; {currentYear} PromPal. All rights reserved.
            </p>
            <p className="text-xs text-[#240046] mt-1">
              Your anonymous ID is stored locally and never shared without your permission.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
