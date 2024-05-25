import React from 'react';
import styles from "./DiaDaSemanaComponente.module.css";
import { Switch } from 'antd';
import { Box, Typography } from '@mui/material';

const DiaDaSemanaComponente = (
  { diaSemana,
    horario1,
    horario2,
    setHorario1,
    setHorario2,
    aberto,
    setAberto,
  }) => {

  const handleButtonClick = () => {
    setAberto(!aberto);
  };

  return (
    <Box
      width="100%"
      height="40px"
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
            width: "8vw",
            fontSize: "17px",
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
            width: "100%",
            height: "100%",
            alignItems: "center",
            columnGap: "8px"
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
          <input
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