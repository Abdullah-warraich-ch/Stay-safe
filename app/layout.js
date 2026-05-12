import "./globals.css";

export const metadata = {
  title: "Stay Safe - Find Your Perfect Home",
  description: "Join Stay Safe to find your perfect home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
