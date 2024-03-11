import React from 'react';
import clsx from "clsx";
import {useLocation, useNavigate} from "react-router-dom";
import {NavLink} from "../../utils/navListForLeftMenu/navBusinessTrip";

interface LeftMenu {
    navList: NavLink[]
}

export const LeftMenu = (props: LeftMenu) => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const handleNavigate = (url: string) => {
        navigate(url)
    }
    return (
        <div className={'shadowNav mt-20'}>
            <ul className="min-w-[260px] pt-14 flex flex-col gap-4 ">
                {
                    props.navList.map((elem, index) => (
                        <li
                            key={index}
                            className={clsx(
                                'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB]  cursor-pointer',
                                elem.id === pathname && 'bg-[#F5F8FB]'
                            )}
                            onClick={() => handleNavigate(elem.id)}
                        >
                            <div className="flex items-center gap-[10px]">
                                {elem.icon}
                                <p className="text-base">{elem.name}</p>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};
