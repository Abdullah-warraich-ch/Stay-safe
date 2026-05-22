"use client"

import { useState, useEffect } from "react";
import { fetchHostels } from "@/utils/https";
import { useAuth } from "@/context/AuthContext";
import HostelCard from "./hostelCard";
import CardSkeleton from "./cardSkeleton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardListing() {
    const { currentCity } = useAuth();
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getHostels = async () => {
            if (currentCity === undefined) return;

            setLoading(true);
            try {
                const data = await fetchHostels(currentCity ? `city=${currentCity}` : "");
                console.log(data);
                setHostels(data.data);
            } catch (error) {
                console.error("Error fetching hostels:", error);
            } finally {
                setLoading(false);
            }
        };

        getHostels();
    }, [currentCity]);

    return (
        <div className="px-12 py-12 bg-white">

            <Link href={currentCity ? `/hostels?city=${currentCity}` : "/hostels"}>
                <h1 className="font-bold text-2xl mb-6 flex gap-4 group cursor-pointer items-center">
                    {currentCity ? `Popular Hostels in ${currentCity}` : "Popular Hostels"}
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-all" />
                </h1>
            </Link>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                {loading ? (
                    [...Array(5)].map((_, i) => (
                        <div key={i} className="w-[200px] sm:w-[250px] shrink-0">
                            <CardSkeleton />
                        </div>
                    ))
                ) : (
                    hostels?.map((hostel) => (
                        <div key={hostel._id} className="w-[200px] sm:w-[250px] shrink-0">
                            <HostelCard hostel={hostel} />
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}