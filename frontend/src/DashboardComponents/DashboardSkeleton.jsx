import React from "react";

const DashboardSkeleton = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-black via-zinc-950 to-black animate-pulse">

            {/* Yellow Glow Effects */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-yellow-400/5 blur-[140px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-0  w-125 h-125 bg-yellow-500/5 blur-[180px] rounded-full pointer-events-none" />
            {/* HERO */}

            <section className="relative h-screen overflow-hidden">


                <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-black to-zinc-950" />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute top-16 left-16 w-72 h-72 bg-yellow-500/10 rounded-full blur-[120px]" />

                <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center px-6">

                    <div className="h-5 w-44 rounded-full bg-zinc-700 mb-6" />

                    <div className="h-16 w-3/4 rounded-2xl bg-zinc-700 mb-5" />

                    <div className="h-5 w-2/3 rounded-full bg-zinc-800 mb-3" />
                    <div className="h-5 w-1/2 rounded-full bg-zinc-800 mb-10" />

                    <div className="flex gap-5">

                        <div className="h-14 w-44 rounded-xl bg-yellow-500/30 border border-yellow-500/20" />

                        <div className="h-14 w-44 rounded-xl bg-zinc-800 border border-zinc-700" />

                    </div>

                </div>

            </section>

            {/* STATS */}

            <section className="max-w-7xl mx-auto px-6 py-20">

                <div className="h-10 w-72 bg-zinc-800 rounded mx-auto mb-12" />

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl shadow-black/40"
                        >

                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-yellow-500/10 blur-3xl" />

                            <div className="flex justify-between relative">

                                <div>

                                    <div className="h-4 w-28 rounded-full bg-zinc-700 mb-6" />

                                    <div className="h-10 w-24 rounded-xl bg-zinc-700" />

                                </div>

                                <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 border border-yellow-500/20" />

                            </div>

                        </div>
                    ))}

                </div>

            </section>

            {/* UPCOMING CARS */}

            <section className="max-w-7xl mx-auto px-6 py-16">

                <div className="h-10 w-64 bg-zinc-800 rounded mb-12" />

                <div className="grid gap-8 md:grid-cols-2">

                    {[...Array(2)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800"
                        >
                            <div className="relative h-72">

                                <div className="absolute inset-0 bg-zinc-800" />

                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                            </div>

                            <div className="p-6">
                                <div className="h-5 w-32 bg-zinc-700 rounded mb-4" />
                                <div className="h-8 w-60 bg-zinc-700 rounded mb-6" />

                                <div className="h-12 rounded-xl bg-linear-to-r from-yellow-500/30 to-yellow-400/20 border border-yellow-500/20" />                            </div>
                        </div>
                    ))}

                </div>

            </section>

            {/* RECENT CARS */}

            <section className="max-w-7xl mx-auto px-6 py-16">

                <div className="h-10 w-56 bg-zinc-800 rounded mb-12" />

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900"
                        >
                            <div className="relative h-56">

                                <div className="absolute inset-0 bg-zinc-800" />

                                <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white p-2">
                                    <div className="w-full h-full rounded-full bg-zinc-700" />
                                </div>

                            </div>

                            <div className="p-6">
                                <div className="h-4 w-28 bg-zinc-700 rounded mb-4" />
                                <div className="h-7 w-48 bg-zinc-700 rounded mb-6" />
                                <div className="h-11 bg-zinc-800 rounded-xl" />
                            </div>
                        </div>
                    ))}

                </div>

            </section>

            {/* BRANDS */}

            <section className="max-w-7xl mx-auto px-6 py-16">

                <div className="h-10 w-52 bg-zinc-800 rounded mb-12" />

                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center"
                        >
                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-5">

                                <div className="w-12 h-12 rounded-full bg-zinc-700" />

                            </div>
                            <div className="h-5 w-24 bg-zinc-700 rounded" />
                        </div>
                    ))}

                </div>

            </section>

            {/* REVIEWS */}

            <section className="max-w-7xl mx-auto px-6 py-16">

                <div className="h-10 w-64 bg-zinc-800 rounded mb-12" />

                <div className="space-y-8">

                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
                        >
                            <div className="flex gap-5 items-center mb-6">

                                <div className="w-16 h-16 rounded-full bg-zinc-700" />

                                <div className="flex-1">
                                    <div className="h-5 w-40 bg-zinc-700 rounded mb-3" />
                                    <div className="h-4 w-28 bg-zinc-800 rounded" />
                                </div>

                            </div>

                            <div>

                                <div className="flex gap-2 mb-5">

                                    {[1, 2, 3, 4, 5].map((_, index) => (

                                        <div
                                            key={index}
                                            className="w-5 h-5 rounded bg-yellow-500/30"
                                        />

                                    ))}

                                </div>

                                <div className="space-y-3">

                                    <div className="h-4 w-full rounded-full bg-zinc-800" />

                                    <div className="h-4 w-11/12 rounded-full bg-zinc-800" />

                                    <div className="h-4 w-8/12 rounded-full bg-zinc-800" />

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </section>

        </div>
    );
};

export default DashboardSkeleton;