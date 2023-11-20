import './globals.css'

export const metadata = {
    title: 'CYOA-Game',
    description: 'Choose your own adventure game powered by generative Artificial Intelligence.',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    )
}
