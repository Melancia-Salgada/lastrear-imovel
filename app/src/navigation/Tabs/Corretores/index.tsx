import HeaderSearch from '@/app/src/components/HeaderSearch'
import TemplateNavScreen from '@/app/src/components/TemplateNavScreen'
import React, { useMemo } from 'react'
import { useRouter } from 'expo-router'


function Corretores() {

  const snapPoints = useMemo(() => ['25%', '50%', '70%'], [])

  const router = useRouter()

  function handleClickNovo() {
    router.push('/src/screens/Novo')
  }

  return (
    <>
    <TemplateNavScreen label='Corretores'>
      <HeaderSearch criar handleClickCriar={handleClickNovo}/>
    </TemplateNavScreen>
    </>
    
  )
}

export default Corretores