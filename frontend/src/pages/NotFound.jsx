import React from 'react'

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text center bg-slate-50">
            <img src="assets/404_NotFound.png" alt="404 Not Found" className="max-w-full mb-6 w-96" />

            <p className="text-xl font-semibold">Page Not Found</p>
            <a href="/" className="mt-4 text-blue-500 hover:underline">Go back to Home</a>
        </div>
    )
}

export default NotFound