import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberDaily — Your daily security challenge",
  description: "Build your cybersecurity instincts with daily phishing, log analysis and secure code challenges.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

