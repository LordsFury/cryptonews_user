"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { Suspense } from "react";

function Callback() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("userToken");
        const username = searchParams.get("username");
        if (token) {
            localStorage.setItem("userToken", token);
            window.dispatchEvent(new Event("storage"));
            router.push("/");
            toast.dismiss();
            toast.success(`Welcome ${username}`, { autoClose: 2000 });
        }
    }, [searchParams, router]);

    return (
        <div className="flex flex-col items-center justify-center bg-white dark:bg-zinc-900 h-screen gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Signing you in...
            </p>
        </div>
    );
}


const Page = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Callback />
        </Suspense>
    )
};

export default Page;