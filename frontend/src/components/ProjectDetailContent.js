import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function ProjectDetailContent() {

    const location = useLocation();
    const projectId = location.pathname.slice(1);

    const [data, setData] = useState({});

    useEffect(() => {
        const handleViewChange = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/changes/${projectId}`);
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching recent changes:', error);
            }
        };
    
        handleViewChange();
      }, [projectId]);

    return (
        <div className="w-full h-screen">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data?.title}</h1>
            <p className="mt-6 text-xl leading-8 text-gray-700">
                {data?.comment}
            </p>
        </div>
    )
}