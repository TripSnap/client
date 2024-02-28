import TopNavigation from '@/components/navication/TopNavication'
import NotiDrawer from '@/components/notification/NotiDrawer'
import { NotiProvider } from '@/context/NotificationContext'

export default function Layout({ children }) {
  return (
    <>
      <NotiProvider>
        <TopNavigation menu />
        <NotiDrawer />
      </NotiProvider>
      {children}
    </>
  )
}
