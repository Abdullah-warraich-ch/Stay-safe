"use client";

import { useState } from "react";
import SingleDashboardListing from "./SingleDashboardListing";
import { useAuth } from "@/context/AuthContext";
import { cities } from "@/data/citiesData";


export default function ParentDashboardListing() {
    const { currentCity } = useAuth();


    const NewCities = currentCity ? (cities.filter((city) => city !== currentCity)) : cities
    return (
        <div className=" py-12 bg-white">
            {currentCity && <SingleDashboardListing currentCity={currentCity} />}
            {NewCities.map((city, index) => (
                <SingleDashboardListing key={index} currentCity={city} />
            ))}
        </div>
    );
}