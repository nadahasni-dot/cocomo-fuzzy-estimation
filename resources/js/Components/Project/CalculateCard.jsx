import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { toast } from "react-toastify";

export default function CalculateCard({
    enabled,
    isButton,
    href,
    handleClick,
    value,
    title,
    description,
    className,
}) {
    return (
        <Link
            href={href}
            as={isButton ? "button" : "a"}
            className={`${className} p-4 rounded-lg shadow hover:opacity-70 transition block`}
            onClick={(e) => {
                if (!isButton) return;
                if (isButton) {
                    e.preventDefault();
                }
                if (!enabled) {
                    toast.info(
                        "Harap lengkapi fungsionalitas, faktor skala, dan pengganda usaha"
                    );
                    return;
                }

                handleClick();
            }}
        >
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-4">
                        <p className="text-xl text-white font-nold">{title}</p>
                        {!isButton && (
                            <span className="flex items-center px-2 py-1 text-xs font-bold bg-white rounded-lg">
                                {value ?? "Belum Diisi"}
                            </span>
                        )}
                    </div>
                    <p className="mt-1 text-xs text-white">{description}</p>
                </div>
                <img src="/icons/chevron.svg" alt="chevron" width={30} />
            </div>
        </Link>
    );
}
