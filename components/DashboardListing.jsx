"use client"

import { useState, useEffect } from "react";
import { fetchHostels } from "@/utils/https";
import { useAuth } from "@/context/AuthContext";
import HostelCard from "./hostelCard";

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

            <h1 className="font-bold text-2xl mb-6">
                {currentCity ? `Popular Hostels in ${currentCity}` : "Popular Hostels"}
            </h1>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">{
                !loading && hostels?.map((hostel) => (
                    <div key={hostel._id} className="w-[200px] sm:w-[250px] shrink-0">
                        <HostelCard hostel={hostel} />
                    </div>
                ))
            }
            </div>

        </div>
    );
}