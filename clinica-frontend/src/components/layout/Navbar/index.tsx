export const Navbar = ({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 z-20 flex items-center px-4 md:px-6">
      <button
        className="md:hidden p-2 mr-4 rounded bg-gray-100 hover:bg-gray-200"
        onClick={onToggleSidebar}
      >
        ☰
      </button>
      <h1 className="text-xl font-bold">My App</h1>
    </header>
  );
};

export default Navbar;
