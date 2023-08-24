import { Head, useForm } from "@inertiajs/inertia-react";
import { toast } from "react-toastify";
import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import FormCard from "@/Components/FormCard";
import ValidationErrors from "@/Components/ValidationErrors";
import Button from "@/Components/Button";

export default function Form(props) {
    const { project, effortMultiplier } = props;

    const { data, setData, put, processing, errors } = useForm({
        ...effortMultiplier,
        acap: -1 * effortMultiplier.acap,
        pcap: -1 * effortMultiplier.pcap,
        pcon: -1 * effortMultiplier.pcon,
        aplex: -1 * effortMultiplier.aplex,
        plex: -1 * effortMultiplier.plex,
        ltex: -1 * effortMultiplier.ltex,
        tool: -1 * effortMultiplier.tool,
        site: -1 * effortMultiplier.site,
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        put(
            route("effortmultiplier.update", {
                project,
                effortmultiplier: effortMultiplier,
            }),
            {
                onSuccess: () => {
                    toast.success("Berhasil Menyimpan Pengganda Usaha");
                },
                onError: (error) => {
                    toast.error(error);
                },
            }
        );
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Form Pengganda Usaha
                </h2>
            }
        >
            <Head title="Form Pengganda Usaha" />

            <div className="py-12">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <FormCard title="Form Pengganda Usaha">
                        <ValidationErrors errors={errors} />

                        <form onSubmit={handleSubmit}>
                            <h5 className="text-sm font-medium text-gray-700">
                                Form Pengganda Usaha (Effort Multiplier)
                            </h5>
                            <p className="text-xs text-gray-500">
                                Menghitung Effort Multiploer pada COCOMO II
                                diperlukan untuk menentukan waktu, jumlah staff,
                                dan estimasi biaya
                            </p>

                            {/* TABLE */}
                            <div className="mt-4">
                                <table className="w-full">
                                    <thead className="py-4 text-left border-b border-slate-300">
                                        <tr>
                                            <th className="py-2" width={30}>
                                                #
                                            </th>
                                            <th
                                                className="py-2 pl-4"
                                                width="40%"
                                            >
                                                Parameter
                                            </th>
                                            <th className="py-2 text-center border-b border-slate-300">
                                                Pembobotan (Sangat Rendah -
                                                Sangat Tinggi)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                1
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">RELY</p>
                                                <p className="text-sm text-gray-400 ">
                                                    Faktor skala yang
                                                    menggambarkan pengalaman
                                                    masa lalu organisasi dengan
                                                    proyek sejenis.
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        name="rely"
                                                        type="range"
                                                        value={data.rely}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={0.82}
                                                        max={1.26}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {data.rely}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                2
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">DATA</p>
                                                <p className="text-sm text-gray-400 ">
                                                    Ukuran database yang
                                                    digunakan. Ukuran dapat
                                                    dihitung menggunakan D/P
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="data"
                                                        value={data.data}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={0.9}
                                                        max={1.28}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {data.data}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                3
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">CPLX</p>
                                                <p className="text-sm text-gray-400 ">
                                                    Perangkat lunak dan
                                                    perangkat keras yang
                                                    digunakan dalam melakukan
                                                    fungsinya (arsitektur,
                                                    sistem)
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="cplx"
                                                        value={data.cplx}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={0.73}
                                                        max={1.74}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {data.cplx}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                4
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">DOCU</p>
                                                <p className="text-sm text-gray-400 ">
                                                    Kesesuaian dokumentasi
                                                    proyek terhadap kebutuhan
                                                    siklusuhidup perangkat lunak
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="docu"
                                                        value={data.docu}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={0.81}
                                                        max={1.23}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {data.docu}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                5
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">ACAP</p>
                                                <p className="text-sm text-gray-400 ">
                                                    Kemampuan personel dalam
                                                    analisis dan desain,
                                                    efisiensi dan ketelitian
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="acap"
                                                        value={data.acap}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={-1.42}
                                                        max={-0.71}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {Math.abs(data.acap)}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                6
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">PCAP</p>
                                                <p className="text-sm text-gray-400">
                                                    Kemampuan programmer dalam
                                                    efisiensi penulisan kode
                                                    program
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="pcap"
                                                        value={data.pcap}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={-1.34}
                                                        max={-0.76}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {Math.abs(data.pcap)}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                7
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">PCON</p>
                                                <p className="text-sm text-gray-400">
                                                    Pergantian personel tiap
                                                    tahun pada proyek. Semakin
                                                    sedikit pergantian maka
                                                    semakin tinggi skala
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="pcon"
                                                        value={data.pcon}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={-1.29}
                                                        max={-0.81}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {Math.abs(data.pcon)}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                8
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">RUSE</p>
                                                <p className="text-sm text-gray-400">
                                                    Merupakan cost driver
                                                    terkait tingkat upaya yang
                                                    diperlukan untuk
                                                    mengembangkan komponen
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="ruse"
                                                        value={data.ruse}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={0.95}
                                                        max={1.24}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {data.ruse}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                9
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">TIME</p>
                                                <p className="text-sm text-gray-400">
                                                    Persentase kendala waktu
                                                    eksekusi yang diharapkan
                                                    dapat digunakan pada sistem
                                                    perangkat lunak
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="time"
                                                        value={data.time}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={1.0}
                                                        max={1.63}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {data.time}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                10
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">STOR</p>
                                                <p className="text-sm text-gray-400">
                                                    Persentase tingkat kendala
                                                    penyimpanan utama yang
                                                    dikenakan pada sistem
                                                    perangkat lunak
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="stor"
                                                        value={data.stor}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={1.0}
                                                        max={1.46}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {data.stor}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                11
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">PVOL</p>
                                                <p className="text-sm text-gray-400">
                                                    Perubahan yang terjadi pada
                                                    hardware dan software dalam
                                                    kurun waktu tertentu
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="pvol"
                                                        value={data.pvol}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={0.82}
                                                        max={1.3}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {data.pvol}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                12
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">APLEX</p>
                                                <p className="text-sm text-gray-400">
                                                    Pengalaman kerja tim proyek
                                                    pada suatu proyek
                                                    pengembangan aplikasi sistem
                                                    perangkat lunak atau
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="aplex"
                                                        value={data.aplex}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={-1.22}
                                                        max={-0.76}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {Math.abs(data.aplex)}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                13
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">PLEX</p>
                                                <p className="text-sm text-gray-400">
                                                    merupakan penilaian
                                                    pemahaman tim proyek dalam
                                                    menggunakan platform
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="plex"
                                                        value={data.plex}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={-1.19}
                                                        max={-0.85}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {Math.abs(data.plex)}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                14
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">LTEX</p>
                                                <p className="text-sm text-gray-400">
                                                    Merupakan penilaian
                                                    pengalaman tim proyek dalam
                                                    pemrograman
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="ltex"
                                                        value={data.ltex}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={-1.2}
                                                        max={-0.84}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {Math.abs(data.ltex)}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                15
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">TOOL</p>
                                                <p className="text-sm text-gray-400">
                                                    Merupakan penilaia ucost
                                                    driver terkait penggunaan
                                                    CASE tool dalam pengembangan
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="tool"
                                                        value={data.tool}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={-1.17}
                                                        max={-0.78}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {Math.abs(data.tool)}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                16
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">SITE</p>
                                                <p className="text-sm text-gray-400">
                                                    Adalah bagaimana cara
                                                    komunikasi yang digunakan
                                                    dalam pengembangan perangkat
                                                    lunak pada proyek
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="site"
                                                        value={data.site}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={-1.43}
                                                        max={-0.78}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {Math.abs(data.site)}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                17
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-4"
                                            >
                                                <p className="">SCED</p>
                                                <p className="text-sm text-gray-400">
                                                    Merupakan penilaian cost
                                                    driver terkait tingkat
                                                    persentase dari percepatan
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center w-full gap-2">
                                                    <input
                                                        type="range"
                                                        name="sced"
                                                        value={data.sced}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        min={0.82}
                                                        max={1.26}
                                                        step={0.01}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:bg-gray-300"
                                                    />
                                                    <div className="font-semibold text-indigo-500">
                                                        {data.sced}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    className="mt-6 bg-indigo-600"
                                    processing={processing}
                                >
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    </FormCard>
                </div>
            </div>
        </Authenticated>
    );
}
