import FormCard from "@/Components/FormCard";
import ProjectSummaryCard from "@/Components/Project/ProjectSummaryCard";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { toast } from "react-toastify";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { formatTimestamp } from "@/Utils/date";
import Functionalities from "./Functionalities";
import CalculateCard from "@/Components/Project/CalculateCard";
import { Inertia } from "@inertiajs/inertia";
import { currencyFormat, roundNumber } from "@/Utils/number_format";

export default function Projects(props) {
    const {
        project,
        ksloc,
        functionalities,
        countFunctionality,
        scaleFactor,
        effortMultiplier,
    } = props;

    const [isImageOpen, setIsImageOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const { processing, delete: destroy } = useForm({
        project,
    });

    const handleDelete = (e) => {
        if (processing) return;

        destroy(route("projects.destroy", project), {
            onSuccess: () => {
                toast.success("Berhasil Menghapus Proyek");
            },
            onError: (error) => {
                toast.error(error);
            },
        });
    };

    const checkIsCalculateAble = () =>
        effortMultiplier?.effort_multiplier &&
        scaleFactor?.scale_factor &&
        ksloc > 0;

    const handleCalculate = () => {
        Inertia.post(route("projects.calculate", project), null, {
            onSuccess: () => {
                toast.success("Berhasil Menyimpan Kalkulasi");
            },
            onError: (error) => {
                toast.error(error);
            },
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Detail Proyek
                </h2>
            }
        >
            <Head title="Proyek" />

            <div className="py-12">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Top Info */}
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                        <ProjectSummaryCard
                            title="KSLOC"
                            icon="/icons/code.svg"
                            value={ksloc ? roundNumber(ksloc) : "-"}
                            description="Estimasi jumlah baris kode (Kilo Source Line of Code)"
                            className="border-indigo-600"
                        />
                        <ProjectSummaryCard
                            title="Estimasi Waktu"
                            icon="/icons/clock.svg"
                            value={`${
                                project.est_time
                                    ? roundNumber(project.est_time)
                                    : "-"
                            } Bulan`}
                            description="Estimasi waktu pengerjaan proyek dalam satuan bulan"
                            className="border-amber-400"
                        />
                        <ProjectSummaryCard
                            title="Estimasi Staf"
                            icon="/icons/staff.svg"
                            value={`${
                                project.est_staff
                                    ? roundNumber(project.est_staff)
                                    : "-"
                            } Orang`}
                            description="Estimasi jumlah staf yang diperlukan untuk menyelesaikan proyek"
                            className="border-sky-600"
                        />
                        <ProjectSummaryCard
                            title="Estimasi Biaya"
                            icon="/icons/cost.svg"
                            value={
                                project.est_cost
                                    ? currencyFormat(project.est_cost)
                                    : "-"
                            }
                            description="Estimasi biaya staff yang diperlukan untuk menyelesaikan proyek"
                            className="border-green-600"
                        />
                        <ProjectSummaryCard
                            title="Fungsionalitas"
                            icon="/icons/functionalities.svg"
                            value={`${countFunctionality} Fungsionalitas`}
                            description="Jumlah modul/fungsionalitas pada proyek"
                            className="md:col-span-2 border-fuchsia-600"
                        />
                        <ProjectSummaryCard
                            title="Estimasi Usaha"
                            icon="/icons/effort.svg"
                            value={`${
                                project.est_effort
                                    ? roundNumber(project.est_effort)
                                    : "-"
                            } Person Month`}
                            description="Estimasi usaha untuk menyelesaikan proyek dalam satuan (Person Month)"
                            className="md:col-span-2 border-lime-600"
                        />
                    </div>

                    {/* Main Info */}
                    <FormCard title="informasi Proyek" className="mt-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <dt className="text-sm text-gray-500">
                                    Nama Proyek
                                </dt>
                                <dd className="text-lg font-bold">
                                    {project.name}
                                </dd>
                                <dt className="mt-3 text-sm text-gray-500">
                                    Deskripsi Proyek
                                </dt>
                                <dd className="font-semibold">
                                    {project.description}
                                </dd>
                                <dt className="mt-3 text-sm text-gray-500">
                                    Rerata Biaya Staff
                                </dt>
                                <dd className="font-semibold">
                                    Rp.{project.avgStaffCost ?? "-"}
                                </dd>
                                <dt className="mt-3 text-sm text-gray-500">
                                    Status
                                </dt>
                                <dd
                                    className={`font-semibold ${
                                        project.status === 0
                                            ? "text-amber-400"
                                            : "text-green-600"
                                    }`}
                                >
                                    {project.status === 0
                                        ? "Draf"
                                        : "Terkalkulasi"}
                                </dd>
                                <dt className="mt-3 text-sm text-gray-500">
                                    Gambar
                                </dt>
                                <dd>
                                    {project.image ? (
                                        <div>
                                            <Dialog
                                                open={isImageOpen}
                                                onClose={() =>
                                                    setIsImageOpen(false)
                                                }
                                                className="relative z-50"
                                            >
                                                <div
                                                    className="fixed inset-0 bg-black/30"
                                                    aria-hidden="true"
                                                />
                                                <div className="fixed inset-0 flex items-center justify-center p-4">
                                                    <Dialog.Panel className="max-w-4xl p-6 mx-auto bg-white rounded-xl">
                                                        <Dialog.Title className="text-xl font-bold">
                                                            {project.title}
                                                        </Dialog.Title>
                                                        <img
                                                            src={`/storage/${project.image}`}
                                                            alt={project.name}
                                                            className="w-full"
                                                        />
                                                    </Dialog.Panel>
                                                </div>
                                            </Dialog>
                                            <img
                                                src={`/storage/${project.image}`}
                                                alt={project.name}
                                                width={150}
                                                onClick={() =>
                                                    setIsImageOpen(true)
                                                }
                                            />
                                        </div>
                                    ) : (
                                        "Tidak Ada gambar"
                                    )}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">
                                    Dibuat Pada
                                </dt>
                                <dd className="font-semibold">
                                    {formatTimestamp(project.created_at)}
                                </dd>
                                <dt className="mt-3 text-sm text-gray-500">
                                    Diperbarui Pada
                                </dt>
                                <dd className="font-semibold">
                                    {formatTimestamp(project.updated_at)}
                                </dd>
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-4">
                            <Link
                                href={route("projects.edit", project)}
                                className="flex items-center gap-1 px-3 py-1 font-semibold text-white transition bg-indigo-600 rounded-lg shadow hover:bg-indigo-400"
                            >
                                <img
                                    src="/icons/edit.svg"
                                    alt="edit"
                                    width={20}
                                />{" "}
                                Edit
                            </Link>

                            <Dialog
                                open={isDeleteOpen}
                                onClose={() => setIsDeleteOpen(false)}
                                className="relative z-50"
                            >
                                <div
                                    className="fixed inset-0 bg-black/30"
                                    aria-hidden="true"
                                />
                                <div className="fixed inset-0 flex items-center justify-center p-4">
                                    <Dialog.Panel className="max-w-sm p-6 mx-auto bg-white rounded-xl">
                                        <Dialog.Title className="text-xl font-bold">
                                            Hapus Proyek?
                                        </Dialog.Title>
                                        <Dialog.Description className="text-sm text-gray-400">
                                            Aksi ini akan menghapus proyek anda
                                        </Dialog.Description>

                                        <p className="mt-4 ">
                                            Apakah anda yakin ingin menghapus
                                            proyek{" "}
                                            <span className="text-red-500">
                                                "{project.name}"
                                            </span>
                                            ? Semua data tekait proyek akan
                                            dihapus dan tidak dapat
                                            dikembalikan.
                                        </p>

                                        <div className="flex justify-end gap-2 mt-4">
                                            <button
                                                onClick={() =>
                                                    setIsDeleteOpen(false)
                                                }
                                                className="px-3 py-2 text-sm font-semibold text-white transition bg-indigo-600 rounded-lg shadow hover:bg-indigo-400"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                onClick={handleDelete}
                                                className="px-3 py-2 text-sm font-semibold text-white transition bg-red-600 rounded-lg shadow hover:bg-red-400"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </div>
                            </Dialog>
                            <button
                                onClick={() => setIsDeleteOpen(true)}
                                className={`flex gap-1 items-center px-4 py-2 font-semibold text-white transition bg-red-600 rounded-lg shadow hover:bg-red-400 ${
                                    processing && "bg-red-200"
                                }`}
                            >
                                <img
                                    src="/icons/delete.svg"
                                    alt="delete"
                                    width={20}
                                />{" "}
                                Hapus
                            </button>
                        </div>
                    </FormCard>

                    {/* Functionalities */}
                    <Functionalities
                        functionalities={functionalities}
                        project={project}
                    />

                    {/* Scale Factor */}
                    <CalculateCard
                        className={`${
                            scaleFactor?.scale_factor
                                ? "bg-green-500"
                                : "bg-amber-400"
                        } mt-6`}
                        title="Faktor Skala"
                        description="Lengkapi formulir faktor skala (Scale Factors) untuk mendapatkan perhitungan estimasi"
                        value={scaleFactor?.scale_factor}
                        href={route(
                            scaleFactor?.scale_factor
                                ? "scalefactor.edit"
                                : "scalefactor.create",
                            { project, scalefactor: scaleFactor }
                        )}
                    />

                    {/* Effort Multiplier */}
                    <CalculateCard
                        className={`${
                            effortMultiplier?.effort_multiplier
                                ? "bg-green-500"
                                : "bg-amber-400"
                        } mt-6`}
                        title="Pengganda Usaha"
                        description="Lengkapi formulir (Effort Multiplier) untuk mendapatkan perhitungan estimasi"
                        value={effortMultiplier?.effort_multiplier}
                        href={route(
                            effortMultiplier?.effort_multiplier
                                ? "effortmultiplier.edit"
                                : "effortmultiplier.create",
                            { project, effortmultiplier: effortMultiplier }
                        )}
                    />

                    {/* CALCULATE */}
                    <CalculateCard
                        isButton
                        className={`${
                            checkIsCalculateAble()
                                ? "bg-sky-500"
                                : "bg-gray-500"
                        } mt-6 w-full`}
                        title="Kalkulasi Estimasi Bisa Dilakukan"
                        description="Lengkapi kebutuhan fungsional, faktor skala, dan pengganda usaha terlebih dahulu"
                        enabled={checkIsCalculateAble()}
                        handleClick={handleCalculate}
                    />
                </div>
            </div>
        </Authenticated>
    );
}
