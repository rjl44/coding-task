"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "../types";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const matchedUser = users.find(
            (user: User) => user.email === email && user.password === password,
        );

        if (matchedUser) {
            localStorage.setItem("userEmail", email);
            router.push("/dashboard");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg"
            >
                <h2 className="mb-6 text-center text-2xl font-bold text-black">
                    Login
                </h2>

                {error && <p className="mb-4 text-red-600">{error}</p>}

                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 transition"
                >
                    Login
                </button>

                <p className="mt-4 text-center text-sm text-black">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-blue-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}
