import React, { useState, useEffect, useRef } from 'react';
export default function ModalComponent({isOpen,setIsOpen, action, title, desc}) {
    // const [isOpen, setIsOpen] = useState(false);
    const overlayRef = useRef(null);
    const dialogRef = useRef(null);
    const openBtnRef = useRef(null);

    const closeModal = () => {
        setIsOpen(false);
        document.body.style.overflow = "";
        openBtnRef.current?.focus();
    };



    // Accessibility: ESC key and Tab Trapping
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            if (e.key === "Escape") closeModal();

            if (e.key === "Tab") {
                const focusable = dialogRef.current.querySelectorAll(
                    "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
                );
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <>
            <div
                id="modalOverlay"
                ref={overlayRef}
                onClick={(e) => e.target.id === "modalOverlay" && closeModal()}
                className={`fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] ${!isOpen ? "hidden" : ""}`}
            >
                <div
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    tabIndex="-1"
                    className="w-full max-w-lg bg-white border border-slate-100 shadow-lg rounded-lg relative max-h-[95vh] overflow-y-auto outline-none p-4 md:p-6"
                >

                    <button type="button" aria-label="Close modal"
                        onClick={closeModal}
                        className="flex items-center absolute top-6 right-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="size-3 cursor-pointer fill-slate-500 hover:fill-red-600"
                            aria-hidden="true" viewBox="0 0 329.269 329">
                            <path
                                d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0" />
                        </svg>
                    </button>

                    <div className="text-center">
                        <div className="w-14 h-14 p-3.5 mb-4 mx-auto rounded-full bg-red-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-full fill-red-500 inline" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                    data-original="#000000" />
                                <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                    data-original="#000000" />
                            </svg>
                        </div>
                        <h3 id="modal-title" className="text-slate-900 text-base font-semibold">{title}</h3>
                        <p className="text-slate-600 text-sm mt-2 leading-relaxed">{desc}</p>
                    </div>

                    <div className="flex justify-between gap-4 mt-6">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-3.5 py-2 w-full text-slate-900 text-sm font-semibold rounded-md cursor-pointer bg-white border border-slate-300 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                            No, Cancel
                        </button>
                        <button
                            type="button"
                            className="px-3.5 py-2 w-full text-white text-sm font-semibold rounded-md cursor-pointer bg-red-600 border border-red-600 transition-colors hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            onClick={action}
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>


        </>
    );
};