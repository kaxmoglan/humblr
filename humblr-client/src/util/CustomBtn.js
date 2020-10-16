import React from 'react';

// MATERIAL
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from "@material-ui/core";

const CustomBtn = ({ children, onClick, tip, btnClassName, tipClassName }) => (
  <Tooltip title={tip} className={tipClassName} placement="top">
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
)

export default CustomBtn;