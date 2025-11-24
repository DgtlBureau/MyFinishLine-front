const Logo = ({ className }: { className?: string }) => {
  return (
    <h1
      className={`text-6xl text-white text-center uppercase font-stencil ${className}`}
    >
      MyFinish<span className="text-orange-400">Line</span>
    </h1>
  );
};

export default Logo;
