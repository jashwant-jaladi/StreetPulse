"use client"

import {SessionProvider} from "next-auth/react"
export const AuthProvider=({children})=><SessionProvider>{children}</SessionProvider>