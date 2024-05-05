import React, { useState } from 'react';
import styles from "./DiaDaSemanaComponente.module.css";
import { Switch } from 'antd';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { StyledEngineProvider } from '@mui/material/styles';

const DiaDaSemanaComponente = ({ diaSemana, horario1, horario2, setHorario1, setHorario2, onChange }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
  };

  const mudarValor = (e,alterarValor) => {
    alterarValor(e.target.value);
}

  return (
    <Box display="flex" alignItems="center" className={styles["container-cadastro"]}>
      <div style={{ marginRight: '16px' }}>
        <Typography style={{ fontSize: '17px', fontWeight: 'bold' }} variant="h6" >{diaSemana}</Typography>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Switch
          onClick={handleButtonClick}
          style={{
            backgroundColor: isSelected ? '#9f35f0' : '#C1C1C1',
            color: 'white',
            borderColor: isSelected ? '#9f35f0' : '#C1C1C1',
            marginRight: '8px', // Adicionando margem à direita para o espaçamento
          }}
        >
        </Switch>
        <span style={{
          visibility: isSelected ? 'visible' : 'hidden',
          color: '#9f35f0'
        }}>
          Aberto
        </span>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker', 'TimePicker']}>
          <TimePicker
            //value={horario1}
            label="Início"
            defaultValue={dayjs('2022-04-17T15:30')}
            onChange={(e) => mudarValor(e,setHorario1) } 
          />
          <TimePicker
            //value={horario2}
            label="Fim"
            defaultValue={dayjs('2022-04-17T15:30')}
            onChange={(e) => mudarValor(e,setHorario2) } 
          //value={value}
          //onChange={(newValue) => setValue(newValue)}

          //           <TimePicker
          //   label="Uncontrolled picker"
          //   defaultValue={dayjs('2022-04-17T15:30')}
          // />
          // <TimePicker
          //   label="Controlled picker"
          //   value={value}
          //   onChange={(newValue) => setValue(newValue)}
          // />
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>



  );
};

export default DiaDaSemanaComponente;
