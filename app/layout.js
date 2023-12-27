import './globals.css'

export const metadata = {
    title: 'Story Game',
    description: 'Choose your own adventure game powered by generative Artificial Intelligence.',
    icons: {
        icon: '/favicon.ico'
    }
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
