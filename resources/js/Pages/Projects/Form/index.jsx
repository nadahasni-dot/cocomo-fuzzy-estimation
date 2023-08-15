import Button from "@/Components/Button";
import FormCard from "@/Components/FormCard";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import TextArea from "@/Components/TextArea";
import ValidationErrors from "@/Components/ValidationErrors";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/inertia-react";
import { toast } from "react-toastify";
import React from "react";

export default function Form(props) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        // status: "",
        image: null,
        avgStaffCost: "",
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

        post(route("projects.store"), {
            onSuccess: () => {
                toast.success("Berhasil Menyimpan Proyek");
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
                    Project Form
                </h2>
            }
        >
            <Head title="Project Form" />

            <div className="py-12">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <FormCard title="Form Informasi Proyek">
                        <ValidationErrors errors={errors} />

                        <form onSubmit={handleSubmit}>
                            <div>
                                <Label
                                    forInput="name"
                                    value="Nama Proyek"
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
                                    placeholder="Nama Proyek"
                                    required={true}
                                />
                            </div>

                            <div className="mt-4">
                                <Label
                                    forInput="description"
                                    value="Deskripsi Proyek"
                                />

                                <TextArea
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    className="block w-full mt-1"
                                    autoComplete="description"
                                    isFocused={false}
                                    handleChange={onHandleChange}
                                    placeholder="Deskripsi Proyek"
                                />
                            </div>

                            <div className="mt-4">
                                <Label
                                    forInput="avgStaffCost"
                                    value="Rerata Biaya Staff/bulan"
                                    required={true}
                                />

                                <Input
                                    type="number"
                                    name="avgStaffCost"
                                    value={data.avgStaffCost}
                                    className="block w-full mt-1"
                                    autoComplete="avgStaffCost"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    placeholder="contoh: 3000000"
                                    required={true}
                                />
                            </div>

                            <div className="mt-4">
                                <Label forInput="image" value="Gambar Proyek" />

                                <Input
                                    type="file"
                                    name="image"
                                    className="block w-full p-2 mt-1 border"
                                    isFocused={false}
                                    handleChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                    placeholder="Pilih Gambar Proyek"
                                    required={false}
                                />
                            </div>

                            {/* <div className="mt-4">
                                <Label
                                    forInput="status"
                                    value="Status Proyek"
                                    required={true}
                                />

                                <Select
                                    name="status"
                                    value={data.status}
                                    className="block w-full mt-1"
                                    isFocused={false}
                                    handleChange={onHandleChange}
                                    placeholder="Status Proyek"
                                    required={true}
                                >
                                    <option value="">Pilih Status</option>
                                    <option value="0">Draf</option>
                                    <option value="1">Terkalkulasi</option>
                                </Select>
                            </div> */}

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
