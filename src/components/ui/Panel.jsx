const Panel = ({ children }) => {
  return (
    <div
      className="bg-ms-background overflow-x-hidden overflow-y-auto right-0 absolute top-12 z-40 max-w-full"
      style={{
        height: "calc(100vh - 48px)",
        width: "360px",
        boxShadow:
          "rgba(0, 0, 0, 0.133) 0px 1.6px 3.6px 0px, rgba(0, 0, 0, 0.11) 0px 0.3px 0.9px 0px",
      }}
    >
      {children}
    </div>
  );
};

export default Panel;
