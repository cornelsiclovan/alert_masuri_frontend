import { Link } from "react-router-dom";
import classes from "./DosareList.module.css";
import { useEffect, useState } from "react";

const DosareList = ({ dosare, isAc, isAn }) => {
  const [cuMasuriAsiguratorii, setCuMasuriAsiguratorii] = useState(true);
  const [dateNow, setDate] = useState(Date.now());
  const [searchName, setSearchName] = useState("");
  const [numarDosare, setNumarDosare] = useState(dosare.length);
  const [dosSaseLuni, setDosSaseLuni] = useState(0);
  const [yearSearch, setYearSearch] = useState("");
  const changeCuMasuriAsiguratorii = () => {
    setCuMasuriAsiguratorii(true);
  };



  let dosareFilterFaraMasuri = [];
  let dosareFilterCuSechestru = [];

  let dosareMaiVechiDeSaseLuni = [];
  let dosareFilterCuMasuri = [];

  let dosareContestatii = [];

  if (!isAc && !isAn) {
    dosareFilterCuSechestru = dosare.filter(
      (dosar) => dosar.isSechestru === true
    );
    dosareFilterFaraMasuri = dosare.filter(
      (dosar) => dosar.days_remaining === null && !dosar.admitere_contestatie
    );
    dosareFilterCuMasuri = dosare.filter(
      (dosar) => dosar.days_remaining !== null && dosar.isSechestru !== true
    );
    dosareContestatii = dosare.filter(
      (dosar) => dosar.admitere_contestatie === 1
    );
    dosareMaiVechiDeSaseLuni = dosare.filter(
      (dosar) =>
        ((new Date(dosar.data).getTime() - new Date()) / (1000 * 3600 * 24)) *
        -1 >
        180
    );
  }

  useEffect(() => {

    setNumarDosare(dosareFilterFaraMasuri.length);
    setDosSaseLuni(dosareMaiVechiDeSaseLuni.length);
  }, [dosareFilterFaraMasuri, dosareMaiVechiDeSaseLuni]);

  const [rechIsChecked, setRechIsChecked] = useState(false);
  const [renuIsChecked, setRenuIsChecked] = useState(false);
  const [uppIsChecked, setUppIsChecked] = useState(false);
  const [clasIsChecked, setClasIsChecked] = useState(false);
  const [alteleIsChecked, setAlteleIsChecked] = useState(false);
  const [toate, setToate] = useState(true);

  const onChangeSolutieInput = (event) => {
    if (event.target.value.includes("rechizitoriu")) {
      checkToate("rech", rechIsChecked);
      setRechIsChecked(!rechIsChecked);
    }

    if (event.target.value === "clasare") {
      checkToate("clas", clasIsChecked);
      setClasIsChecked(!clasIsChecked);
    }

    if (event.target.value === "renuntare") {
      checkToate("renu", renuIsChecked);
      setRenuIsChecked(!renuIsChecked);
    }

    if (event.target.value === "upp") {
      checkToate("upp", uppIsChecked);
      setUppIsChecked(!uppIsChecked);
    }

    if(event.target.value === "altele") {
      checkToate("altele", alteleIsChecked)
      setAlteleIsChecked(!alteleIsChecked);
    }
  };  

  const checkToate = (tipSol, value) => {
    if (tipSol === "rech") {
      setToate(
        !(!rechIsChecked || clasIsChecked || renuIsChecked || uppIsChecked || alteleIsChecked)
      );
    }
    if (tipSol === "clas") {
      setToate(
        !(rechIsChecked || !clasIsChecked || renuIsChecked || uppIsChecked || alteleIsChecked)
      );
    }
    if (tipSol === "renu") {
      setToate(
        !(rechIsChecked || clasIsChecked || !renuIsChecked || uppIsChecked || alteleIsChecked)
      );
    }
    if (tipSol === "upp") {
      setToate(
        !(rechIsChecked || clasIsChecked || renuIsChecked || !uppIsChecked || alteleIsChecked)
      );
    }
    if(tipSol === "altele") {
      setToate(
         !(rechIsChecked || clasIsChecked || renuIsChecked || uppIsChecked || !alteleIsChecked)
      )
    }
  };

  const getCondition = (isRech, isRenu, isClas, isUpp, isAltele) => {
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

    if (isUpp && uppIsChecked) {
      condition = condition || isUpp;
    }

    if (isAltele && alteleIsChecked) {
      condition = condition || isAltele;
    }
    return condition;
  };

  const [dosarCautat, setDosarCautat] = useState(null);

  let i = 0;

  if (isAc || isAn) {
    dosareFilterFaraMasuri = dosare;
  }

  const onChangeDosarInput = (event) => {
    setSearchName(event.target.value);

    setDosarCautat(event.target.value);

    // dosareFilterFaraMasuri = dosareFilterFaraMasuri.filter(
    //   (dosar) =>
    //     dosar.numeProcuror
    //       .toLowerCase()
    //       .includes(event.target.value.toLowerCase()) ||
    //     dosar.numar.includes(event.target.value)
    // );
  };

  const onChangeYearInput = (event) => {
    setYearSearch(event.target.value);
  };

  if (!toate) {
    dosareFilterFaraMasuri = dosareFilterFaraMasuri.filter((dosar) => {
      let condition = getCondition(
        dosar.tip_solutie_propusa.includes("TERMINARE"),
        dosar.tip_solutie_propusa.includes("R.U.P."),
        dosar.tip_solutie_propusa.includes("CLASARE"),
        dosar.tip_solutie_propusa.includes("UPP"),
        (
          !dosar.tip_solutie_propusa.includes("UPP")
          &&  !dosar.tip_solutie_propusa.includes("R.U.P.")
          &&  !dosar.tip_solutie_propusa.includes("CLASARE")
          &&  !dosar.tip_solutie_propusa.includes("TERMINARE")
        )
      );

      return condition;
    });
  }

  dosareFilterFaraMasuri = dosareFilterFaraMasuri.filter((dosar) => {
    return (
      (dosar.numeProcuror.toLowerCase().includes(searchName) ||
        dosar.numeProcuror.includes(searchName) ||
        dosar.numeProcuror.toUpperCase().includes(searchName) ||
        dosar.numar.split("/P/")[0].includes(dosarCautat) ||
        (dosar.numar_fost &&
          dosar.numar_fost.split("/P/")[0].includes(dosarCautat))) &&
      (dosar.numar.split("/")[3].includes(yearSearch) ||
        (dosar.numar_fost &&
          dosar.numar_fost.split("/")[2].includes(yearSearch)))
    );
  });



  dosareMaiVechiDeSaseLuni = dosareFilterFaraMasuri.filter(
    (dosar) =>
      ((new Date(dosar.data).getTime() - new Date()) / (1000 * 3600 * 24)) *
      -1 >
      180
  );

  const exportToExcel = () => {
    var csvString =
      "numar dosar, nume procuror, data primei sesizari, organul prim sesizat, institutia la care se afla dosarul,";

    csvString += "\r\n";

    dosareFilterFaraMasuri.forEach((rowItem, rowIndex) => {
      for (const [key, value] of Object.entries(rowItem)) {
        if (
          key === "isControlJudiciar" ||
          key === "isArest" ||
          key === "isSechesctru" ||
          key === "data_arest" ||
          key === "data_cj" ||
          key === "data_interceptari" ||
          key === "data_sechestru" ||
          key === "days_remaining" ||
          key === "este_solutionat" ||
          key === "id" ||
          key === "isInterceptari" ||
          key === "tip_solutie" ||
          key === "tip_solutie_propusa" ||
          key === "userId" ||
          key === "data_inceperii_la_procuror" ||
          key === "isSechestru" ||
          key === "procurorId" ||
          key === "data"
        ) {
        } else {
          let myValue = value;
          if (key === "data_primei_sesizari") {
            myValue = value.split("T")[0];
          }

          csvString += myValue + ",";
        }
      }
      csvString += "\r\n";
    });

    csvString =
      "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(csvString);
    const x = document.createElement("A");
    x.setAttribute("href", csvString);
    x.setAttribute("download", "somedata.csv");
    document.body.appendChild(x);
    x.click();
  };

  return (
    <>
      {!isAc && !isAn && (
        <div className={classes.sort}>
          <div className={classes.checkbox}>
            <div className={classes.ul}>
              <div className={classes.li}>
                <input
                  checked={toate}
                  type="checkbox"
                  id="toate"
                  value="toate"
                  onChange={onChangeSolutieInput}
                ></input>
                <label style={{ marginLeft: "-200px" }}>Toate</label>
              </div>
              <div className={classes.li}>
                <input
                  checked={rechIsChecked}
                  type="checkbox"
                  id="rechizitoriu"
                  value="rechizitoriu"
                  onChange={onChangeSolutieInput}
                ></input>
                <label style={{ marginLeft: "-200px" }}>R.T.U.P.</label>
              </div>
              <div className={classes.li}>
                <input
                  checked={clasIsChecked}
                  id="clasare"
                  value="clasare"
                  type="checkbox"
                  onChange={onChangeSolutieInput}
                ></input>
                <label style={{ marginLeft: "-200px" }}>Ref. clasare</label>
              </div>
              <div className={classes.li}>
                <input
                  checked={renuIsChecked}
                  type="checkbox"
                  id="renuntare"
                  value="renuntare"
                  onChange={onChangeSolutieInput}
                ></input>
                <label style={{ marginLeft: "-200px" }}>Ref. renuntare</label>
              </div>
              <div className={classes.li}>
                <input
                  checked={uppIsChecked}
                  type="checkbox"
                  id="upp"
                  value="upp"
                  onChange={onChangeSolutieInput}
                ></input>
                <label style={{ marginLeft: "-200px" }}>U.P.P.</label>
              </div>
              <div className={classes.li}>
                <input
                  checked={alteleIsChecked}
                  type="checkbox"
                  id="altele"
                  value="altele"
                  onChange={onChangeSolutieInput}
                ></input>
                <label style={{ marginLeft: "-200px" }}>Altele</label>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={classes.group}>
        <div className={classes.items}>
          <div style={{ display: "flex" }}>
            <div>
              {!isAc && !isAn && <h2> Dosare intrate ({numarDosare}) </h2>}
              {isAc && (
                <h1 style={{ width: "400px" }}>
                  {" "}
                  Dosare cu AC({numarDosare}){" "}
                </h1>
              )}
              {isAn && (
                <h1 style={{ width: "400px" }}>
                  {" "}
                  Dosare cu AN({numarDosare}){" "}
                </h1>
              )}
              {!isAc && !isAn && <>- Mai vechi de 6 luni ({dosSaseLuni})</>}
              <button
                style={{ backgroundColor: "greenyellow" }}
                onClick={exportToExcel}
              >
                Export
              </button>
            </div>
            <input
              style={{
                height: "30px",
                marginTop: "20px",
                marginLeft: "50px",
                width: "200px",
              }}
              type="text"
              placeholder="Nr. dosar / Nume procuror"
              onChange={onChangeDosarInput}
            ></input>
            <input
              style={{
                height: "30px",
                marginTop: "20px",
                marginLeft: "10px",
                width: "100px",
              }}
              type="text"
              placeholder="an"
              onChange={onChangeYearInput}
            ></input>
          </div>
          <br />
          <ul className={classes.list}>
            {dosareFilterFaraMasuri.map((dosar) => {

              const timpRamasArest = Math.floor(
                (new Date(dosar.data_arest).getTime() - dateNow) /
                (1000 * 3600 * 24)
              );
              const timpRamasCj = Math.floor(
                (new Date(dosar.data_cj).getTime() - dateNow) /
                (1000 * 3600 * 24)
              );
              const timpRamasSechestru = Math.floor(
                (new Date(dosar.data).getTime() - dateNow) /
                (1000 * 3600 * 24)
              );
              const timpRamasInterceptari = Math.floor(
                (new Date(dosar.data).getTime() - dateNow) /
                (1000 * 3600 * 24)
              );

              let timpRamasIntrate = Math.floor(
                ((new Date(dosar.data).getTime() - dateNow) /
                  (1000 * 3600 * 24)) *
                -1
              );

              let timpInZile = timpRamasIntrate;

              const aniTimpRamasIntrate = Math.floor(timpRamasIntrate / 360);
              const restZile = timpRamasIntrate % 360;
              const luniRamasIntrate = Math.floor(restZile / 30);
              const zileRamasIntrate = restZile % 30;

              const alertaArest = timpRamasArest <= 15 ? true : false;

              const alertaSechestru = timpRamasSechestru <= 30 ? true : false;
              const alertaCj =
                parseInt(dosar.days_remaining) <= 4 ? true : false;
              const alertaInterceptari =
                timpRamasInterceptari <= 15 ? true : false;

              let colorIntrate = "green";

              if (timpRamasIntrate > 90 && timpRamasIntrate < 180) {
                colorIntrate = "orange"
              } else if (timpRamasIntrate > 180) {
                colorIntrate = "red"
              }




              const alertaIntrate = timpRamasIntrate >= 90 ? true : false;

              timpRamasIntrate = "";

              if (aniTimpRamasIntrate !== 0) {
                timpRamasIntrate += aniTimpRamasIntrate + " ani ";
              }

              if (luniRamasIntrate !== 0) {
                timpRamasIntrate += luniRamasIntrate + " luni ";
              }

              if (zileRamasIntrate !== 0) {
                timpRamasIntrate += zileRamasIntrate + " zile";
              }

              if (dosarCautat === null || dosarCautat === "") {
                return (
                  <li key={dosar.id} className={classes.item}>
                    <Link
                      to={
                        (!isAc && !isAn) 
                          ? `/dosare/${dosar.id}` : !isAn ? `/dosareCuAc/${dosar.id}` : `/dosareCuAn/${dosar.id}`
                      }
                    >
                      <div className={classes.content}>
                        <h3>
                          {dosar.numar} - <small>{dosar.numeProcuror}</small>{" "}
                          <br />
                          {dosar.numar_fost}
                        </h3>
                        {!isAc && dosar.tip_solutie_propusa !== "UPP" && (
                          <p>
                            Solutie propusa: <b>{dosar.tip_solutie_propusa}</b>
                          </p>
                        )}
                        {!isAc && dosar.tip_solutie_propusa === "UPP" && (
                          <p>
                            <b>{dosar.tip_solutie_propusa}</b>
                          </p>
                        )}
                        {!isAc && (
                          <p>
                            Data desemnare procuror:{" "}
                            {dosar.data_inceperii_la_procuror &&
                              dosar.data_inceperii_la_procuror.split("T")[0]}
                          </p>
                        )}
                        {dosar && dosar.este_solutionat === 1 && (
                          <p>
                            Solutie finala: <b>{dosar.tip_solutie}</b>
                          </p>
                        )}
                        <p
                          style={{
                            // backgroundColor: alertaIntrate ? "red" : "",
                            backgroundColor: colorIntrate
                          }}
                        >
                          {!isAc &&
                            dosar.data &&
                            `Intrare: ${dosar.data.split("T")[0]
                            }, au trecut ${timpRamasIntrate} zile de la intrare`}
                        </p>

                        <p>
                          {isAc && (
                            <>
                              Organul prim sesizat:{" "}
                              {dosar.prima_institutie_sesizata}
                            </>
                          )}
                        </p>
                        <p>
                          {isAc && (
                            <>
                              Data primei sesizari:{" "}
                              {dosar.data_primei_sesizari.split("T")[0]}
                            </>
                          )}
                        </p>
                        <p>
                          {isAc && (
                            <>
                              Institutia la care se afla:{" "}
                              <b> {dosar.institutia_curenta}</b>
                            </>
                          )}
                        </p>

                        <time
                          style={{ backgroundColor: alertaArest ? "red" : "" }}
                        >
                          {dosar.data_arest &&
                            `arest: ${dosar.data_arest}, mai sunt ${timpRamasArest} zile pana la expirarea masurii`}
                        </time>
                        {dosar.data_arest && <br />}
                        <time
                          style={{
                            backgroundColor: alertaSechestru ? "red" : "",
                          }}
                        >
                          {dosar.data_sechestru &&
                            `sechestru: ${dosar.data_sechestru}, mai sunt ${timpRamasSechestru} zile pana la expirarea masurii`}
                        </time>
                        {dosar.data_sechestru && <br />}
                        <time
                          style={{ backgroundColor: alertaCj ? "red" : "" }}
                        >
                          {dosar.days_remaining &&
                            `masura preventiva: ${dosar.data}, mai sunt ${dosar.days_remaining} zile pana la expirarea masurii`}
                        </time>
                        {dosar.data_cj && <br />}
                        <time
                          style={{
                            backgroundColor: alertaInterceptari ? "red" : "",
                          }}
                        >
                          {dosar.data_interceptari &&
                            `interceptari: ${dosar.data_interceptari}, mai sunt ${timpRamasInterceptari} zile pana la expirarea masurii`}
                        </time>
                        {dosar.data_interceptari && <br />}
                      </div>
                    </Link>
                  </li>
                );
              } else if (
                dosar &&
                dosarCautat &&
                (dosar.numar
                  .toLowerCase()
                  .includes(dosarCautat.toLowerCase()) ||
                  dosar.numeProcuror
                    .toLowerCase()
                    .includes(dosarCautat.toLowerCase()) ||
                  dosar.numar_fost.includes(dosarCautat))
              ) {
                return (
                  <li key={dosar.id} className={classes.item}>
                    <Link to={`/dosare/${dosar.id}`}>
                      <div className={classes.content}>
                        <h3>
                          {dosar.numar} - <small>{dosar.numeProcuror}</small>
                          <br />
                          {dosar.numar_fost}
                        </h3>
                        {!isAc && dosar.tip_solutie_propusa !== "UPP" && (
                          <p>
                            Solutie propusa: <b>{dosar.tip_solutie_propusa}</b>
                          </p>
                        )}
                        {(!isAc || isAc) &&
                          dosar.tip_solutie_propusa === "UPP" && (
                            <p>
                              <b>{dosar.tip_solutie_propusa}</b>
                            </p>
                          )}
                        {!isAc && (
                          <p>
                            Data desemnare procuror:{" "}
                            {dosar.data_inceperii_la_procuror &&
                              dosar.data_inceperii_la_procuror.split("T")[0]}
                          </p>
                        )}
                        {dosar && dosar.este_solutionat === 1 && (
                          <p>
                            Solutie finala: <b>{dosar.tip_solutie}</b>
                          </p>
                        )}
                        <p
                          style={{
                            backgroundColor: colorIntrate,
                          }}
                        >
                          {!isAc &&
                            dosar.data &&
                            `Intrare: ${dosar.data.split("T")[0]
                            }, au trecut ${timpRamasIntrate} zile de la intrare`}
                        </p>
                        <p>
                          {isAc && (
                            <>
                              Organul prim sesizat:{" "}
                              {dosar.prima_institutie_sesizata}
                            </>
                          )}
                        </p>
                        <p>
                          {isAc && (
                            <>
                              Data primei sesizari:{" "}
                              {dosar.data_primei_sesizari.split("T")[0]}
                            </>
                          )}
                        </p>
                        <p>
                          {isAc && (
                            <>
                              Institutia la care se afla:{" "}
                              <b> {dosar.institutia_curenta}</b>
                            </>
                          )}
                        </p>

                        <time
                          style={{ backgroundColor: alertaArest ? "red" : "" }}
                        >
                          {dosar.data_arest &&
                            `arest: ${dosar.data_arest}, mai sunt ${timpRamasArest} zile pana la expirarea masurii`}
                        </time>
                        {dosar.data_arest && <br />}
                        <time
                          style={{
                            backgroundColor: alertaSechestru ? "red" : "",
                          }}
                        >
                          {dosar.data_sechestru &&
                            `sechestru: ${dosar.data_sechestru}, mai sunt ${timpRamasSechestru} zile pana la expirarea masurii`}
                        </time>
                        {dosar.data_sechestru && <br />}
                        <time
                          style={{ backgroundColor: alertaCj ? "red" : "" }}
                        >
                          {dosar.days_remaining &&
                            `masura preventiva: ${dosar.data}, mai sunt ${dosar.days_remaining} zile pana la expirarea masurii`}
                        </time>
                        {dosar.data_cj && <br />}
                        <time
                          style={{
                            backgroundColor: alertaInterceptari ? "red" : "",
                          }}
                        >
                          {dosar.data_interceptari &&
                            `interceptari: ${dosar.data_interceptari}, mai sunt ${timpRamasInterceptari} zile pana la expirarea masurii`}
                        </time>
                        {dosar.data_interceptari && <br />}
                      </div>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className={classes.items}>
          {dosareFilterCuMasuri.length !== 0 && (
            <h2> Dosare măsuri preventive </h2>
          )}
          <ul className={classes.list}>
            {cuMasuriAsiguratorii &&
              dosareFilterCuMasuri.map((dosar) => {

                if (
                  dosar.isControlJudiciar ||
                  dosar.isArest ||
                  dosar.isSechestru ||
                  dosar.isInterceptari
                ) {
                  const timpRamasArest = Math.floor(
                    (new Date(dosar.data_arest).getTime() - dateNow) /
                    (1000 * 3600 * 24)
                  );
                  const timpRamasCj = Math.floor(
                    (new Date(dosar.data_cj).getTime() - dateNow) /
                    (1000 * 3600 * 24)
                  );
                  const timpRamasSechestru = Math.floor(
                    (new Date(dosar.data).getTime() - dateNow) /
                    (1000 * 3600 * 24)
                  );
                  const timpRamasInterceptari = Math.floor(
                    (new Date(dosar.data_interceptari).getTime() - dateNow) /
                    (1000 * 3600 * 24)
                  );

                  let colorSechestru = 'green';

                  if (timpRamasSechestru > 90 && timpRamasSechestru < 180) {
                    colorSechestru = 'orange';
                  } else if (timpRamasSechestru > 180) {
                    colorSechestru = 'red';
                  }

                  const alertaArest = timpRamasArest <= 15 ? true : false;
                  const alertaSechestru =
                    timpRamasSechestru <= 30 ? true : false;
                  const alertaCj =
                    parseInt(dosar.days_remaining) <= 15 ? true : false;
                  const alertaInterceptari =
                    timpRamasInterceptari <= 15 ? true : false;

                  let culoareMasuraPreventiva = 'green';
                  if(parseInt(dosar.days_remaining) <= 15) {
                    culoareMasuraPreventiva = "red"
                  }
                  
                  if(dosar.days_remaining > 15 && dosar.days_remaining <= 25) {
                    culoareMasuraPreventiva = "orange"
                  }

                  if(dosar.days_remaining > 25) {
                    culoareMasuraPreventiva = "green"
                  }

                  if (dosarCautat === null || dosarCautat === "") {
                    return (
                      <li key={dosar.id} className={classes.item}>
                        <Link to={`/dosare/${dosar.id}`}>
                          <div className={classes.content}>
                            <h3>
                              {dosar.numar} - {dosar.numeProcuror}
                              <br />
                              {dosar.numar_fost}
                            </h3>
                            {dosar.trimis_masura_la_instanta === "1" && (
                              <b>
                                <i style={{ backgroundColor: "blue" }}>
                                  Trimis la instanta
                                </i>
                              </b>
                            )}
                            <time>
                              expirare {dosar.isArest && "arest"}{" "}
                              {dosar.isControlJudiciar && "control judiciar"} :{" "}
                              {dosar.data.split("T")[0]}
                            </time>{" "}
                            <br />
                            <time
                              style={{
                                backgroundColor: alertaArest ? "red" : "",
                              }}
                            >
                              {dosar.data_arest &&
                                `arest: ${dosar.data_arest}, mai sunt ${timpRamasArest} zile pana la expirarea masurii`}
                            </time>
                            {dosar.data_arest && <br />}
                            <time
                              style={{
                                backgroundColor: alertaSechestru ? "red" : "",
                              }}
                            >
                              {dosar.data_sechestru &&
                                `sechestru: ${dosar.data_sechestru}, mai sunt ${timpRamasSechestru} zile pana la expirarea masurii`}
                            </time>
                            {dosar.data_sechestru && <br />}
                            <time
                              style={{ backgroundColor: culoareMasuraPreventiva}}
                            >
                              {dosar.days_remaining &&
                                `masura preventiva expira in ${dosar.days_remaining} zile`}
                            </time>
                            {dosar.data_cj && <br />}
                            <time
                              style={{
                                backgroundColor: alertaInterceptari
                                  ? "red"
                                  : "",
                              }}
                            >
                              {dosar.data_interceptari &&
                                `interceptari: ${dosar.data_interceptari}, mai sunt ${timpRamasInterceptari} zile pana la expirarea masurii`}
                            </time>
                            {dosar.data_interceptari && <br />}
                          </div>
                        </Link>
                      </li>
                    );
                  } else if (
                    dosar &&
                    dosarCautat &&
                    (dosar.numar
                      .toLowerCase()
                      .includes(dosarCautat.toLowerCase()) ||
                      dosar.numeProcuror
                        .toLowerCase()
                        .includes(dosarCautat.toLowerCase()) ||
                      dosar.numar_fost.includes(dosarCautat))
                  ) {

                    return (
                      <li key={dosar.id} className={classes.item}>
                        <Link to={`/dosare/${dosar.id}`}>
                          <div className={classes.content}>
                            <h3>
                              {dosar.numar} - {dosar.numeProcuror}
                              <br />
                              {dosar.numar_fost}
                            </h3>
                            <time>
                              expirare masura preventiva:{" "}
                              {dosar.data.split("T")[0]}
                            </time>{" "}
                            <br />
                            <time
                              style={{
                                backgroundColor: alertaArest ? "red" : "",
                              }}
                            >
                              {dosar.data_arest &&
                                `arest: ${dosar.data_arest}, mai sunt ${timpRamasArest} zile pana la expirarea masurii`}
                            </time>
                            {dosar.data_arest && <br />}
                            <time
                              style={{
                                backgroundColor: alertaSechestru ? "red" : "",
                              }}
                            >
                              {dosar.data_sechestru &&
                                `sechestru: ${dosar.data_sechestru}, mai sunt ${timpRamasSechestru} zile pana la expirarea masurii`}
                            </time>
                            {dosar.data_sechestru && <br />}
                            <time
                              style={{ backgroundColor: culoareMasuraPreventiva }}
                            >
                              {dosar.days_remaining &&
                                `masura preventiva expira in ${dosar.days_remaining} zile`}
                            </time>
                            {dosar.data_cj && <br />}
                            <time
                              style={{
                                backgroundColor: alertaInterceptari
                                  ? "red"
                                  : "",
                              }}
                            >
                              {dosar.data_interceptari &&
                                `interceptari: ${dosar.data_interceptari}, mai sunt ${timpRamasInterceptari} zile pana la expirarea masurii`}
                            </time>
                            {dosar.data_interceptari && <br />}
                          </div>
                        </Link>
                      </li>
                    );
                  }
                }
              })}
          </ul>
        </div>
        <div className={classes.items}>
          {dosareFilterCuSechestru.length !== 0 && (
            <>
              <h2> Dosare măsuri asigurătorii </h2>
              <ul className={classes.list}>
                {cuMasuriAsiguratorii &&
                  dosareFilterCuSechestru.map((dosar) => {
                    if (
                      dosar.isControlJudiciar ||
                      dosar.isArest ||
                      dosar.isSechestru ||
                      dosar.isInterceptari
                    ) {
                      const timpRamasArest = Math.floor(
                        (new Date(dosar.data_arest).getTime() - dateNow) /
                        (1000 * 3600 * 24)
                      );
                      const timpRamasCj = Math.floor(
                        (new Date(dosar.data_cj).getTime() - dateNow) /
                        (1000 * 3600 * 24)
                      );
                      let timpRamasSechestru = Math.floor(
                        (new Date(dosar.data).getTime() - dateNow) /
                        (1000 * 3600 * 24)
                      );

                       let tsech = -1* timpRamasSechestru;

                      const timpRamasInterceptari = Math.floor(
                        (new Date(dosar.data_interceptari).getTime() -
                          dateNow) /
                        (1000 * 3600 * 24)
                      );

                      const aniTimpRamasSechestru = Math.floor(
                        timpRamasSechestru * -1 / 360
                      );
                      const restZileSech = timpRamasSechestru * -1 % 360;
                      const luniRamasSechestru = Math.floor(restZileSech / 30);
                      const zileRamaseSechestru = restZileSech % 30;

                      const alertaArest = timpRamasArest <= 15 ? true : false;
                      const alertaSechestru =
                        parseInt(-1 * timpRamasSechestru) > 150 ? true : false;
                      const alertaCj =
                        parseInt(dosar.days_remaining) <= 15 ? true : false;
                      const alertaInterceptari =
                        timpRamasInterceptari <= 15 ? true : false;

                      timpRamasSechestru = "";

                      if (aniTimpRamasSechestru !== 0) {
                        timpRamasSechestru += aniTimpRamasSechestru + " ani ";
                      }

                      if (luniRamasSechestru !== 0) {
                        timpRamasSechestru += luniRamasSechestru + " luni ";
                      }

                      if (zileRamaseSechestru !== 0) {
                        timpRamasSechestru += zileRamaseSechestru + " zile";
                      }

                      let colorSechestru = 'green';
                     
                      if (tsech > 90 && tsech < 180) {
                        colorSechestru = 'orange';
                      } else if (tsech > 180) {
                        colorSechestru = 'red';
                      }


                      if (dosarCautat === null || dosarCautat === "") {
                        return (
                          <li key={dosar.id} className={classes.item}>
                            <Link to={`/dosare/${dosar.id}`}>
                              <div className={classes.content}>
                                <h3>
                                  {dosar.numar} - {dosar.numeProcuror}
                                  <br />
                                  {dosar.numar_fost}
                                </h3>
                                <time>
                                  instituire/mentinere:{" "}
                                  {dosar.data.split("T")[0]}
                                </time>{" "}
                                <br />
                                <time
                                  style={{
                                    backgroundColor: alertaArest ? "red" : "",
                                  }}
                                >
                                  {dosar.data_arest &&
                                    `arest: ${dosar.data_arest}, mai sunt ${timpRamasArest} zile pana la expirarea masurii`}
                                </time>
                                {dosar.data_arest && <br />}
                                <time
                                  style={{
                                    backgroundColor: alertaSechestru
                                      ? "red"
                                      : "",
                                  }}
                                >
                                  {dosar.data_sechestru &&
                                    `sechestru: ${dosar.data_sechestru}, mai sunt ${timpRamasSechestru} zile pana la expirarea masurii`}
                                </time>
                                {dosar.data_sechestru && <br />}
                                <time
                                  style={{
                                    backgroundColor:colorSechestru,
                                  }}
                                >
                                  {dosar.days_remaining &&
                                    `de la instituire/mentineree au trecut ${timpRamasSechestru}`}
                                </time>
                                {dosar.data_cj && <br />}
                                <time
                                  style={{
                                    backgroundColor: alertaInterceptari
                                      ? "red"
                                      : "",
                                  }}
                                >
                                  {dosar.data_interceptari &&
                                    `interceptari: ${dosar.data_interceptari}, mai sunt ${timpRamasInterceptari} zile pana la expirarea masurii`}
                                </time>
                                {dosar.data_interceptari && <br />}
                              </div>
                            </Link>
                          </li>
                        );
                      } else if (
                        dosar &&
                        dosarCautat &&
                        (dosar.numar
                          .toLowerCase()
                          .includes(dosarCautat.toLowerCase()) ||
                          dosar.numeProcuror
                            .toLowerCase()
                            .includes(dosarCautat.toLowerCase()) ||
                          dosar.numar_fost.includes(dosarCautat))
                      ) {
                        return (
                          <li key={dosar.id} className={classes.item}>
                            <Link to={`/dosare/${dosar.id}`}>
                              <div className={classes.content}>
                                <h3>
                                  {dosar.numar} - {dosar.numeProcuror}
                                  <br />
                                  {dosar.numar_fost}
                                </h3>
                                <time>
                                  instituire/mentinere:{" "}
                                  {dosar.data.split("T")[0]}
                                </time>{" "}
                                <br />
                                <time
                                  style={{
                                    backgroundColor: alertaArest ? "red" : "",
                                  }}
                                >
                                  {dosar.data_arest &&
                                    `arest: ${dosar.data_arest}, mai sunt ${timpRamasArest} zile pana la expirarea masurii`}
                                </time>
                                {dosar.data_arest && <br />}
                                <time
                                  style={{
                                    backgroundColor: alertaSechestru
                                      ? "red"
                                      : "",
                                  }}
                                >
                                  {dosar.data_sechestru &&
                                    `sechestru: ${dosar.data_sechestru}, mai sunt ${timpRamasSechestru} zile pana la expirarea masurii`}
                                </time>
                                {dosar.data_sechestru && <br />}
                                <time
                                  style={{
                                    backgroundColor: colorSechestru,
                                  }}
                                >
                                  {dosar.days_remaining &&
                                    `de la insituire/mentinere au trecut ${timpRamasSechestru}`}
                                </time>
                                {dosar.data_cj && <br />}
                                <time
                                  style={{
                                    backgroundColor: alertaInterceptari
                                      ? "red"
                                      : "",
                                  }}
                                >
                                  {dosar.data_interceptari &&
                                    `interceptari: ${dosar.data_interceptari}, mai sunt ${timpRamasInterceptari} zile pana la expirarea masurii`}
                                </time>
                                {dosar.data_interceptari && <br />}
                              </div>
                            </Link>
                          </li>
                        );
                      }
                    }
                  })}
              </ul>
            </>
          )}
        </div>
        <div className={classes.items}>
          {dosareContestatii.length !== 0 && (
            <>
              <h2> Contestații durată proces </h2>
              <ul className={classes.list}>
                {dosareContestatii.map((dosar) => {
                  if (dosar.admitere_contestatie === 1) {
                    if (dosarCautat === null || dosarCautat === "") {
                      let alertaContestatie = false;
                      let timpRamasContestatie;
                      let text_inainte_contestatie = "mai sunt ";
                      let text_dupa_contestatie = " pana la termen";
                      if (
                        new Date(dosar.termen_contestatie).getTime() > dateNow
                      ) {
                        timpRamasContestatie = Math.floor(
                          (new Date(dosar.termen_contestatie).getTime() -
                            dateNow) /
                          (1000 * 3600 * 24)
                        );
                      }

                      if (
                        new Date(dosar.termen_contestatie).getTime() < dateNow
                      ) {
                        alertaContestatie = true;
                        text_inainte_contestatie = "au trecut ";
                        text_dupa_contestatie = " de la termen";
                        timpRamasContestatie = Math.floor(
                          (dateNow -
                            new Date(dosar.termen_contestatie).getTime()) /
                          (1000 * 3600 * 24)
                        );
                      }

                      let colorContestatie = "green";

                      if (timpRamasContestatie < 90) {
                        colorContestatie = "orange"
                      } else if (timpRamasContestatie > 90) {
                        colorContestatie = "green"
                      }


                      if (alertaContestatie) {
                        colorContestatie = "red";
                      }

                      if (timpRamasContestatie < 30) {
                        alertaContestatie = true;
                      }

                      let textRamasContestatie = "";

                      const aniTimpRamasContestatie = Math.floor(
                        timpRamasContestatie / 360
                      );
                      const restZileContestatie = timpRamasContestatie % 360;
                      const luniRamasContestatie = Math.floor(
                        restZileContestatie / 30
                      );
                      const zileRamaseContestatie = restZileContestatie % 30;

                      if (aniTimpRamasContestatie !== 0) {
                        textRamasContestatie +=
                          aniTimpRamasContestatie + " ani ";
                      }

                      if (luniRamasContestatie !== 0) {
                        textRamasContestatie += luniRamasContestatie + " luni ";
                      }

                      if (zileRamaseContestatie !== 0) {
                        textRamasContestatie += zileRamaseContestatie + " zile";
                      }

                      return (
                        <li key={dosar.id} className={classes.item}>
                          <Link to={`/dosare/${dosar.id}`}>
                            <div className={classes.content}>
                              <h3>
                                {dosar.numar} - {dosar.numeProcuror}
                                <br />
                                {dosar.numar_fost}
                              </h3>
                              <time>
                                termen: {dosar.termen_contestatie.split("T")[0]}
                              </time>{" "}
                              <div>
                                <time
                                  style={{
                                    // backgroundColor: alertaContestatie
                                    //   ? "red"
                                    //   : "",
                                    backgroundColor: colorContestatie
                                  }}
                                >
                                  {dosar.termen_contestatie &&
                                    `${text_inainte_contestatie} ${textRamasContestatie} ${text_dupa_contestatie}`}
                                </time>
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    } else if (
                      dosar &&
                      dosarCautat &&
                      (dosar.numar
                        .toLowerCase()
                        .includes(dosarCautat.toLowerCase()) ||
                        dosar.numeProcuror
                          .toLowerCase()
                          .includes(dosarCautat.toLowerCase()) ||
                        dosar.numar_fost.includes(dosarCautat))
                    ) {
                      let alertaContestatie = false;
                      let timpRamasContestatie;
                      let text_inainte_contestatie = "mai sunt ";
                      let text_dupa_contestatie = " pana la termen";
                      if (
                        new Date(dosar.termen_contestatie).getTime() > dateNow
                      ) {
                        timpRamasContestatie = Math.floor(
                          (new Date(dosar.termen_contestatie).getTime() -
                            dateNow) /
                          (1000 * 3600 * 24)
                        );
                      }

                      if (
                        new Date(dosar.termen_contestatie).getTime() < dateNow
                      ) {
                        alertaContestatie = true;
                        text_inainte_contestatie = "au trecut ";
                        text_dupa_contestatie = " de la termen";
                        timpRamasContestatie = Math.floor(
                          (dateNow -
                            new Date(dosar.termen_contestatie).getTime()) /
                          (1000 * 3600 * 24)
                        );
                      }

                      let colorContestatie = "green";

                      if (timpRamasContestatie < 90) {
                        colorContestatie = "orange"
                      } else if (timpRamasContestatie > 90) {
                        colorContestatie = "green"
                      }


                      if (alertaContestatie) {
                        colorContestatie = "red";
                      }

                      if (timpRamasContestatie < 30) {
                        alertaContestatie = true;
                      }

                      let textRamasContestatie = "";

                      const aniTimpRamasContestatie = Math.floor(
                        timpRamasContestatie / 360
                      );
                      const restZileContestatie = timpRamasContestatie % 360;
                      const luniRamasContestatie = Math.floor(
                        restZileContestatie / 30
                      );
                      const zileRamaseContestatie = restZileContestatie % 30;

                      if (aniTimpRamasContestatie !== 0) {
                        textRamasContestatie +=
                          aniTimpRamasContestatie + " ani ";
                      }

                      if (luniRamasContestatie !== 0) {
                        textRamasContestatie += luniRamasContestatie + " luni ";
                      }

                      if (zileRamaseContestatie !== 0) {
                        textRamasContestatie += zileRamaseContestatie + " zile";
                      }
                      return (
                        <li key={dosar.id} className={classes.item}>
                          <Link to={`/dosare/${dosar.id}`}>
                            <div className={classes.content}>
                              <h2>
                                {dosar.numar} - {dosar.numeProcuror}
                                <br />
                                {dosar.numar_fost}
                              </h2>
                              <time>
                                termen: {dosar.termen_contestatie.split("T")[0]}
                              </time>{" "}
                              <div>
                                <time
                                  style={{
                                    backgroundColor: colorContestatie,
                                  }}
                                >
                                  {dosar.termen_contestatie &&
                                    `${text_inainte_contestatie} ${textRamasContestatie} ${text_dupa_contestatie}`}
                                </time>
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    }
                  }
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DosareList;
