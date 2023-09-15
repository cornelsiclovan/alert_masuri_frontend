import { Form, Link } from "react-router-dom";
import classes from "./DosareList.module.css";
import { useEffect, useState } from "react";
import ProcurorList from "./ProcurorList";

const DosareList = ({ dosare, isAc }) => {
  const [cuMasuriAsiguratorii, setCuMasuriAsiguratorii] = useState(true);
  const [dateNow, setDate] = useState(Date.now());
  const changeCuMasuriAsiguratorii = () => {
    setCuMasuriAsiguratorii(true);
  };
  const [isArest, setIsArest] = useState(false);
  const [isCj, setIsCj] = useState(false);
  const [isSechestru, setIsSechestru] = useState(false);
  const [isInterceptari, setIsInterceptari] = useState(false);

  const [dosareCuAc, setDosareCuAc] = useState(false);

  const [dosarCautat, setDosarCautat] = useState(null);

  const [dosareCuMasuri, setDosareCuMasuri] = useState(dosare);

  let dosareSortate;

  let i = 0;

  let procurori = [];

  let dosareFilterFaraMasuri = [];
  let dosareFilterCuSechestru = [];

  let dosareMaiVechiDeSaseLuni = [];
  let dosareFilterCuMasuri = [];

  if (isAc) {
    dosareFilterFaraMasuri = dosare;
  }

  if (!isAc) {
    dosareFilterCuSechestru = dosare.filter(
      (dosar) => dosar.isSechestru === true
    );
    dosareFilterFaraMasuri = dosare.filter(
      (dosar) => dosar.days_remaining === null
    );
    dosareFilterCuMasuri = dosare.filter(
      (dosar) => dosar.days_remaining !== null && dosar.isSechestru !== true
    );
    dosareMaiVechiDeSaseLuni = dosare.filter(
      (dosar) =>
        ((new Date(dosar.data).getTime() - new Date()) / (1000 * 3600 * 24)) *
          -1 >
        180
    );
  }

  const [numarDosare, setNumarDosare] = useState(dosareFilterFaraMasuri.length);

  const [dosSaseLuni, setDosSaseLuni] = useState(
    dosareMaiVechiDeSaseLuni.length
  );

  const handleCheck = (event) => {};

  const onChangeDosarInput = (event) => {
    setDosarCautat(event.target.value);
    dosareFilterFaraMasuri = dosareFilterFaraMasuri.filter(
      (dosar) =>
        dosar.numeProcuror
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        dosar.numar.includes(event.target.value)
    );
    setNumarDosare(dosareFilterFaraMasuri.length);
    const dosareMaiVechiDeSaseLuni = dosareFilterFaraMasuri.filter(
      (dosar) =>
        ((new Date(dosar.data).getTime() - new Date()) / (1000 * 3600 * 24)) *
          -1 >
        180
    );
    setDosSaseLuni(dosareMaiVechiDeSaseLuni.length);
  };

  //console.log(dosare);

  return (
    <>
      <div className={classes.group}>
        <div className={classes.items}>
          <div style={{ display: "flex" }}>
            <div>
              {!isAc && <h1> Dosare intrate({numarDosare}) </h1>}
              {isAc && (
                <h1 style={{ width: "400px" }}>
                  {" "}
                  Dosare cu AC({numarDosare}){" "}
                </h1>
              )}
              {!isAc && <>- Mai vechi de 6 luni ({dosSaseLuni})</>}
            </div>
            <input
              style={{
                height: "30px",
                marginTop: "20px",
                marginLeft: "50px",
                width: "260px",
              }}
              type="text"
              placeholder="Numar de dosar / Nume procuror"
              onChange={onChangeDosarInput}
            ></input>
          </div>
          {/* {cuMasuriAsiguratorii && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <li style={{ listStyle: "none" }}> Sorteaza dupa: </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="este_solutionat" style={{ width: "10%" }}>
                {" "}
                Arest{" "}
              </label>
              <input
                type="checkbox"
                id="arest"
                name="arest"
                value={isArest}
                checked={isArest}
                onChange={handleCheck}
              />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="este_solutionat" style={{ width: "10%" }}>
                {" "}
                Control judiciar{" "}
              </label>
              <input
                type="checkbox"
                id="cj"
                name="cj"
                value={isCj}
                checked={isCj}
                onChange={handleCheck}
              />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="este_solutionat" style={{ width: "10%" }}>
                {" "}
                Sechestru{" "}
              </label>
              <input
                type="checkbox"
                id="sechestru"
                name="sechestru"
                value={isSechestru}
                checked={isSechestru}
                onChange={handleCheck}
              />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="este_solutionat" style={{ width: "10%" }}>
                {" "}
                Interceptari{" "}
              </label>
              <input
                type="checkbox"
                id="interceptari"
                name="interceptari"
                value={isInterceptari}
                checked={isInterceptari}
                onChange={handleCheck}
              />
            </li>
          </div>
        )} */}
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
                (new Date(dosar.data_sechestru).getTime() - dateNow) /
                  (1000 * 3600 * 24)
              );
              const timpRamasInterceptari = Math.floor(
                (new Date(dosar.data_interceptari).getTime() - dateNow) /
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

              // if (dosarCautat) {
              //   console.log("dosarCautat", dosarCautat);
              // }

              if (dosarCautat === null || dosarCautat === "") {
                return (
                  <li key={dosar.id} className={classes.item}>
                    <Link to={`/dosare/${dosar.id}`}>
                      <div className={classes.content}>
                        <h1>
                          {dosar.numar} - <small>{dosar.numeProcuror}</small>
                        </h1>
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
                            {dosar.data_inceperii_la_procuror.split("T")[0]}
                          </p>
                        )}
                        {dosar && dosar.este_solutionat === 1 && (
                          <p>
                            Solutie finala: <b>{dosar.tip_solutie}</b>
                          </p>
                        )}
                        <p
                          style={{
                            backgroundColor: alertaIntrate ? "red" : "",
                          }}
                        >
                          {!isAc &&
                            dosar.data &&
                            `Intrare: ${
                              dosar.data.split("T")[0]
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
                    .includes(dosarCautat.toLowerCase()))
              ) {
                return (
                  <li key={dosar.id} className={classes.item}>
                    <Link to={`/dosare/${dosar.id}`}>
                      <div className={classes.content}>
                        <h1>
                          {dosar.numar} - <small>{dosar.numeProcuror}</small>
                        </h1>
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
                            {dosar.data_inceperii_la_procuror.split("T")[0]}
                          </p>
                        )}
                        {dosar && dosar.este_solutionat === 1 && (
                          <p>
                            Solutie finala: <b>{dosar.tip_solutie}</b>
                          </p>
                        )}
                        <p
                          style={{
                            backgroundColor: alertaIntrate ? "red" : "",
                          }}
                        >
                          {!isAc &&
                            dosar.data &&
                            `Intrare: ${
                              dosar.data.split("T")[0]
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
          {dosareFilterCuMasuri.length !== 0 && <h1> Dosare cu masuri </h1>}
          <ul>
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
                    (new Date(dosar.data_sechestru).getTime() - dateNow) /
                      (1000 * 3600 * 24)
                  );
                  const timpRamasInterceptari = Math.floor(
                    (new Date(dosar.data_interceptari).getTime() - dateNow) /
                      (1000 * 3600 * 24)
                  );

                  const alertaArest = timpRamasArest <= 15 ? true : false;
                  const alertaSechestru =
                    timpRamasSechestru <= 30 ? true : false;
                  const alertaCj =
                    parseInt(dosar.days_remaining) <= 15 ? true : false;
                  const alertaInterceptari =
                    timpRamasInterceptari <= 15 ? true : false;

                  if (dosarCautat === null || dosarCautat === "") {
                    return (
                      <li key={dosar.id} className={classes.item}>
                        <Link to={`/dosare/${dosar.id}`}>
                          <div className={classes.content}>
                            <h1>
                              {dosar.numar} - {dosar.numeProcuror}
                            </h1>
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
                              style={{ backgroundColor: alertaCj ? "red" : "" }}
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
                        .includes(dosarCautat.toLowerCase()))
                  ) {
                    return (
                      <li key={dosar.id} className={classes.item}>
                        <Link to={`/dosare/${dosar.id}`}>
                          <div className={classes.content}>
                            <h1>
                              {dosar.numar} - {dosar.numeProcuror}
                            </h1>
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
                              style={{ backgroundColor: alertaCj ? "red" : "" }}
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
              <h1> Dosare cu sechestru </h1>
              <ul>
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
                        (new Date(dosar.data_sechestru).getTime() - dateNow) /
                          (1000 * 3600 * 24)
                      );
                      const timpRamasInterceptari = Math.floor(
                        (new Date(dosar.data_interceptari).getTime() -
                          dateNow) /
                          (1000 * 3600 * 24)
                      );

                      const aniTimpRamasSechestru = Math.floor(
                        dosar.days_remaining / 360
                      );
                      const restZileSech = dosar.days_remaining % 360;
                      const luniRamasSechestru = Math.floor(restZileSech / 30);
                      const zileRamaseSechestru = restZileSech % 30;

                      const alertaArest = timpRamasArest <= 15 ? true : false;
                      const alertaSechestru =
                        parseInt(dosar.days_remaining) > 150 ? true : false;
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

                      if (dosarCautat === null || dosarCautat === "") {
                        return (
                          <li key={dosar.id} className={classes.item}>
                            <Link to={`/dosare/${dosar.id}`}>
                              <div className={classes.content}>
                                <h1>
                                  {dosar.numar} - {dosar.numeProcuror}
                                </h1>
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
                                    backgroundColor: alertaSechestru
                                      ? "red"
                                      : "",
                                  }}
                                >
                                  {dosar.days_remaining &&
                                    `de la insituire/mentinere au trecut ${timpRamasSechestru} zile`}
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
                            .includes(dosarCautat.toLowerCase()))
                      ) {
                        return (
                          <li key={dosar.id} className={classes.item}>
                            <Link to={`/dosare/${dosar.id}`}>
                              <div className={classes.content}>
                                <h1>
                                  {dosar.numar} - {dosar.numeProcuror}
                                </h1>
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
                                    backgroundColor: alertaSechestru
                                      ? "red"
                                      : "",
                                  }}
                                >
                                  {dosar.days_remaining &&
                                    `de la insituire/mentinere au trecut ${dosar.days_remaining} zile`}
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
      </div>
    </>
  );
};

export default DosareList;
