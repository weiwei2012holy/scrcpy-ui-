"use client"
import {Inter} from "next/font/google";
import "./globals.css";
import Menu from "@/app/_component/menu";
import Footer from "@/app/_component/footer";
import {GlobalProvider} from "@/app/_context/globalContext";
import {RunningProvider} from "@/app/_context/runningContext";
import Message from "@/app/_component/message";

const inter = Inter({subsets: ["latin"]});


export default function RootLayout({children}) {
    return (<html lang="en">
    <body className={inter.className}>
    <GlobalProvider>
        <RunningProvider>
            <Message></Message>
            <section className="container">
                <section className="sidebar">
                    <Menu/>
                </section>
                <section className="content">
                    {children}
                </section>
                <section className="footer">
                    <Footer/>
                </section>
            </section>
        </RunningProvider>

    </GlobalProvider>
    </body>
    </html>);
}
