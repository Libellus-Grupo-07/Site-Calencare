import React, { useState } from 'react';
import { Switch } from 'antd';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box, Typography } from '@mui/material';

const DiaDaSemanaComponente = ({ diaSemana, horario1, horario2, onChange }) => {
  const [isHorario1, setIsHorario1] = useState(true);
  const [horarioSelecionado, setHorarioSelecionado] = useState(horario1);

  const handleSwitchChange = () => {
    setIsHorario1(!isHorario1);
    setHorarioSelecionado(isHorario1 ? horario2 : horario1);
  };

  const handleTimePickerChange = (horario) => {
    setHorarioSelecionado(horario);
    onChange(horario);
  };

  return (
    <div>
      <Typography variant="h6">{diaSemana}</Typography>
      <Box display="flex" alignItems="center">
        <Switch checked={isHorario1} onChange={handleSwitchChange} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker label="Basic time picker" />
      </DemoContainer>
    </LocalizationProvider>
      </Box>
    </div>
  );
};

export default DiaDaSemanaComponente;
