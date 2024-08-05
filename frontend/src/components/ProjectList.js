import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarsArrowUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import axios from "axios";

import ProjectListItem from "./ProjectListItem";

export default function ProjectList({search, minor, bot}) {

    const [changes, setChanges] = useState([]);
    const [page, setPage] = useState(0);

    const handlePageChange = (flag) => {
        if (flag === 1) {
            setPage(page + 1);
        }

        if (flag === 0 && page > 0) {
            setPage(page - 1);
        }
    }

    useEffect(() => {
        const fetchRecentChanges = async () => {
            try {
                // const url = 'https://stream.wikimedia.org/v2/stream/recentchange';
                // const eventSource = new EventSource(url);

                // eventSource.onopen = () => {
                //     console.info('Opened connection.');
                // };
                // eventSource.onerror = (event) => {
                //     console.error('Encountered error', event);
                // };
                // eventSource.onmessage = (event) => {
                //     // event.data will be a JSON message
                //     const data = JSON.parse(event.data);
                //     // discard all canary events
                //     // if (meta.domain === 'canary') {
                //     //     return;
                //     // }
                //     // Edits from English Wikipedia
                //     if (data.server_name === 'en.wikipedia.org') {
                //         // Output the title of the edited page
                //         // console.log(data.title);

                //         setChanges((prev) => [...prev, data]);
                //     }
                // };

                axios.post('http://localhost:5000', {
                    page: page,
                    minor: minor,
                    bot: bot,
                    search: search
                }).then((res) => {
                    setChanges(res.data.data);
                }).catch(err => {
                    console.log('error while get recent changes', err);
                })
            } catch (error) {
                console.error('Error fetching recent changes:', error);
            }
        };

        fetchRecentChanges();
    }, [page, minor, bot, search]);
    
    return (
        <div className="bg-white lg:min-w-0 lg:flex-1">
            <div className="border-b border-t border-gray-200 pb-4 pl-4 pr-6 pt-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
            <div className="flex items-center">
                <h1 className="flex-1 text-lg font-medium">Projects</h1>
                <Menu as="div" className="relative">
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <BarsArrowUpIcon aria-hidden="true" className="-ml-0.5 h-5 w-5 text-gray-400" />
                    Sort
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </MenuButton>
                <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                    <MenuItem>
                        <Link
                        to=""
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                        Name
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                        to="/"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                        Date modified
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                        to="/"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                        Date created
                        </Link>
                    </MenuItem>
                    </div>
                </MenuItems>
                </Menu>
            </div>
            </div>
            <ul className="divide-y divide-gray-200 border-b border-gray-200">
            {changes?.map((project) => (
                <ProjectListItem key={project._id} project={project}/>
            ))}
            </ul>
            <nav
                aria-label="Pagination"
                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                >
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{10 * page}</span> to <span className="font-medium">{10 * (page + 1)}</span> of{' '}
                    <span className="font-medium">{changes.length}</span> results
                    </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                    <button
                    className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                    onClick={() => handlePageChange(0)}
                    >
                    Previous
                    </button>
                    <button
                    className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                    onClick={() => handlePageChange(1)}
                    >
                    Next
                    </button>
                </div>
                </nav>
        </div>
    )
}