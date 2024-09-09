import { ModeToggle } from "./theme-swticher";

export const Navbar = () => {
  return (
    <div className="p-1 flex justify-between border-b">
      <h1 className="text-2xl">Subscribe to sumonsnote</h1>
      <ModeToggle />
    </div>
  );
};
