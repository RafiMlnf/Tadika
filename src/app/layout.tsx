import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Tadika — Sirkel Archive",
  description: "Tempat menyimpan kenangan sirkel. Foto, video, trip, dan archive bersama.",
  keywords: ["sirkel", "archive", "galeri", "foto", "video", "kenangan", "trip"],
  authors: [{ name: "Sirkel Crew" }],
  openGraph: {
    title: "Tadika — Sirkel Archive",
    description: "Tempat menyimpan kenangan sirkel.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('tadika-theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
