'use client'
import PersonalInfoSection from '@/components/profile/PersonalInfoSection'
import ActivitySection from '@/components/profile/ActivitySection'
import { useTheme } from '@/hooks/useTheme'

const ProfilePage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark'
  
  return (
    <div className='p-1'>
      <PersonalInfoSection isDark={isDark} />
      <ActivitySection isDark={isDark} />
    </div>
  )
}

export default ProfilePage