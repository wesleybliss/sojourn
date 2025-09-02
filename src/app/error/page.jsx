import Link from 'next/link'

export default function ErrorPage() {
    
    return (
        
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            
            <div className="max-w-md w-full p-8 bg-white rounded shadow">
                
                <h1 className="text-2xl font-semibold mb-4">
                    Something went wrong
                </h1>
                
                <p className="text-sm text-gray-600 mb-6">
                    An error occurred while signing in. Please try again or contact support.
                </p>
                
                <div className="flex gap-2">
                    <Link href="/" className="px-4 py-2 bg-sky-600 text-white rounded">Go home</Link>
                    <Link href="/login" className="px-4 py-2 border border-slate-200 rounded text-slate-700">
                        Try signing in
                    </Link>
                </div>
            
            </div>
        
        </main>
        
    )
    
}
