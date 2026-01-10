"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // new

    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");

        if (!storedEmail) {
            router.push("/login");
        } else {
            // defer setState to avoid React strict warnings
            setTimeout(() => {
                setEmail(storedEmail);
                setLoading(false);
            }, 0);
        }
    }, [router]);

    // while loading, don’t render anything
    if (loading) return null;

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-xl bg-white p-10 shadow-lg text-center">
                <h1 className="mb-2 text-3xl font-bold text-black">Welcome</h1>

                <p className="mb-8 text-lg text-gray-700">{email}</p>

                <button
                    onClick={() => {
                        localStorage.removeItem("userEmail");
                        router.push("/login");
                    }}
                    className="w-full rounded-md bg-red-600 py-2 text-white hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
