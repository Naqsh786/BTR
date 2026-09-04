import LenisInstanceContext from "./LenisContext.js";

export function LenisProvider({ children, value }) {
  return (
    <LenisInstanceContext.Provider value={value}>
      {children}
    </LenisInstanceContext.Provider>
  );
}
