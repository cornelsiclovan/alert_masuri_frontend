import { useState } from "react";
import classes from "./SolutiiList.module.css";

const ParticipariList = ({ participari }) => {
  console.log(participari);

  const [anPart, setAnPart] = useState("2024");
  const [numeProcuror, setNumeProcuror] = useState("");
  const [lunaPart, setLunaPart] = useState("");

  let year = (new Date()).getFullYear();
  let yearArray = []
  for(let j = 0; j < 2; j++) {
    yearArray.push(year - j);
  }

  let partFiltrate = participari;

  partFiltrate = partFiltrate.filter((part) => {
    if (numeProcuror === "") {
      return true;
    } else {
      return part.numeProcuror
        .toLowerCase()
        .includes(numeProcuror.toLowerCase());
    }
  });

  partFiltrate = partFiltrate.filter((part) => {
    if (anPart === "") {
      setNumeProcuror("")
      return true;
    } else {
      return part.an.toString().includes(anPart);
    }
  });

  partFiltrate = partFiltrate.filter((part) => {
    
    if (+lunaPart === 0) {
      return true;
    } else {
      return +part.luna === +lunaPart;
    }
  });


  const onChangeAnInput = (event) => {
  
    setAnPart(event.target.value);
  };

  const onChangeLunaInput = (event) => {
 
    setLunaPart(event.target.value);
  };


  let i = 0;
  return (
    <>
    
      <div className={classes.sort}>
      <select
          style={{
            height: "30px",
            marginTop: "20px",
            marginLeft: "-100px",
            width: "150px",
          }}

          defaultValue={2024}
          type="text"
          placeholder="an"
          onChange={onChangeAnInput}
        >
          { yearArray.map(year => <option>{year}</option>)}

        </select>

       

        <select
          style={{
            height: "30px",
            marginTop: "20px",
            marginLeft: "-100px",
            width: "150px",
          }}
          type="text"
          placeholder="luna"
          onChange={onChangeLunaInput}
        >
          <option value="0">Alege luna</option>
          <option value="1">
            Ianuarie
          </option>
          <option value="2">
            Februarie
          </option>
          <option value="3">
            Martie
          </option>
          <option value="4">
            Aprilie
          </option>
          <option value="5">
            Mai
          </option>
          <option value="6">
            Iunie
          </option>
          <option value="7">
            Iulie
          </option>
          <option value="8">
            August
          </option>
          <option value="9">
            Septembrie
          </option>
          <option value="10">
            Octombrie
          </option>
          <option value="11">
            Noiembrie
          </option>
          <option value="12">
            Decembrie
          </option>
        </select>
      </div>

      <div className={classes.table}>
        <div className={classes.th}>
          <div className={classes.td}>NR. CRT.</div>
          <div className={classes.td}>PROCUROR</div>
          <div className={classes.td}>NR. PARTICIP. SEDINTE</div>
          <div className={classes.td}>
            NR. PARTICIP. CAUZE <br />
          </div>
          <div className={classes.td}>NR. HOT. VERIFICATE</div>
          <div className={classes.td}>
            NR. PARTICIP. SEDINTE <br /> COPIL
          </div>
          <div className={classes.td}>
            NR. PARTICIP. CAUZE <br /> COPIL
          </div>
          <div className={classes.td}>
            NR. HOT. VERIFICATE <br /> COPIL
          </div>
          <div className={classes.td}>AN</div>
          <div className={classes.td}>LUNA</div>
        </div>
        {partFiltrate.map((part) => {
          i = i + 1;

          return (
            <div className={classes.tr}>
              <div className={classes.td}>{i}</div>
              <div className={classes.td}>{part.numeProcuror}</div>
              <div className={classes.td}>{part.nr_part_sed}</div>
              <div className={classes.td}>{part.nr_part_cauze}</div>
              <div className={classes.td}>{part.nr_hot_vf}</div>
              <div className={classes.td}>{part.nr_part_sed_copil}</div>
              <div className={classes.td}>{part.nr_part_copil}</div>
              <div className={classes.td}>{part.nr_hot_vf_copil}</div>
              <div className={classes.td}>{part.an}</div>
              <div className={classes.td}>{part.luna}</div>
            </div>
          );
        })}
        <div className={classes.th}>
          <div className={classes.td}>TOTAL PARTICIPARI</div>
          <div className={classes.td}></div>
          <div className={classes.td}>{}</div>
          <div className={classes.td}>{}</div>
          <div className={classes.td}>{}</div>
          <div className={classes.td}>{}</div>
          <div className={classes.td}>{}</div>
        </div>
      </div>
    </>
  );
};

export default ParticipariList;
