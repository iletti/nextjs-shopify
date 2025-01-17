/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { Box, jsx } from 'theme-ui'
import { CenterModal } from '@components/modals'

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
      {/* Use h3 tag for the title */}
      <h3>{title}</h3>
      {description}
      <Box sx={{ display: 'flex', justifyContent: 'center', p: [1, 2] }}>
        {action && action}
      </Box>
    </CenterModal>
  )
}

export default FeatureBar
