import react from 'react'

import { Icon, withBadge } from '@rneui/themed'

export function BadgedIcon({ showBadge, badgeValue, ...props }) {
    const Component = showBadge
        ? withBadge(badgeValue)(Icon)
        : Icon

    return <Component {...props} />
}