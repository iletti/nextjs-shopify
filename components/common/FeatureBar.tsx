/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { Box, jsx } from 'theme-ui'
import { CenterModal, ModalTitle } from '@components/modals'

interface FeatureBarProps {
  className?: string
  title: string
  description?: string
  hide?: boolean
  action?: React.ReactNode
  delay?: number
}

const FeatureBar: React.FC<FeatureBarProps> = ({
  title,
  description,
  action,
  hide,
  delay,
}) => {
  const [delayPassed, setDelayPassed] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => setDelayPassed(true), delay || 6000)
    return () => clearTimeout(timeout)
  })

  return (
    <CenterModal isOpen={delayPassed && !hide}>
      <Box sx={{
        variant: 'layout.featureBar', // Assuming you have a variant in your theme
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
        bg: 'background', // Use your theme colors
        color: 'text', // Use your theme colors
        '@media screen and (min-width: 768px)': {
          flexDirection: 'row',
        },
      }}>
        <ModalTitle>{title}</ModalTitle>
        {description && <Box>{description}</Box>}
        {action && <Box>{action}</Box>}
      </Box>
    </CenterModal>
  )
}

export default FeatureBar
