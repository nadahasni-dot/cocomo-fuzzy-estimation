import { Head, useForm } from "@inertiajs/inertia-react";
import { toast } from "react-toastify";
import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import FormCard from "@/Components/FormCard";
import ValidationErrors from "@/Components/ValidationErrors";
import Button from "@/Components/Button";

export default function Form(props) {
    const { project } = props;

    const { setData, post, processing, errors } = useForm({
        prec: "",
        flex: "",
        resl: "",
        team: "",
        pmat: "",
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

        post(route("scalefactor.store", project), {
            onSuccess: () => {
                toast.success("Berhasil Menyimpan Faktor Skala");
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
                    Form Faktor Skala
                </h2>
            }
        >
            <Head title="Form Faktor Skala" />

            <div className="py-12">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <FormCard title="Form Faktor Skala">
                        <ValidationErrors errors={errors} />

                        <form onSubmit={handleSubmit}>
                            <h5 className="text-sm font-medium text-gray-700">
                                Pembobotan Faktor Scala (Scale Factor)
                            </h5>
                            <p className="text-xs text-gray-500">
                                Menghitung Scale Factor pada COCOMO II
                                diperlukan untuk menentukan factor eksponen yang
                                kemudian digunakan dalam menentukan usaha dari
                                suatu proyek
                            </p>

                            {/* TABLE */}
                            <div className="mt-4">
                                <table className="w-full">
                                    <thead className="py-4 text-left border-b border-slate-300">
                                        <tr>
                                            <th
                                                colSpan="2"
                                                className="py-2"
                                            ></th>
                                            <th
                                                colSpan="5"
                                                className="py-2 text-center border-b border-slate-300"
                                            >
                                                Pembobotan
                                            </th>
                                        </tr>
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
                                            <th
                                                className="py-2 pl-2 text-center"
                                                width="12%"
                                            >
                                                Sangat Rendah
                                            </th>
                                            <th
                                                className="py-2 pl-2 text-center"
                                                width="12%"
                                            >
                                                Rendah
                                            </th>
                                            <th
                                                className="py-2 pl-2 text-center"
                                                width="12%"
                                            >
                                                Nominal
                                            </th>
                                            <th
                                                className="py-2 pl-2 text-center"
                                                width="12%"
                                            >
                                                Tinggi
                                            </th>
                                            <th
                                                className="py-2 pl-2 text-center"
                                                width="12%"
                                            >
                                                Sangat Tinggi
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
                                                <p className="">PREC</p>
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
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="prec"
                                                        className="w-4 h-4"
                                                        value="SR"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="prec"
                                                        className="w-4 h-4"
                                                        value="R"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="prec"
                                                        className="w-4 h-4"
                                                        value="N"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="prec"
                                                        className="w-4 h-4"
                                                        value="T"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="prec"
                                                        className="w-4 h-4"
                                                        value="ST"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
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
                                                <p className="">FLEX</p>
                                                <p className="text-sm text-gray-400 ">
                                                    Faktor skala yang
                                                    menggambarkan kemampuan
                                                    klien dalam menentukan
                                                    tujuan dan mengkomunikasikan
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="flex"
                                                        className="w-4 h-4"
                                                        value="SR"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="flex"
                                                        className="w-4 h-4"
                                                        value="R"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="flex"
                                                        className="w-4 h-4"
                                                        value="N"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="flex"
                                                        className="w-4 h-4"
                                                        value="T"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="flex"
                                                        className="w-4 h-4"
                                                        value="ST"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
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
                                                <p className="">RESL</p>
                                                <p className="text-sm text-gray-400 ">
                                                    Faktor skala yang
                                                    menggambarkan seberapa
                                                    sering perusahaan
                                                    merencanakan manajemen
                                                    resiko terhadap
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="resl"
                                                        className="w-4 h-4"
                                                        value="SR"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="resl"
                                                        className="w-4 h-4"
                                                        value="R"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="resl"
                                                        className="w-4 h-4"
                                                        value="N"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="resl"
                                                        className="w-4 h-4"
                                                        value="T"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="resl"
                                                        className="w-4 h-4"
                                                        value="ST"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
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
                                                <p className="">TEAM</p>
                                                <p className="text-sm text-gray-400 ">
                                                    Faktor yang menggambarkan
                                                    seberapa baik tim bekerja
                                                    sama.
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="team"
                                                        className="w-4 h-4"
                                                        value="SR"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="team"
                                                        className="w-4 h-4"
                                                        value="R"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="team"
                                                        className="w-4 h-4"
                                                        value="N"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="team"
                                                        className="w-4 h-4"
                                                        value="T"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="team"
                                                        className="w-4 h-4"
                                                        value="ST"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
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
                                                <p className="">PMAT</p>
                                                <p className="text-sm text-gray-400 ">
                                                    Faktor yang menggambarkan
                                                    seberapa matang proses
                                                    pengembangan perangkat lunak
                                                    pada organisasi
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="pmat"
                                                        className="w-4 h-4"
                                                        value="SR"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="pmat"
                                                        className="w-4 h-4"
                                                        value="R"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="pmat"
                                                        className="w-4 h-4"
                                                        value="N"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="pmat"
                                                        className="w-4 h-4"
                                                        value="T"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <div className="flex items-center justify-center w-full">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="pmat"
                                                        className="w-4 h-4"
                                                        value="ST"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    />
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
