import { Head, useForm } from "@inertiajs/inertia-react";
import { toast } from "react-toastify";
import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import FormCard from "@/Components/FormCard";
import ValidationErrors from "@/Components/ValidationErrors";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import Button from "@/Components/Button";
import SelectInput from "@/Components/Select";

export default function Form(props) {
    const { languageFunctionPoints, project } = props;

    const options = languageFunctionPoints.map((item) => {
        return { value: item.id, label: item.name };
    });

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        languageFunctionPointId: "",
        exi: { easy: 0, moderate: 0, hard: 0 },
        exo: { easy: 0, moderate: 0, hard: 0 },
        exiq: { easy: 0, moderate: 0, hard: 0 },
        ilof: { easy: 0, moderate: 0, hard: 0 },
        elof: { easy: 0, moderate: 0, hard: 0 },
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const onSelect = (value) => {
        setData("languageFunctionPointId", value);
    };

    const handleChangeTableInput = (e) => {
        const name = e.target.name;
        const splitted = name.split("_");
        const paramName = splitted[0];
        const paramType = splitted[1];

        setData({
            ...data,
            [paramName]: {
                ...data[paramName],
                [paramType]: Number(e.target.value),
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        post(route("functionalities.store", project), {
            onSuccess: () => {
                toast.success("Berhasil Menyimpan Fungsionalitas");
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
                    Form Fungsionalitas
                </h2>
            }
        >
            <Head title="Form Fungsionalitas" />

            <div className="py-12">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <FormCard title="Form Informasi Proyek">
                        <ValidationErrors errors={errors} />

                        <form onSubmit={handleSubmit}>
                            <div>
                                <Label
                                    forInput="name"
                                    value="Nama Fungsionalitas"
                                    required={true}
                                />

                                <Input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="block w-full mt-1"
                                    autoComplete="name"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    placeholder="Nama Fungsionalitas"
                                    required={true}
                                />
                            </div>

                            <div className="mt-4">
                                <Label
                                    forInput="description"
                                    value="Deskripsi Fungsionalitas"
                                />

                                <TextArea
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    className="block w-full mt-1"
                                    autoComplete="description"
                                    isFocused={false}
                                    handleChange={onHandleChange}
                                    placeholder="Deskripsi Fungsionalitas"
                                />
                            </div>

                            <div className="mt-4">
                                <Label
                                    required
                                    forInput="languageFunctionPointId"
                                    value="Bahasa Pemrograman"
                                />

                                <SelectInput
                                    required={true}
                                    name="languageFunctionPointId"
                                    value={data.languageFunctionPointId}
                                    className="block w-full mt-1"
                                    handleChange={onSelect}
                                    placeholder="Pilih Bahasa Pemrograman"
                                    options={options}
                                />
                            </div>

                            <h5 className="mt-4 text-sm font-medium text-gray-700">
                                Pembobotan Fungsional
                            </h5>
                            <p className="text-xs text-gray-500">
                                Lengkapi tabel pembobotan dibawah sesuai dengan
                                tingkat kesulitan fungsionalitas ini
                            </p>

                            {/* TABLE */}
                            <div className="mt-4">
                                <table className="w-full ">
                                    <thead className="py-4 text-left border-b border-slate-300">
                                        <tr>
                                            <th
                                                colSpan="2"
                                                className="py-2"
                                            ></th>
                                            <th
                                                colSpan="3"
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
                                                className="py-2 pl-2"
                                                width="40%"
                                            >
                                                Parameter
                                            </th>
                                            <th className="py-2 pl-2">Mudah</th>
                                            <th className="py-2 pl-2">
                                                Sedang
                                            </th>
                                            <th className="py-2 pl-2">Sulit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                1
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <p className="">
                                                    External Input (Exi)
                                                </p>
                                                <p className="text-sm text-gray-400 line-clamp-2">
                                                    Setiap masukan pengguna yang
                                                    berorientasi pada data
                                                    tertentu
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <input
                                                    required
                                                    type="number"
                                                    name="exi_easy"
                                                    className="border-0"
                                                    value={data.exi.easy}
                                                    onChange={
                                                        handleChangeTableInput
                                                    }
                                                />
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <input
                                                    className="border-0"
                                                    required
                                                    type="number"
                                                    name="exi_moderate"
                                                    value={data.exi.moderate}
                                                    onChange={
                                                        handleChangeTableInput
                                                    }
                                                />
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <input
                                                    className="border-0"
                                                    required
                                                    type="number"
                                                    name="exi_hard"
                                                    value={data.exi.hard}
                                                    onChange={
                                                        handleChangeTableInput
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                2
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <p className="">
                                                    External Output (Exo)
                                                </p>
                                                <p className="text-sm text-gray-400 line-clamp-2">
                                                    Setiap masukan pengguna yang
                                                    menyediakan tampilan
                                                    berorientasi informasi pada
                                                    pengguna lain
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <input
                                                    className="border-0"
                                                    required
                                                    type="number"
                                                    name="exo_easy"
                                                    value={data.exo.easy}
                                                    onChange={
                                                        handleChangeTableInput
                                                    }
                                                />
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <input
                                                    className="border-0"
                                                    required
                                                    type="number"
                                                    name="exo_moderate"
                                                    value={data.exo.moderate}
                                                    onChange={
                                                        handleChangeTableInput
                                                    }
                                                />
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <input
                                                    className="border-0"
                                                    required
                                                    type="number"
                                                    name="exo_hard"
                                                    value={data.exo.hard}
                                                    onChange={
                                                        handleChangeTableInput
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                3
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <p className="">
                                                    External Inquiry (Exiq)
                                                </p>
                                                <p className="text-sm text-gray-400 line-clamp-2">
                                                    Pertanyaan yang
                                                    didefinisikan/dimasukkan
                                                    secara online yang
                                                    menghasilkan beberapa
                                                    formulir tanggapan
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <input
                                                    className="border-0"
                                                    required
                                                    type="number"
                                                    name="exiq_easy"
                                                    value={data.exiq.easy}
                                                    onChange={
                                                        handleChangeTableInput
                                                    }
                                                />
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <input
                                                    className="border-0"
                                                    required
                                                    type="number"
                                                    name="exiq_moderate"
                                                    value={data.exiq.moderate}
                                                    onChange={
                                                        handleChangeTableInput
                                                    }
                                                />
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <input
                                                    className="border-0"
                                                    required
                                                    type="number"
                                                    name="exiq_hard"
                                                    value={data.exiq.hard}
                                                    onChange={
                                                        handleChangeTableInput
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                4
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <p className="">
                                                    Internal Logic File (ILof)
                                                </p>
                                                <p className="text-sm text-gray-400 line-clamp-2">
                                                    Setiap masukan yang berupa
                                                    pengunggahan berkas logis
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <input
                                                    className="border-0"
                                                    required
                                                    type="number"
                                                    name="ilof_easy"
                                                    value={data.ilof.easy}
                                                    onChange={
                                                        handleChangeTableInput
                                                    }
                                                />
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <input
                                                    className="border-0"
                                                    required
                                                    type="number"
                                                    name="ilof_moderate"
                                                    value={data.ilof.moderate}
                                                    onChange={
                                                        handleChangeTableInput
                                                    }
                                                />
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <input
                                                    className="border-0"
                                                    required
                                                    type="number"
                                                    name="ilof_hard"
                                                    value={data.ilof.hard}
                                                    onChange={
                                                        handleChangeTableInput
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="py-2">
                                                5
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <p className="">
                                                    External Logic (ELof)
                                                </p>
                                                <p className="text-sm text-gray-400 line-clamp-2">
                                                    Setiap berkas yang
                                                    ditampilkan sebagai
                                                    informasi untuk sistem
                                                    aplikasi yang lain
                                                </p>
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <input
                                                    className="border-0"
                                                    required
                                                    type="number"
                                                    name="elof_easy"
                                                    value={data.elof.easy}
                                                    onChange={
                                                        handleChangeTableInput
                                                    }
                                                />
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <input
                                                    className="border-0"
                                                    required
                                                    type="number"
                                                    name="elof_moderate"
                                                    value={data.elof.moderate}
                                                    onChange={
                                                        handleChangeTableInput
                                                    }
                                                />
                                            </td>
                                            <td
                                                scope="col"
                                                className="py-2 pl-2"
                                            >
                                                <input
                                                    className="border-0"
                                                    required
                                                    type="number"
                                                    name="elof_hard"
                                                    value={data.elof.hard}
                                                    onChange={
                                                        handleChangeTableInput
                                                    }
                                                />
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
