import TemplateNavScreen from '@/app/src/components/TemplateNavScreen'
import React from 'react'
import HeaderSearch from '@/app/src/components/HeaderSearch'

function Clientes() {

  function handleClickFiltro() {

  }

  return (
    <TemplateNavScreen label='Clientes'>

      
      <HeaderSearch handleClickFiltro={handleClickFiltro}/>
      
    </TemplateNavScreen>
  )
}

export default Clientes