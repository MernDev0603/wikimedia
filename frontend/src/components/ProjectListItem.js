import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
    ChevronRightIcon,
    StarIcon,
} from '@heroicons/react/20/solid';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProjectListItem({project}) {

    const [check, setCheck] = useState(false);

    return (
        <li className="relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6">
                <div className="flex items-center justify-between space-x-4">
                    {/* Repo name and link */}
                    <div className="min-w-0 space-y-3">
                    <div className="flex items-center space-x-3">
                        <span
                        aria-hidden="true"
                        className={classNames(
                            project.active ? 'bg-green-100' : 'bg-gray-100',
                            'flex h-4 w-4 items-center justify-center rounded-full',
                        )}
                        >
                        <span
                            className={classNames(
                            project.active ? 'bg-green-400' : 'bg-gray-400',
                            'h-2 w-2 rounded-full',
                            )}
                        />
                        </span>

                        <h2 className="text-sm font-medium">
                        <Link to={`/${project._id}`} state={project}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {project.title}{' '}
                            <span className="sr-only">{project.active ? 'Running' : 'Not running'}</span>
                        </Link>
                        </h2>
                    </div>
                    <a href={project.repoHref} className="group relative flex items-center space-x-2.5">
                        <span className="truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        {project.comment}
                        </span>
                    </a>
                    </div>
                    <div className="sm:hidden">
                    <ChevronRightIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    </div>
                    {/* Repo meta info */}
                    <div className="hidden flex-shrink-0 flex-col items-end space-y-3 sm:flex">
                    <p className="flex items-center space-x-4">
                        <button
                            onClick={() => setCheck(!check)}
                            className="relative text-sm font-medium text-gray-500 hover:text-gray-900"
                        >
                        Visit site
                        </button>
                        <button
                        type="button"
                        className="relative rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                        <span className="sr-only">
                            {check ? 'Add to favorites' : 'Remove from favorites'}
                        </span>
                        <StarIcon
                            aria-hidden="true"
                            className={classNames(
                            project?.viewed
                                ? 'text-yellow-300 hover:text-yellow-400'
                                : 'text-gray-300 hover:text-gray-400',
                            'h-5 w-5',
                            )}
                        />
                        </button>
                    </p>
                    <p className="flex space-x-2 text-sm text-gray-500">
                        <span>{project?.timestamp.slice(4, 25)}</span>
                    </p>
                    </div>
                </div>
        </li>
    )
}