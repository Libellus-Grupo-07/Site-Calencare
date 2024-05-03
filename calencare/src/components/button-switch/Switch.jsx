import React from 'react';
import { Switch } from 'antd';
import Styles from "./Switch.module.css"

const CustomSwitch = ({ defaultChecked, onChange }) => {
  const handleChange = (checked) => {
    onChange(checked);
  };

  return <Switch className="custom-switch" defaultChecked={defaultChecked}  />;
//   onChange={handleChange}
};

export default CustomSwitch;