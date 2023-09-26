import { useState } from "react";
import classes from "./SolutiiList.module.css";

const SolutiiList = ({ solutii }) => {
  const [rechIsChecked, setRechIsChecked] = useState(true);
  const [declIsChecked, setDeclIsChecked] = useState(true);
  const [renuIsChecked, setRenuIsChecked] = useState(true);
  const [clasIsChecked, setClasIsChecked] = useState(true);

  const [anSolutie, setAnSolutie] = useState("");
  const [numeProcuror, setNumeProcuror] = useState("");

  const onChangeNumeProcurorInput = (event) => {
    setNumeProcuror(event.target.value);
  };

  const onChangeAnInput = (event) => {
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
  };

  let solutiiFiltrate = solutii;

  const getCondition = (isRech, isClas, isDecl, isRenu) => {
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

    return condition;
  };

  solutiiFiltrate = solutii.filter((solutie) => {
    let condition = getCondition(
      solutie.nume_pe_scurt_solutie === "Rechizitoriu",
      solutie.nume_pe_scurt_solutie === "Clasare",
      solutie.nume_pe_scurt_solutie === "Declinare",
      solutie.nume_pe_scurt_solutie === "Renuntare"
    );

    console.log(condition);

    return condition;
  });

  console.log(anSolutie, numeProcuror);

  solutiiFiltrate = solutiiFiltrate.filter((solutie) => {
    if (numeProcuror === "") {
      return true;
    } else {
      return solutie.numeProcuror.includes(numeProcuror);
    }
  });

  solutiiFiltrate = solutiiFiltrate.filter((solutie) => {
    if(anSolutie ==="") {
      return true;
    } else {
      return solutie.an_solutie.includes(anSolutie)
    }
  })

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

        <input
          style={{
            height: "30px",
            marginTop: "20px",
            marginLeft: "50px",
            width: "260px",
          }}
          type="text"
          placeholder="an"
          onChange={onChangeAnInput}
        ></input>
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
              <label style={{ marginLeft: "-100px" }}>Rechizitoriu</label>
            </div>
            <div className={classes.li}>
              <input
                checked={clasIsChecked}
                id="clasare"
                value="clasare"
                type="checkbox"
                onChange={onChangeSolutieInput}
              ></input>
              <label style={{ marginLeft: "-100px" }}>Clasare</label>
            </div>
            <div className={classes.li}>
              <input
                checked={renuIsChecked}
                type="checkbox"
                id="renuntare"
                value="renuntare"
                onChange={onChangeSolutieInput}
              ></input>
              <label style={{ marginLeft: "-100px" }}>Renuntare</label>
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
              <label style={{ marginLeft: "-100px" }}>Declinare</label>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.table}>
        <div className={classes.th}>
          <div className={classes.td}>nr. crt</div>
          <div className={classes.td}>numar solutii</div>
          <div className={classes.td}>an solutie</div>
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
              <div className={classes.td}>{solutie.nume_pe_scurt_solutie}</div>
              <div className={classes.td}>{solutie.numeProcuror}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SolutiiList;