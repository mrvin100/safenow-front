import { cn } from "@/lib/utils"
import * as React from 'react'

interface Props{
    className?: string
}

export const AppContainer: React.FC<React.PropsWithChildren<Props>> = ({className, children}) => {
    return(
        <div className="w-full lg:px-5">
            <div className={cn('w-full max-w-screen-xl mx-auto', className)}>{children}</div>
        </div>
    )
}