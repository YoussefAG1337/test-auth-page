import { Inter } from "next/font/google";

export const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const htmlClassName = `${inter.variable} h-full antialiased`;
export const bodyClassName = "min-h-full flex flex-col";
