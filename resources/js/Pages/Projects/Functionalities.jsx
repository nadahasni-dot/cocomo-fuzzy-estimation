import FormCard from "@/Components/FormCard";
import Input from "@/Components/Input";
import { Link } from "@inertiajs/inertia-react";
import { useState, useCallback, useEffect } from "react";
import FunctionalityRowItem from "./FunctionalityRowItem";
import { debounce, pickBy } from "lodash";
import { Inertia } from "@inertiajs/inertia";

export default function Functionalities({ functionalities, project }) {
    const { data, meta, filtered } = functionalities;

    const [params, setParams] = useState(filtered);

    const reload = useCallback(
        debounce((query) => {
            Inertia.get(route("projects.show", project), pickBy(query), {
                preserveState: true,
                preserveScroll: true,
            });
        }, 500),
        []
    );

    useEffect(() => reload(params), [params]);

    const handleChange = (e) => {
        setParams({ ...params, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        setParams({ ...params, [e.target.name]: e.target.value, page: 1 });
    };

    return (
        <FormCard
            title="Fungsionalitas"
            className="mt-6"
            action={
                <Link
                    href={route("functionalities.create", project)}
                    className="px-3 py-1 text-sm text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-300"
                >
                    + Fungsionalitas
                </Link>
            }
        >
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <span>Tampilkan</span>
                    <select
                        id="load"
                        name="load"
                        value={params.load}
                        onChange={handleChange}
                        className="py-1 text-sm border rounded-lg"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                        <option value="10">60</option>
                        <option value="20">70</option>
                        <option value="30">80</option>
                        <option value="40">90</option>
                        <option value="50">100</option>
                    </select>
                    <span>Item</span>
                </div>
                <div className="flex items-center gap-2">
                    <p>Cari: </p>
                    <Input
                        value={params.q}
                        handleChange={handleSearch}
                        type="text"
                        name="q"
                        placeholder="Cari Fungsionalitas"
                        className="py-1 text-sm"
                    />
                </div>
            </div>
            <table className="w-full mt-4 table-fixed">
                <thead className="py-4 text-left border-b border-slate-300">
                    <tr>
                        <th scope="col" className="py-2" width={30}>
                            #
                        </th>
                        <th scope="col" className="py-2 pl-2" width="40%">
                            Nama
                        </th>
                        <th scope="col" className="py-2 pl-2">
                            Bahasa Pemrograman
                        </th>
                        <th scope="col" className="py-2 pl-2">
                            KSLOC
                        </th>
                        <th scope="col" className="py-2 pl-2">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colspan="5"
                                scope="col"
                                className="py-4 text-center bg-indigo-50"
                            >
                                Tidak Ada Fungsionalitas
                            </td>
                        </tr>
                    ) : (
                        data.map((functionality, index) => (
                            <FunctionalityRowItem
                                meta={meta}
                                index={index + 1}
                                key={functionality.id}
                                project={project}
                                functionality={functionality}
                            />
                        ))
                    )}
                </tbody>
            </table>

            {/* pagination */}
            <ul className="flex items-center justify-center gap-2 mt-2">
                {meta.links.map((item, index) => {
                    let page;

                    if (item.url) {
                        page = new URL(item.url).searchParams.get("page");
                    } else {
                        page = 1;
                    }

                    return (
                        <button
                            key={index}
                            href={item.url || ""}
                            disabled={item.url === null}
                            dangerouslySetInnerHTML={{ __html: item.label }}
                            className={`rounded-lg px-3 py-1 transition hover:bg-indigo-200 border border-gray-200
                            ${
                                item.url === null
                                    ? "bg-indigo-100 text-gray-400"
                                    : ""
                            }
                            ${
                                item.label == meta.current_page
                                    ? "bg-indigo-600 text-white"
                                    : ""
                            }`}
                            onClick={() =>
                                setParams({
                                    ...params,
                                    page,
                                })
                            }
                        />
                    );
                })}
            </ul>
        </FormCard>
    );
}
