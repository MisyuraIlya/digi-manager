import React, { FC } from 'react'
import Modal from '@mui/material/Modal'
import { Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { themeColors } from '../../styles/mui'

type ModalWrapperProps = {
  active: boolean
  setActive: (bool: boolean) => void
  children: any
  height: number
  width: number
}

const ModalWrapper: FC<ModalWrapperProps> = ({
  active,
  setActive,
  children,
  height,
  width,
}) => {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor:  themeColors.primary,
    boxShadow: 24,
    p: 4,
    width: `${width}%`,
    height: `${height}%`,
  }

  return (
    <>
      <Modal open={active} onClose={() => setActive(false)} disableAutoFocus>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <IconButton onClick={() => setActive(false)}>
              <CloseIcon sx={{ fontSize: '35px', cursor: 'pointer', color:'white' }} />
            </IconButton>
          </Box>
          {children}
        </Box>
      </Modal>
    </>
  )
}

export default ModalWrapper