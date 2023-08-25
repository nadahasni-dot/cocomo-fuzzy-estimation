import { Link, useForm } from "@inertiajs/inertia-react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";

export default function FunctionalityRowItem({
    index,
    functionality,
    project,
    meta,
}) {
    const { name, description, languageFunctionPoint, ksloc } = functionality;

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const { processing, delete: destroy } = useForm({
        functionality,
    });

    const handleDelete = (e) => {
        if (processing) return;

        destroy(route("functionalities.destroy", { functionality, project }), {
            onSuccess: () => {
                toast.success("Berhasil Menghapus Fungsionalitas");
            },
            onError: (error) => {
                toast.error(error);
            },
        });
    };

    const getDisplayNumber = (num) => {
        if (meta.current_page === 1) {
            return num;
        }

        const startIndex = (meta.current_page - 1) * meta.per_page;

        return startIndex + num;
    };

    return (
        <tr className="transition hover:bg-slate-100">
            <td scope="col" className="py-2 font-bold">
                {getDisplayNumber(index)}
            </td>
            <td scope="col" className="py-2 pl-2">
                <p className="">{name}</p>
                <p className="text-sm text-gray-400 line-clamp-2">
                    {description}
                </p>
            </td>
            <td scope="col" className="py-2 pl-2">
                {languageFunctionPoint.name}
            </td>
            <td scope="col" className="py-2 pl-2">
                {ksloc}
            </td>
            <td scope="col" className="py-2 pl-2">
                <div className="flex items-center gap-2">
                    <Link
                        href={route("functionalities.edit", {
                            project,
                            functionality,
                        })}
                        as="button"
                        className="flex items-center px-3 py-1 text-white transition bg-indigo-600 rounded-lg hover:opacity-70"
                    >
                        <img src="/icons/edit.svg" alt="edit" width={16} /> Edit
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
                                    Hapus Fungsionalitas?
                                </Dialog.Title>
                                <Dialog.Description className="text-sm text-gray-400">
                                    Aksi ini akan menghapus fungsionalitas
                                </Dialog.Description>

                                <p className="mt-4 ">
                                    Apakah anda yakin ingin menghapus
                                    fungsionalitas{" "}
                                    <span className="text-red-500">
                                        "{name}"
                                    </span>
                                    ? Semua data tekait fungsionalitas akan
                                    dihapus dan tidak dapat dikembalikan.
                                </p>

                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        onClick={() => setIsDeleteOpen(false)}
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
                        className="flex items-center px-3 py-1 text-white transition bg-red-500 rounded-lg hover:opacity-70"
                    >
                        <img src="/icons/delete.svg" alt="delete" width={16} />{" "}
                        Hapus
                    </button>
                </div>
            </td>
        </tr>
    );
}
