import React from 'react';
import styles from "./DiaDaSemanaComponente.module.css";
import { Input, Switch } from 'antd';
import { Box, Typography } from '@mui/material';
import { IMaskInput } from 'react-imask';

const DiaDaSemanaComponente = (
  { diaSemana,
    horario1,
    horario2,
    setHorario1,
    setHorario2,
    aberto,
    setAberto,
    funcaoClickSwitch
  }) => {

  const handleButtonClick = () => {
    if (funcaoClickSwitch !== undefined) {
      funcaoClickSwitch();
    } else {
      setAberto(!aberto);
    }
  };

  return (
    <Box
      width="100%"
      height="5vh"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      className={styles["container-cadastro"]}
    >
      <div style={{
        width: "240px",
        display: "flex",
        marginRight: '16px',
      }}>
        <Typography
          style={{
            width: "7.5vw",
            fontSize: "1.1rem",
            fontFamily: "Poppins",
            fontWeight: "bold",
            textAlign: "left",
            letterSpacing: "-0.05rem"
          }}
          variant="h6" >
          {diaSemana}
        </Typography>
        <div style={{
          fontFamily: "Poppins",
          width: "134px",
          display: 'flex',
          alignItems: 'center',
          columnGap: "8px"
        }}>
          <Switch
            onClick={handleButtonClick}
            style={{
              fontFamily: "Poppins",
              backgroundColor: aberto ? '#9f35f0' : '#C1C1C1',
              color: 'white',
              borderColor: aberto ? '#9f35f0' : '#C1C1C1',
              marginRight: '8px', // Adicionando margem à direita para o espaçamento
            }}
          >
          </Switch>
          <span style={{
            width: "134px",
            fontFamily: "Poppins",
            color: aberto ? '#9f35f0' : "#585858",
            fontWeight: 600
          }}>
            {aberto ? "Aberto" : "Fechado"}
          </span>
        </div>
      </div>
      {aberto ?
        <div
          style={{
            display: "flex",
            width: "75%",
            height: "100%",
            alignItems: "center",
            columnGap: "0.5rem"
          }}
        >
          <input
            type='time'
            className={styles["input-time"]}
            value={horario1}
            onChange={(e) => setHorario1(e.target.value)}
          />
          <span style={{
            fontWeight: 700
          }}>
            às
          </span>
          <IMaskInput
            type='time'
            className={styles["input-time"]}
            value={horario2}
            onChange={(e) => setHorario2(e.target.value)}
          />

        </div>
        :
        <span className={styles["btn-fechado"]} >
          Fechado
        </span>
      }
    </Box>
  );
};

export default DiaDaSemanaComponente;
