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

  // Move the responsive modal styling to the Box component
  return (
    <CenterModal isOpen={delayPassed && !hide}>
      <Box sx={{
        width: ['90%', '70%', '50%'], // Modal width based on screen size
        display: 'flex',
        flexDirection: 'column', // Stack modal content vertically
        justifyContent: 'center',
        p: [1, 2], // Padding: smaller on mobile, larger on desktop
      }}>
        <ModalTitle>{title}</ModalTitle>
        {description}
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: ['column', 'row'], // Stack action elements on mobile, side-by-side on desktop
        }}>
          {action && action}
        </Box>
      </Box>
    </CenterModal>
  )
}

export default FeatureBar
