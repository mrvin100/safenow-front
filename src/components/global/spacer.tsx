import { cn } from '@/lib/utils'
interface SpacerProps {
    extraSmall?: boolean
    tooSmall?: boolean
    small?: boolean
    large?: boolean
}
import * as React from 'react'
export const Spacer: React.FC<SpacerProps> = ({extraSmall, tooSmall, small,large}) => {
    return(
        <div className={cn('w-full h-20 lg:h-40', {
            'h-3 lg:h-6': extraSmall,
            'h-6 lg:h-10': tooSmall,
            'h-10 lg:h-20': small,
            'h-32 lg:h-60': large,
        })} />
    )
}