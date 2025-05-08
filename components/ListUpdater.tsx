"use client"

import { useMachineStore } from '@/store/store'
import React from 'react'

export default function ProfileGate({ children }: { children: React.ReactNode }) {

    const refreshMachines = useMachineStore((state) => state.refreshMachines)

    return (
        typeof refreshMachines === "number" && <React.Fragment key={refreshMachines}>{children}</React.Fragment>
      )
}
