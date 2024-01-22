import { useEffect, useState } from "react";
import classes from "./SolutiiList.module.css";

const SolutiiLunareList = ({ solutii }) => {
  const [rechIsChecked, setRechIsChecked] = useState(true);
  const [declIsChecked, setDeclIsChecked] = useState(true);
  const [renuIsChecked, setRenuIsChecked] = useState(true);
  const [clasIsChecked, setClasIsChecked] = useState(true);
  const [acordIsChecked, setAcordIsChecked] = useState(true);

  const [anSolutie, setAnSolutie] = useState("2024");
  const [numeProcuror, setNumeProcuror] = useState("");
  const [lunaSolutie, setLunaSolutie] = useState("");

  //const [procuroriList, setProcuroriList] = useState([]);

  let totalSolutii = 0;

  let year = (new Date()).getFullYear();
  let yearArray = []
  for(let j = 0; j < 4; j++) {
    yearArray.push(year - j);
  }



  let procuroriList = [];

  solutii.forEach((element) => {
    element.anSolutie;
    if(procuroriList.includes(element.numeProcuror)) {

    }else  if(element.an_solutie === anSolutie){
      procuroriList.push(element.numeProcuror);
    }
  });

  console.log(procuroriList);


  const onChangeNumeProcurorInput = (event) => {
    totalSolutii = 0;
    setNumeProcuror(event.target.value);
  };

  const onChangeAnInput = (event) => {
    totalSolutii = 0;
    setAnSolutie(event.target.value);
  };

  const onChangeLunaInput = (event) => {
    totalSolutii = 0;
    setLunaSolutie(event.target.value);
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

  let solutiiFiltrate = solutii;

  const getCondition = (isRech, isClas, isDecl, isRenu, isAcord) => {
    let condition = false;

    if (isRech && rechIsChecked) {
      condition = condition || isRech;
    }

    if (isClas && clasIsChecked) {
      condition = condition || isClas;
    }

    if (isRenu && renuIsChecked) {
      condition = condition || isRenu;
    }

    if (isDecl && declIsChecked) {
      condition = condition || isDecl;
    }

    if (isAcord && acordIsChecked) {
      condition = condition || isAcord;
    }

    return condition;
  };

  solutiiFiltrate = solutii.filter((solutie) => {
    let condition = getCondition(
      solutie.nume_pe_scurt_solutie === "Rechizitoriu",
      solutie.nume_pe_scurt_solutie === "Clasare",
      solutie.nume_pe_scurt_solutie === "Declinare",
      solutie.nume_pe_scurt_solutie === "Renuntare",
      solutie.nume_pe_scurt_solutie === "Acord de recunoastere"
    );

    return condition;
  });

  solutiiFiltrate = solutiiFiltrate.filter((solutie) => {
    if (numeProcuror === "") {
      return true;
    } else {
      return solutie.numeProcuror
        .toLowerCase()
        .includes(numeProcuror.toLowerCase());
    }
  });

  solutiiFiltrate = solutiiFiltrate.filter((solutie) => {
    if (anSolutie === "") {
      setNumeProcuror("")
      return true;
    } else {
      return solutie.an_solutie.includes(anSolutie);
    }
  });

  solutiiFiltrate = solutiiFiltrate.filter((solutie) => {
    if (lunaSolutie === "") {
      return true;
    } else {
      return solutie.luna_solutie == lunaSolutie;
    }
  });

  let i = 0;

   solutiiFiltrate.forEach((element) => {

    totalSolutii += element.numar_solutii;
  });

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
            width: "200px",
          }}
          type="text"
          placeholder="Nume procuror"
          onChange={onChangeNumeProcurorInput}
        >
          <option value="">Alege un procuror</option>
          {procuroriList.map(procuror => <option value={procuror}>{procuror}</option>)}

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

       
        <div className={classes.checkbox}>
          <div className={classes.ul}>
            <div className={classes.li}>
              <input
                checked={rechIsChecked}
                type="checkbox"
                id="rechizitoriu"
                value="rechizitoriu"
                onChange={onChangeSolutieInput}
              ></input>
              <label style={{ marginLeft: "-200px" }}>Rechizitoriu</label>
            </div>
            <div className={classes.li}>
              <input
                checked={clasIsChecked}
                id="clasare"
                value="clasare"
                type="checkbox"
                onChange={onChangeSolutieInput}
              ></input>
              <label style={{ marginLeft: "-200px" }}>Clasare</label>
            </div>
            <div className={classes.li}>
              <input
                checked={renuIsChecked}
                type="checkbox"
                id="renuntare"
                value="renuntare"
                onChange={onChangeSolutieInput}
              ></input>
              <label style={{ marginLeft: "-200px" }}>Renuntare</label>
            </div>
            <div className={classes.li}>
              <input
                checked={declIsChecked}
                type="checkbox"
                id="declinare"
                value="declinare"
                placeholder="Tip solutie"
                onChange={onChangeSolutieInput}
              ></input>
              <label style={{ marginLeft: "-200px" }}>Declinare</label>
            </div>
            <div className={classes.li}>
              <input
                checked={acordIsChecked}
                type="checkbox"
                id="acord"
                value="acord"
                placeholder="Tip solutie"
                onChange={onChangeSolutieInput}
              ></input>
              <label style={{ marginLeft: "-200px" }}>
                Acord de recunoastere
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.table}>
        <div className={classes.th}>
          <div className={classes.td}>nr. crt</div>
          <div className={classes.td}>numar solutii</div>
          <div className={classes.td}>an solutie</div>
          <div className={classes.td}>luna solutie</div>
          <div className={classes.td}>solutie pe scurt</div>
          <div className={classes.td}>Nume</div>
        </div>
        {solutiiFiltrate.map((solutie) => {
          i = i + 1;
          return (
            <div className={classes.tr}>
              <div className={classes.td}>{i}</div>
              <div className={classes.td}>{solutie.numar_solutii}</div>
              <div className={classes.td}>{solutie.an_solutie}</div>
              <div className={classes.td}>{solutie.luna_solutie}</div>
              <div className={classes.td}>{solutie.nume_pe_scurt_solutie}</div>
              <div className={classes.td}>{solutie.numeProcuror}</div>
            </div>
          );
        })}
        <div className={classes.th}>
          <div className={classes.td}>Total Solutii</div>
          <div className={classes.td}>{totalSolutii}</div>
          <div className={classes.td}></div>
          <div className={classes.td}></div>
          <div className={classes.td}></div>
        </div>
      </div>
    </>
  );
};

export default SolutiiLunareList;
