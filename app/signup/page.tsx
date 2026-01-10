"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "../types";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

        if (existingUsers.some((user: User) => user.email === email)) {
            setError("User already exists");
            return;
        }

        // add new user
        existingUsers.push({ email, password });
        localStorage.setItem("users", JSON.stringify(existingUsers));

        router.push("/login");
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form
                onSubmit={handleSignup}
                className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg"
            >
                <h2 className="mb-6 text-center text-2xl font-bold text-black">
                    Sign Up
                </h2>

                {error && <p className="mb-4 text-red-600">{error}</p>}

                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-md bg-green-600 py-2 text-white hover:bg-green-700 transition"
                >
                    Sign Up
                </button>

                <p className="mt-4 text-center text-sm text-black">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-green-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
