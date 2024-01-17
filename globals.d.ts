// Inside globals.d.ts or next-env.d.ts
declare global {
    interface Window {
      // Declare the gtag function with the correct signature
      gtag: (event: string, action: string, parameters: object) => void;
    }
  }
  
  // This line is important for TypeScript not to complain about an empty file
  export {};
  