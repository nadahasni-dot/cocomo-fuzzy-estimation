import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import InfoCard from "@/Components/Landing/InfoCard";
import StepCard from "@/Components/Landing/StepCard";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen font-sans bg-gray-100 items-top sm:items-center sm:pt-0">
                {/* NAV BAR */}
                <nav className="sticky top-0 w-full py-4 text-right bg-white shadow sm:px-6 lg:px-8 sm:block">
                    <div className="container mx-auto">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <img
                                src="/svg/logo-dark.svg"
                                alt={appName}
                                width={180}
                                className="my-2"
                            />
                            <div>
                                {props.auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="px-4 py-2 text-sm font-semibold text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="px-4 py-2 text-sm font-semibold text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
                                        >
                                            Masuk
                                        </Link>

                                        <Link
                                            href={route("register")}
                                            className="px-4 py-2 ml-4 text-sm font-semibold text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
                                        >
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* HERO */}
                <div className="px-6 bg-cover bg-hero lg:px-8">
                    <div className="container mx-auto">
                        <div className="max-w-xl py-16 text-white">
                            <p className="text-3xl font-black md:text-5xl">
                                Dapatkan{" "}
                                <span className="text-amber-400">Estimasi</span>{" "}
                                Proyek Anda
                            </p>
                            <p className="mt-4 md:text-lg">
                                Catat dan dapatkan estimasi dari kebutuhan
                                fungsional projek anda dengan perhitungan{" "}
                                <span className="text-amber-400">
                                    COCOMO II
                                </span>{" "}
                                yang telah ditingkatkan dengan{" "}
                                <span className="text-amber-400">
                                    Logika Fuzzy
                                </span>
                            </p>
                            <div className="flex flex-row gap-4 mt-8">
                                <Link
                                    href={route("dashboard")}
                                    className="flex items-center px-6 py-2 font-bold text-indigo-700 transition bg-white rounded-lg md:text-lg hover:bg-indigo-100"
                                >
                                    Mulai Estimasi
                                </Link>
                                <a
                                    href="https://wa.me/62895387228138"
                                    target="_blank"
                                    className="px-2 py-2 font-bold text-indigo-700 transition rounded-lg bg-amber-400 hover:bg-amber-300"
                                >
                                    <img
                                        src="/svg/whatsapp.svg"
                                        alt="hubungi-whatsapp"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ABOUT */}
                <div className="px-6 lg:px-8">
                    <div className="container mx-auto py-14">
                        <h2 className="text-2xl font-black text-center md:text-4xl">
                            Tentang COCOMO II
                        </h2>
                        <p className="text-center md:text-lg text-slate-500">
                            Penjelasan singkat tentang Constructive Cost Model
                            II (COCOMO II)
                        </p>
                        <div className="grid max-w-4xl grid-cols-1 gap-4 mx-auto mt-10 md:grid-cols-3">
                            <InfoCard
                                icon="/svg/cocomo-info.svg"
                                description="COCOMO II merupakan salah satu pemodelan estimasi biaya dengan pendekatan algoritmik yang dapat digunakan untuk melakukan estimasi usaha, biaya, waktu, pada suatu pengembangan perangkat luinak"
                            />
                            <InfoCard
                                icon="/svg/cocomo-brain.svg"
                                description="COCOMO II (Constructive Cost Model II). Model COCOMO didasarkan pada studi 63 proyek pengembangan perangkat lunak berskala besar pada tahun 1981 yang kemudian disempuranakan pada akhir tahun 90-an menjadi COCOMO II"
                            />
                            <InfoCard
                                icon="/svg/cocomo-document.svg"
                                description="Algoritma COCOMO II menjadi salah satu model yang memiliki dokumentasi terbaik"
                            />
                        </div>
                    </div>
                </div>

                {/* STEP */}
                <div className="px-6 bg-white lg:px-8">
                    <div className="container mx-auto py-14">
                        <h2 className="text-2xl font-black text-center md:text-4xl">
                            Proses Perhitungan
                        </h2>
                        <p className="text-center md:text-lg text-slate-500">
                            Alur proses perhitungan estimasi projek dengan
                            COCOMO II
                        </p>
                        <div className="flex flex-col gap-6 mt-10">
                            <StepCard
                                icon="/svg/step-1.svg"
                                title="Mencatat tiap kebutuhan fungsional"
                            >
                                Menambahkan detail daftar kebutuhan fungsional
                                sistem yang akan dibangun.
                            </StepCard>
                            <StepCard
                                icon="/svg/step-2.svg"
                                title="Mengisi form Function Point"
                            >
                                Mengisi formulir function point pada tiap
                                kebutuhan fungsional untuk mendapat estimasi
                                Source Line of Code (SLOC).
                            </StepCard>
                            <StepCard
                                icon="/svg/step-3.svg"
                                title="Mengisi form COCOMO II"
                            >
                                Pengisian detail projek dengan melengkapi
                                formulir COCOMO II untuk mendapat perhitungan
                                sesuai spesifikasi projek.
                            </StepCard>
                            <StepCard
                                icon="/svg/step-4.svg"
                                title="Perhitungan COCOMO II dengan Logika FUZZY"
                            >
                                Data yang telah terekam akan diproses dengan
                                rumus algoritma COCOMO II yang telah diperkuat
                                dengan Logika Fuzzy.
                            </StepCard>
                            <StepCard
                                icon="/svg/step-5.svg"
                                title="Didapatkan Hasil Estimasi"
                            >
                                Didapatkan hasil estimasi cost projek berupa{" "}
                                <span className="text-amber-500">
                                    Kilo Source Line of Code (KSLOC), Estimasi
                                    Waktu, Estimasi Biaya
                                </span>
                                , dan{" "}
                                <span className="text-amber-500">
                                    Estimasi jumlah Staff
                                </span>
                                .
                            </StepCard>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="px-6 text-white bg-indigo-600 lg:px-8">
                    <div className="container py-12 mx-auto">
                        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
                            <div>
                                <img
                                    src="/svg/logo-light.svg"
                                    alt="cocomo"
                                    width={250}
                                />
                                <p className="mt-6 text-sm md:text-base">
                                    Sistem penghitung estimasi projek perangkat
                                    lunak dengan menggunakan Algoritma{" "}
                                    <span className="text-amber-400">
                                        COCOMO II
                                    </span>{" "}
                                    yang telah diperkuat dengan{" "}
                                    <span className="text-amber-400">
                                        Logika Fuzzy
                                    </span>
                                    .
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold md:text-xl">
                                    Tautan Terkait
                                </h3>
                                <ul className="flex flex-col gap-2 mt-4">
                                    <li>
                                        <Link
                                            href={route("login")}
                                            className="text-sm transition md:text-base hover:text-indigo-100"
                                        >
                                            Masuk
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={route("register")}
                                            className="text-sm transition md:text-base hover:text-indigo-100"
                                        >
                                            Daftar
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold md:text-xl">
                                    Kontak
                                </h3>
                                <ul className="flex flex-col gap-2 mt-4">
                                    <li>
                                        <a
                                            href="https://goo.gl/maps/LyDyXEBiKgh7Hm8g9"
                                            target="_blank"
                                            className="flex items-start gap-2 text-sm transition md:text-base hover:text-indigo-100"
                                        >
                                            <img
                                                src="/svg/location-pin.svg"
                                                alt="location"
                                                width={24}
                                            />
                                            <p>
                                                Jl. Mastrip PO.BOX 164
                                                JemberJember Jawa Timur 68101
                                                Indonesia
                                            </p>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://wa.me/62895387228138"
                                            target="_blank"
                                            className="flex items-start gap-2 text-sm transition md:text-base hover:text-indigo-100"
                                        >
                                            <img
                                                src="/svg/whatsapp.svg"
                                                alt="whatsapp"
                                                width={24}
                                            />
                                            <p>+62 895 3872 28138</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-6 text-sm text-center text-white md:text-base bg-slate-900 lg:px-8">
                    © COCOMO II Estimation by{" "}
                    <a
                        href="https://github.com/nadahasnim"
                        target="_blank"
                        className="transition text-amber-400 hover:text-amber-500"
                    >
                        Nada Hasni Muhammad
                    </a>
                </div>
            </div>
        </>
    );
}
