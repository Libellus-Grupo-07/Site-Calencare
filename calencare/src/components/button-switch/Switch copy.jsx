import React from 'react';
import { Switch } from 'antd';

const CustomSwitch = ({ defaultChecked, onChange }) => {
  const handleChange = (checked) => {
    onChange(checked);
  };

  return <Switch/>;
};

export default CustomSwitch;