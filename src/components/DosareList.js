import { Form, Link } from "react-router-dom";
import classes from "./DosareList.module.css";
import { useEffect, useState } from "react";

const DosareList = ({ dosare }) => {
  const [cuMasuriAsiguratorii, setCuMasuriAsiguratorii] = useState(false);
  const [dateNow, setDate] = useState(Date.now());
  const changeCuMasuriAsiguratorii = () => {
    setCuMasuriAsiguratorii(!cuMasuriAsiguratorii);
  };
  const [isArest, setIsArest] = useState(false);
  const [isCj, setIsCj] = useState(false);
  const [isSechestru, setIsSechestru] = useState(false);
  const [isInterceptari, setIsInterceptari] = useState(false);

  const [dosarCautat, setDosarCautat] = useState(null);

  const [dosareCuMasuri, setDosareCuMasuri] = useState(dosare);
  let dosareSortate;

  const handleCheck = (event) => {
    if (event.target.id === "arest") {
      if (!isArest) {
        let filteredDos = dosare.filter((dosar) => dosar.data_arest !== null);

        dosareSortate = filteredDos.sort((a, b) =>
          new Date(a.data_arest).getTime() > new Date(b.data_arest).getTime()
            ? 1
            : -1
        );
      } else {
        dosareSortate = dosare.sort((a, b) =>
          new Date(a.data).getTime() > new Date(b.data).getTime() ? 1 : -1
        );
      }
      if (!isArest) {
        setIsCj(false);
        setIsSechestru(false);
        setIsInterceptari(false);
      }

      setIsArest(!isArest);
    }

    if (event.target.id === "sechestru") {
      if (!isSechestru) {
        let filteredDos = dosare.filter(
          (dosar) => dosar.data_sechestru !== null
        );

        dosareSortate = filteredDos.sort((a, b) =>
          new Date(a.data_sechestru).getTime() >
          new Date(b.data_sechestru).getTime()
            ? 1
            : -1
        );
      } else {
        dosareSortate = dosare.sort((a, b) =>
          new Date(a.data).getTime() > new Date(b.data).getTime() ? 1 : -1
        );
      }
      if (!isSechestru) {
        setIsArest(false);
        setIsCj(false);
        setIsInterceptari(false);
      }

      setIsSechestru(!isSechestru);
    }

    if (event.target.id === "cj") {
      if (!isCj) {
        let filteredDos = dosare.filter((dosar) => dosar.data_cj !== null);

        dosareSortate = filteredDos.sort((a, b) =>
          new Date(a.data_cj).getTime() > new Date(b.data_cj).getTime() ? 1 : -1
        );
      } else {
        dosareSortate = dosare.sort((a, b) =>
          new Date(a.data).getTime() > new Date(b.data).getTime() ? 1 : -1
        );
      }
      if (!isCj) {
        setIsArest(false);
        setIsSechestru(false);
        setIsInterceptari(false);
      }

      setIsCj(!isCj);
    }

    if (event.target.id === "interceptari") {
      if (!isInterceptari) {
        let filteredDos = dosare.filter(
          (dosar) => dosar.data_interceptari !== null
        );

        dosareSortate = filteredDos.sort((a, b) =>
          new Date(a.data_interceptari).getTime() >
          new Date(b.data_interceptari).getTime()
            ? 1
            : -1
        );
      } else {
        dosareSortate = dosare.sort((a, b) =>
          new Date(a.data).getTime() > new Date(b.data).getTime() ? 1 : -1
        );
      }
      if (!isCj) {
        setIsArest(false);
        setIsSechestru(false);
        setIsCj(false);
      }

      setIsInterceptari(!isInterceptari);
    }

    setDosareCuMasuri(dosareSortate);
  };

  const onChangeDosarInput = (event) => {
    setDosarCautat(event.target.value);
  };

  return (
    <>
      <div className={classes.items}>
        <div style={{ display: "flex" }}>
          {cuMasuriAsiguratorii && <h1> Dosarele cu masuri </h1>}
          {!cuMasuriAsiguratorii && <h1> Toate dosarele </h1>}
          {!cuMasuriAsiguratorii && (
            <div
              style={{
                width: "50%",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                style={{
                  backgroundColor: "white",
                  color: "darkorange",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={changeCuMasuriAsiguratorii}
              >
                Cu masuri{" "}
              </button>{" "}
            </div>
          )}
          {cuMasuriAsiguratorii && (
            <div
              style={{
                width: "40%",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                style={{
                  backgroundColor: "white",
                  color: "darkorange",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={changeCuMasuriAsiguratorii}
              >
                Toate{" "}
              </button>{" "}
            </div>
          )}

          <input
            style={{ height: "30px", marginTop: "30px" }}
            type="text"
            placeholder="Numar de dosar"
            onChange={onChangeDosarInput}
          ></input>
        </div>
        {cuMasuriAsiguratorii && (
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
        )}
        <br />
        <ul className={classes.list}>
          {!cuMasuriAsiguratorii &&
            dosare.map((dosar) => {
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

              const timpRamasIntrate = Math.floor(
                ((new Date(dosar.data).getTime() - dateNow) /
                  (1000 * 3600 * 24)) *
                  -1
              );

              const alertaArest = timpRamasArest <= 15 ? true : false;
              const alertaSechestru = timpRamasSechestru <= 30 ? true : false;
              const alertaCj = timpRamasCj <= 15 ? true : false;
              const alertaInterceptari =
                timpRamasInterceptari <= 15 ? true : false;
              const alertaIntrate = timpRamasIntrate >= 90 ? true : false;

              if (dosarCautat) {
                console.log("dosarCautat", dosarCautat);
              }

              if (dosarCautat === null || dosarCautat === "") {
                return (
                  <li key={dosar.id} className={classes.item}>
                    <Link to={`/dosare/${dosar.id}`}>
                      <div className={classes.content}>
                        <h1>
                          {dosar.numar} - <small>{dosar.numeProcuror}</small>
                        </h1>
                        <p>
                          Solutie propusa: <b>{dosar.tip_solutie_propusa}</b>
                        </p>
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
                          {dosar.data &&
                            `Intrare: ${dosar.data}, au trecut ${timpRamasIntrate} zile de la intrare`}
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
                          {dosar.data_cj &&
                            `control judiciar: ${dosar.data_cj}, mai sunt ${timpRamasCj} zile pana la expirarea masurii`}
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
                dosar.numar.toLowerCase().includes(dosarCautat.toLowerCase())
              ) {
                return (
                  <li key={dosar.id} className={classes.item}>
                    <Link to={`/dosare/${dosar.id}`}>
                      <div className={classes.content}>
                        <h1>
                          {dosar.numar} - <small>{dosar.numeProcuror}</small>
                        </h1>
                        <time>intrare: {dosar.data}</time> <br />
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
                          {dosar.data_cj &&
                            `control judiciar: ${dosar.data_cj}, mai sunt ${timpRamasCj} zile pana la expirarea masurii`}
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
          {cuMasuriAsiguratorii &&
            dosareCuMasuri.map((dosar) => {
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
                const alertaSechestru = timpRamasSechestru <= 30 ? true : false;
                const alertaCj = timpRamasCj <= 15 ? true : false;
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
                          <time>intrare: {dosar.data}</time> <br />
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
                            {dosar.data_cj &&
                              `control judiciar: ${dosar.data_cj}, mai sunt ${timpRamasCj} zile pana la expirarea masurii`}
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
                  dosar.numar.toLowerCase().includes(dosarCautat.toLowerCase())
                ) {
                  return (
                    <li key={dosar.id} className={classes.item}>
                      <Link to={`/dosare/${dosar.id}`}>
                        <div className={classes.content}>
                          <h1>
                            {dosar.numar} - {dosar.numeProcuror}
                          </h1>
                          <time>intrare: {dosar.data}</time> <br />
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
                            {dosar.data_cj &&
                              `control judiciar: ${dosar.data_cj}, mai sunt ${timpRamasCj} zile pana la expirarea masurii`}
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
              }
            })}
        </ul>
      </div>
    </>
  );
};

export default DosareList;
