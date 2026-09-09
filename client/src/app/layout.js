import "../styles/globals.css";

export const metadata = {
  title: "CodeMaster",
  description: "Master coding. Build your future.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}