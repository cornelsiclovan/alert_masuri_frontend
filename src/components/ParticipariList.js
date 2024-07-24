import { useState, useEffect } from "react";
import classes from "./SolutiiList.module.css";

const ParticipariList = ({ participari }) => {
  const [anPart, setAnPart] = useState("2024");
  const [numeProcuror, setNumeProcuror] = useState("");
  const [lunaPart, setLunaPart] = useState("");
  const [semestru, setSemestru] = useState(false);
  const [partSemestru, setPartSemestru] = useState([]);

  let year = new Date().getFullYear();
  let yearArray = [];
  for (let j = 0; j < 2; j++) {
    yearArray.push(year - j);
  }

  let procuroriList = [];

  participari.forEach((element) => {
    if (procuroriList.includes(element.numeProcuror)) {
    } else if (+element.an === +anPart) {
      procuroriList.push(element.numeProcuror);
    }
  });

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
      setNumeProcuror("");
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

  const onChangeNumeProcurorInput = (event) => {
    setNumeProcuror(event.target.value);
  };

  const onChangeAnInput = (event) => {
    setAnPart(event.target.value);
  };

  const onChangeLunaInput = (event) => {
    setLunaPart(event.target.value);
  };

  const checkSemestru = () => {
    setSemestru(!semestru);

    console.log(semestru);
    if (semestru) {
      let sem = [];
      let mapSem = [];
      partFiltrate.map((part) => {
        let index = 0;
        if (sem.length === 0 && +part.luna <= 6) {
          mapSem.push(part.numeProcuror);
          sem.push({ ...part });
          index++;
        } else if( +part.luna <= 6) {
          if (mapSem.includes(part.numeProcuror)) {
            const myIndex = mapSem.indexOf(part.numeProcuror);
            console.log(part.nr_part_sed);

            if (!sem[myIndex].nr_part_sed) {
              sem[myIndex].nr_part_sed = 0;
              sem[myIndex].nr_part_cauze = 0;
              sem[myIndex].nr_hot_vf = 0;
              sem[myIndex].nr_part_sed_copil = 0;
              sem[myIndex].nr_part_copil = 0;
              sem[myIndex].nr_hot_vf_copil = 0;
              
            }

            

            sem[myIndex].nr_part_sed = +sem[myIndex].nr_part_sed + +part.nr_part_sed;
            sem[myIndex].nr_part_cauze =
              +sem[myIndex].nr_part_cauze + +part.nr_part_cauze;
            sem[myIndex].nr_hot_vf = +sem[myIndex].nr_hot_vf + +part.nr_hot_vf;
            sem[myIndex].nr_part_sed_copil =
              +sem[myIndex].nr_part_sed_copil + +part.nr_part_sed_copil;
            sem[myIndex].nr_part_copil =
              +sem[myIndex].nr_part_copil + +part.nr_part_copil;
            sem[myIndex].nr_hot_vf_copil =
              +sem[myIndex].nr_hot_vf_copil + +part.nr_hot_vf_copil;
          } else {
            console.log(part);
            sem.push({ ...part });
            mapSem.push(part.numeProcuror);
            index++;
          }
        }
      });

      setPartSemestru([...sem]);
    }
  };

  let tot1 = 0;
  let tot2 = 0;
  let tot3 = 0;
  let tot4 = 0;
  let tot5 = 0;
  let tot6 = 0;
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
          {yearArray.map((year) => (
            <option>{year}</option>
          ))}
        </select>

        <select
          style={{
            height: "30px",
            marginTop: "20px",
            marginLeft: "-100px",
            width: "200px",
          }}
          type="text"
          placeholder="Nume procuror"
          onChange={onChangeNumeProcurorInput}
        >
          <option value="">Alege un procuror</option>
          {procuroriList.map((procuror) => (
            <option value={procuror}>{procuror}</option>
          ))}
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
          <option value="1">Ianuarie</option>
          <option value="2">Februarie</option>
          <option value="3">Martie</option>
          <option value="4">Aprilie</option>
          <option value="5">Mai</option>
          <option value="6">Iunie</option>
          <option value="7">Iulie</option>
          <option value="8">August</option>
          <option value="9">Septembrie</option>
          <option value="10">Octombrie</option>
          <option value="11">Noiembrie</option>
          <option value="12">Decembrie</option>
        </select>
        <div>
          <input
            checked={semestru}
            type="checkbox"
            id="toate"
            value="toate"
            onChange={checkSemestru}
          ></input>
          <label>Semestru</label>
        </div>
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
        {!semestru &&  <div className={classes.td}>LUNA</div>}
        </div>
        {!semestru &&
          partFiltrate.map((part) => {
            i = i + 1;
            tot1 = tot1 + part.nr_part_sed;
            tot2 = tot2 + part.nr_part_cauze;
            tot3 = tot3 + part.nr_hot_vf;
            tot4 = tot4 + part.nr_part_sed_copil;
            tot5 = tot5 + part.nr_part_copil;
            tot6 = tot6 + part.nr_hot_vf_copil;
            return (
              <div className={classes.tr} key={i}>
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
        {semestru &&
          partSemestru.map((part) => {
            i = i + 1;
            tot1 = tot1 + part.nr_part_sed;
            tot2 = tot2 + part.nr_part_cauze;
            tot3 = tot3 + part.nr_hot_vf;
            tot4 = tot4 + part.nr_part_sed_copil;
            tot5 = tot5 + part.nr_part_copil;
            tot6 = tot6 + part.nr_hot_vf_copil;
            return (
              <div className={classes.tr} key={i}>
                <div className={classes.td}>{i}</div>
                <div className={classes.td}>{part.numeProcuror}</div>
                <div className={classes.td}>{part.nr_part_sed}</div>
                <div className={classes.td}>{part.nr_part_cauze}</div>
                <div className={classes.td}>{part.nr_hot_vf}</div>
                <div className={classes.td}>{part.nr_part_sed_copil}</div>
                <div className={classes.td}>{part.nr_part_copil}</div>
                <div className={classes.td}>{part.nr_hot_vf_copil}</div>
                <div className={classes.td}>{part.an}</div>
            
              </div>
            );
          })}
        <div className={classes.th}>
          <div className={classes.td}>TOTAL PARTICIPARI</div>
          <div className={classes.td}></div>
          <div className={classes.td}>{tot1}</div>
          <div className={classes.td}>{tot2}</div>
          <div className={classes.td}>{tot3}</div>
          <div className={classes.td}>{tot4}</div>
          <div className={classes.td}>{tot5}</div>
          <div className={classes.td}>{tot6}</div>
          <div className={classes.td}></div>
          {!semestru && <div className={classes.td}></div>}
        </div>
      </div>
    </>
  );
};

export default ParticipariList;
