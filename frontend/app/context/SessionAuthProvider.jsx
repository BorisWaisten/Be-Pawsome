'use client'
import {SessionProvider} from "next-auth/react"

export default function SessionAuthProvider({children}) {
  return (
    <div>
      <SessionProvider>
        {children}
      </SessionProvider>
    </div>
  )
}
