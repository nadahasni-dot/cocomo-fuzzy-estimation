import React from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <Guest>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600">
                Terima kasih telah mendaftar! Sebelum memulai, harap verifikasi
                email anda dengan cara menekan link yang telah kami kirim ke
                email anda. Jika tidak menerima email, kami akan mengirimkan
                email lainnya kepada anda.
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    Sebuah link verifikasi telah dikirim ke email yang telah
                    anda sediakan pada saat mendaftar.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="flex items-center justify-between mt-4">
                    <Button processing={processing}>
                        Kirim Ulang Verifikasi Email
                    </Button>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        Keluar
                    </Link>
                </div>
            </form>
        </Guest>
    );
}
