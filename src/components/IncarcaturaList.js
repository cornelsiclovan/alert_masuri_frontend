import { useEffect, useState } from "react";
import classes from "./SolutiiList.module.css";

const IncarcaturaList = ({ incarcatura }) => {
  const [rechIsChecked, setRechIsChecked] = useState(true);
  const [declIsChecked, setDeclIsChecked] = useState(true);
  const [renuIsChecked, setRenuIsChecked] = useState(true);
  const [clasIsChecked, setClasIsChecked] = useState(true);
  const [acordIsChecked, setAcordIsChecked] = useState(true);
  const [incarcaturaFiltrate, setIncarcaturaFiltrate] = useState(incarcatura);

  const [acFilter, setAcFilter] = useState(false);
  const [acFilterDirection, setAcFilterDirection] = useState(true);
  const [anFilter, setAnFilter] = useState(false);
  const [anFilterDirection, setAnFilterDirection] = useState(true);
  const [totalFilter, settotalFilter] = useState(false);
  const [totalFilterDirection, setTotalFilterDirection] = useState(true);
  const [upFilter, setUpFilter] = useState(false);
  const [upFilterDirection, setUpFilterDirection] = useState(true);
  const [supFilter, setSuppFilter] = useState(false);
  const [supFilterDirection, setSupFilterDirection] = useState(true);

  const [numeProcuror, setNumeProcuror] = useState("");

  useEffect(() => {
    let sortData;

    sortData = incarcatura.filter((incarcatura) => {
      if (numeProcuror === "") {
        return true;
      } else {
        return incarcatura.numeProcuror
          .toLowerCase()
          .includes(numeProcuror.toLowerCase());
      }
    });

    if (acFilter) {
      if (acFilterDirection) {
        sortData = sortData.sort(
          (a, b) => +b.number_dos_cu_ac - +a.number_dos_cu_ac
        );
      } else {
        sortData = sortData.sort(
          (a, b) => +a.number_dos_cu_ac - +b.number_dos_cu_ac
        );
      }
    }

    if (anFilter) {
      if (anFilterDirection) {
        sortData = sortData.sort(
          (a, b) => +b.number_dos_cu_an - +a.number_dos_cu_an
        );
      } else {
        sortData = sortData.sort(
          (a, b) => +a.number_dos_cu_an - +b.number_dos_cu_an
        );
      }
    }

    if (totalFilter) {
      if (totalFilterDirection) {
        sortData = sortData.sort(
          (a, b) => (+b.number_dos_cu_an + +b.number_dos_cu_ac) - (+a.number_dos_cu_an + +a.number_dos_cu_ac) 
        );
      } else {
        sortData = sortData.sort(
          (a, b) =>  (+a.number_dos_cu_an + +a.number_dos_cu_ac) - (+b.number_dos_cu_an + +b.number_dos_cu_ac)
        );
      }
    }

    if (upFilter) {
      if (upFilterDirection) {
        sortData = sortData.sort(
          (a, b) => (+b.upp ) - (+a.upp) 
        );
      } else {
        sortData = sortData.sort(
          (a, b) =>  (+a.upp) - (+b.upp)
        );
      }
    }

    if (supFilter) {
      if (supFilterDirection) {
        sortData = sortData.sort(
          (a, b) => (+b.number_dos_cu_an + +b.number_dos_cu_ac - +b.upp ) - (+a.number_dos_cu_an + +a.number_dos_cu_ac - +a.upp) 
        );
      } else {
        sortData = sortData.sort(
          (a, b) =>  (+a.number_dos_cu_an + +a.number_dos_cu_ac - +a.upp ) - (+b.number_dos_cu_an + +b.number_dos_cu_ac - +b.upp) 
        );
      }
    }


    setIncarcaturaFiltrate(sortData);
  }, [
    acFilter,
    acFilterDirection,
    anFilter,
    anFilterDirection,
    supFilter,
    supFilterDirection,
    upFilter,
    upFilterDirection,
    totalFilter,
    totalFilterDirection,
    numeProcuror,
  ]);

  let totalSolutii = 0;

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

  let totalAc = 0;
  let totalAn = 0;
  let totalSup = 0;
  let totalUpp = 0;

  // incarcaturaFiltrate = incarcaturaFiltrate.filter((incarcatura) => {
  //   if (numeProcuror === "") {
  //     return true;
  //   } else {
  //     return incarcatura.numeProcuror
  //       .toLowerCase()
  //       .includes(numeProcuror.toLowerCase());
  //   }
  // });

  let i = 0;


  const dosareCuAcHandler = () => {
    setAcFilter(true);
    setAnFilter(false);
    setUpFilter(false);
    setSuppFilter(false);
    settotalFilter(false);
    setAcFilterDirection(!acFilterDirection);
  };

  const dosareCuAnHandler = () => {
    setAcFilter(false);
    setAnFilter(true);
    setUpFilter(false);
    setSuppFilter(false);
    settotalFilter(false);
    setAnFilterDirection(!anFilterDirection);
  };

  const totalDosareHandler = () => {
    setAcFilter(false);
    setAnFilter(false);
    setUpFilter(false);
    setSuppFilter(false);
    settotalFilter(true);
    setTotalFilterDirection(!totalFilterDirection);
  };

  const uppHandler = () => {
    setAcFilter(false);
    setAnFilter(false);
    setUpFilter(true);
    setSuppFilter(false);
    settotalFilter(false);
    setUpFilterDirection(!upFilterDirection);
  };

  const supHandler = () => {
    setAcFilter(false);
    setAnFilter(false);
    setUpFilter(false);
    setSuppFilter(true);
    settotalFilter(false);
    setSupFilterDirection(!supFilterDirection);
  };

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
          <div className={classes.td}>NR. CRT.</div>
          <div className={classes.td}>PROCUROR</div>
          <div
            className={classes.td}
            style={{ cursor: "pointer" }}
            onClick={dosareCuAcHandler}
          >
            DOSARE CU A.C.
            {acFilter && !acFilterDirection && <span>&uarr;</span>}
            {acFilter && acFilterDirection && <span>&darr;</span>}
          </div>
          <div
            className={classes.td}
            style={{ cursor: "pointer" }}
            onClick={dosareCuAnHandler}
          >
            DOSARE CU A.N. <br /> NETRECUTE LA PASIV
            {anFilter && !anFilterDirection && <span>&uarr;</span>}
            {anFilter && anFilterDirection && <span>&darr;</span>}
          </div>
          <div
            className={classes.td}
            style={{ cursor: "pointer" }}
            onClick={totalDosareHandler}
          >
            TOTAL DOSARE
            {totalFilter && !totalFilterDirection && <span>&uarr;</span>}
            {totalFilter && totalFilterDirection && <span>&darr;</span>}
          </div>
          <div
            className={classes.td}
            style={{ cursor: "pointer" }}
            onClick={uppHandler}
          >
            U.P.P.
            {upFilter && !upFilterDirection && <span>&uarr;</span>}
            {upFilter && upFilterDirection && <span>&darr;</span>}
          </div>
          <div
            className={classes.td}
            style={{ cursor: "pointer" }}
            onClick={supHandler}
          >
            S.U.P.
            {supFilter && !supFilterDirection && <span>&uarr;</span>}
            {supFilter && supFilterDirection && <span>&darr;</span>}
          </div>
        </div>
        {incarcaturaFiltrate.map((inc) => {
          if (inc.number_dos_cu_ac !== 0 || +inc.number_dos_cu_an !== 0) {
            i = i + 1;

            totalAc = totalAc + +inc.number_dos_cu_ac;
            totalAn = totalAn + +inc.number_dos_cu_an;
            totalSup =
              totalSup +
              +inc.number_dos_cu_an +
              +inc.number_dos_cu_ac -
              +inc.upp;
            totalUpp = totalUpp + +inc.upp;

            if (+inc.number_dos_cu_ac !== 0 || +inc.number_dos_cu_an !== 0)
              return (
                <div className={classes.tr}>
                  <div className={classes.td}>{i}</div>
                  <div className={classes.td}>{inc.numeProcuror}</div>
                  <div className={classes.td}>{inc.number_dos_cu_ac}</div>
                  <div className={classes.td}>{inc.number_dos_cu_an}</div>
                  <div className={classes.td}>
                    {+inc.number_dos_cu_an + +inc.number_dos_cu_ac}
                  </div>
                  <div className={classes.td}>{inc.upp}</div>
                  <div className={classes.td}>
                    {+inc.number_dos_cu_an + +inc.number_dos_cu_ac - +inc.upp}
                  </div>
                </div>
              );
          }
        })}
        <div className={classes.th}>
          <div className={classes.td}>TOTAL DOSARE</div>
          <div className={classes.td}></div>
          <div className={classes.td}>{totalAc}</div>
          <div className={classes.td}>{totalAn}</div>
          <div className={classes.td}>{totalAn + totalAc}</div>
          <div className={classes.td}>{totalUpp}</div>
          <div className={classes.td}>{totalSup}</div>
        </div>
      </div>
    </>
  );
};

export default IncarcaturaList;
