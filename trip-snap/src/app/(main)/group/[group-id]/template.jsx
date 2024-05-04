'use client'

import { GroupContext } from '@/app/(main)/group/[group-id]/_context/GroupContext'

export default function Template({ children }) {
  return <GroupContext>{children}</GroupContext>
}
