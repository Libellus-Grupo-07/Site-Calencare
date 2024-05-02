import React, { useState } from 'react';
import { Switch } from 'antd';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
        <TimePicker
          label="Horário"
          value={horarioSelecionado}
          onChange={handleTimePickerChange}
          ampm={false}
          inputFormat="HH:mm"
        />
      </Box>
    </div>
  );
};

export default DiaDaSemanaComponente;
