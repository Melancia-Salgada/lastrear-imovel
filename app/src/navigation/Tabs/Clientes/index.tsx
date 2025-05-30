import Input from '@/app/src/components/Input'
import TemplateNavScreen from '@/app/src/components/TemplateNavScreen'
import { Text } from '@react-navigation/elements'
import React from 'react'

function Clientes() {
  return (
    <TemplateNavScreen label='Clientes'>
      <Input placeholder='Buscar' type='search'/>
    </TemplateNavScreen>
  )
}

export default Clientes