"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
    label: string;
    href: string;
}

export const BackButton = ({
                               label,
                               href
                           }:BackButtonProps) => {
    return (
        <Button variant='ghost' >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}