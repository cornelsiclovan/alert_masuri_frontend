import { useState } from "react";
import classes from "./SolutiiList.module.css";

const IncarcaturaList = ({ incarcatura }) => {
  const [rechIsChecked, setRechIsChecked] = useState(true);
  const [declIsChecked, setDeclIsChecked] = useState(true);
  const [renuIsChecked, setRenuIsChecked] = useState(true);
  const [clasIsChecked, setClasIsChecked] = useState(true);
  const [acordIsChecked, setAcordIsChecked] = useState(true);

  const [anSolutie, setAnSolutie] = useState("");
  const [numeProcuror, setNumeProcuror] = useState("");

  let totalSolutii = 0;

  console.log(incarcatura);

  const onChangeNumeProcurorInput = (event) => {
    totalSolutii = 0;
    setNumeProcuror(event.target.value);
  };

  const onChangeAnInput = (event) => {
    totalSolutii = 0;
    setAnSolutie(event.target.value);
  };



  const onChangeSolutieInput = (event) => {
    if (event.target.value === "rechizitoriu") {
      setRechIsChecked(!rechIsChecked);
    }

    if (event.target.value === "clasare") {
      setClasIsChecked(!clasIsChecked);
    }

    if (event.target.value === "declinare") {
      setDeclIsChecked(!declIsChecked);
    }

    if (event.target.value === "renuntare") {
      setRenuIsChecked(!renuIsChecked);
    }

    if (event.target.value === "acord") {
      setAcordIsChecked(!acordIsChecked);
    }
  };

  let incarcaturaFiltrate = incarcatura;

  let totalAc = 0;
  let totalAn = 0;

  incarcaturaFiltrate = incarcaturaFiltrate.filter((incarcatura) => {
    if (numeProcuror === "") {
      return true;
    } else {

      return incarcatura.numeProcuror
        .toLowerCase()
        .includes(numeProcuror.toLowerCase());
    }
  });

  let i = 0;

  return (
    <>
      <div className={classes.sort}>
        <input
          style={{
            height: "30px",
            marginTop: "20px",
            marginLeft: "50px",
            width: "260px",
          }}
          type="text"
          placeholder="Nume procuror"
          onChange={onChangeNumeProcurorInput}
        ></input>


      </div>

      <div className={classes.table}>
        <div className={classes.th}>
          <div className={classes.td}>nr. crt</div>
          <div className={classes.td}>Nume</div>
          <div className={classes.td}>dosare cu ac</div>
          <div className={classes.td}>dosare cu an</div>
        </div>
        {incarcaturaFiltrate.map((inc) => {
          
          if(inc.number_dos_cu_ac !== 0 || + inc.number_dos_cu_an !== 0){
            i = i + 1;

            console.log( totalAc,  inc.number_dos_cu_ac)

            totalAc = totalAc +  +inc.number_dos_cu_ac;
            totalAn = totalAn +  +inc.number_dos_cu_an;
            if(+inc.number_dos_cu_ac !== 0 || +inc.number_dos_cu_an !== 0)
          return (
            <div className={classes.tr}>
                <div className={classes.td}>{i}</div>
              <div className={classes.td}>{inc.numeProcuror}</div>
              <div className={classes.td}>{inc.number_dos_cu_ac}</div>
              <div className={classes.td}>{inc.number_dos_cu_an}</div>
              
            </div>
          );}
        })}
        <div className={classes.th}>
          <div className={classes.td}>Total Dosare</div>
          <div className={classes.td}>{totalSolutii}</div>
          <div className={classes.td}>{totalAc}</div>
          <div className={classes.td}>{totalAn}</div>
        </div>
      </div>
    </>
  );
};

export default IncarcaturaList;
