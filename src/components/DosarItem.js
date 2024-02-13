import { Link, useSubmit } from "react-router-dom";

import classes from "./DosarItem.module.css";
import { useState } from "react";

const DosarItem = ({ dosar, isAc }) => {
  const submit = useSubmit();
  const [dateNow, setDate] = useState(Date.now());

  const startDeleteHandler = () => {
    const proceed = window.confirm("Sunteti sigur?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  };

  const timpRamasArest = Math.floor(
    (new Date(dosar.data_arest).getTime() - dateNow) / (1000 * 3600 * 24)
  );
  const timpRamasCj = Math.floor(
    (new Date(dosar.data_cj).getTime() - dateNow) / (1000 * 3600 * 24)
  );
  const timpRamasSechestru = Math.floor(
    (new Date(dosar.data_sechestru).getTime() - dateNow) / (1000 * 3600 * 24)
  );
  const timpRamasInterceptari = Math.floor(
    (new Date(dosar.data_interceptari).getTime() - dateNow) / (1000 * 3600 * 24)
  );

  const timpRamasIntrate = Math.floor(
    ((new Date(dosar.data).getTime() - dateNow) / (1000 * 3600 * 24)) * -1
  );

  const alertaArest = timpRamasArest <= 15 ? true : false;
  const alertaSechestru = timpRamasSechestru <= 30 ? true : false;
  const alertaCj = timpRamasCj <= 15 ? true : false;
  const alertaInterceptari = timpRamasInterceptari <= 15 ? true : false;
  const alertaIntrate = timpRamasIntrate >= 90 ? true : false;

  console.log(dosar);

  return (
    <article
      className={classes.dosar}
      style={{ backgroundColor: "darkgrey", borderRadius: "10px" }}
    >
      <div style={{ padding: "10px" }}>
        <h1>
          {dosar.numar} - {dosar.numeProcuror}
        </h1>
        <table border={1} width={"100%"}>
          <th>Data primei sesizari</th>
          <th>Institutia la care se afla dosarul</th>

          <tr>
            <td>{dosar.data_primei_sesizari.split("T")[0]}</td>
            {dosar.institutia_curenta && <td>{dosar.institutia_curenta}</td>}
            {!dosar.institutia_curenta && <td>Intrat</td>}
          </tr>
        </table>
        <table border={1} width={"100%"}>
          <th>Fapte in dosar</th>
          <th>Persoane Vatamate</th>
          <tr>
            <td>
              {dosar &&
                dosar.fapta &&
                dosar.fapta.map((f) => {
                  return (
                    <tr align={"left"} border={1}>
                      {" "}
                      {f.nume_infractiune}
                    </tr>
                  );
                })}
            </td>
            <td>
              {dosar &&
                dosar.parte &&
                dosar.parte.map((p, index) => {
                  let numeString = "";
                  if (p.ordine === "2") {
                    numeString = numeString + p.nume;
                  }
                  if (
                    dosar.parte.length > 0 &&
                    index + 1 < dosar.parte.length &&
                    p.ordine === "2" &&
                    numeString !== ""
                  ) {
                    numeString = numeString + ", ";
                  }
                  return numeString;
                })}
            </td>
          </tr>
        </table>
        <table border={1} width={"100%"}>
          <th>Autori</th>
          <th>Cnp</th>
          <th>Calitate</th>
          {dosar &&
            dosar.parte &&
            dosar.parte.map((p, index) => {
              let numeString = "";
              if (p.ordine === "1") {
                numeString = numeString + p.nume;
              }
              if (
                dosar.parte.length > 0 &&
                index + 1 < dosar.parte.length &&
                p.ordine === "2" &&
                numeString !== ""
              ) {
                numeString = numeString + ", ";
              }
              if (p.ordine === "1")
                return (
                  <tr>
                    <td>{numeString}</td>
                    <td>{p.cnp}</td>
                    <td>{p.calitate}</td>
                  </tr>
                );
              else return;
            })}
        </table>
        <table border={1} width={"100%"}>
          <th>Starea de fapt</th>

          <tr>
            <td>{dosar && dosar.fapta && dosar.fapta.length > 0 && dosar.fapta[0].situatie}</td>
          </tr>
        </table>
        {!isAc &&
          !dosar.isControlJudiciar &&
          !dosar.isSechestru &&
          !dosar.isArest &&
          dosar.admitere_contestatie != 1 && (
            <p>
              Solutie propusa: <b>{dosar.tip_solutie_propusa}</b>
            </p>
          )}
        {dosar && dosar.este_solutionat === 1 && (
          <p>
            Solutie finala: <b>{dosar.tip_solutie}</b>
          </p>
        )}
        <p style={{ backgroundColor: alertaIntrate ? "red" : "" }}>
          {dosar.data &&
            `Intrare: ${dosar.data.split("T")[0]}, au trecut ${timpRamasIntrate} zile de la intrare`}
        </p>
        <p style={{ backgroundColor: alertaArest ? "red" : "" }}>
          {dosar.data_arest &&
            `arest: ${dosar.data_arest}, mai sunt ${timpRamasArest} zile pana la expirarea masurii`}{" "}
        </p>
        <p style={{ backgroundColor: alertaSechestru ? "red" : "" }}>
          {dosar.data_sechestru &&
            `sechestru: ${dosar.data_sechestru}, mai sunt ${timpRamasSechestru} zile pana la expirarea masurii`}
        </p>
        <p style={{ backgroundColor: alertaCj ? "red" : "" }}>
          {dosar.data_cj &&
            `control judiciar: ${dosar.data_cj}, mai sunt ${timpRamasCj} zile pana la expirarea masurii`}
        </p>
        <p style={{ backgroundColor: alertaInterceptari ? "red" : "" }}>
          {dosar.data_interceptari &&
            `interceptari: ${dosar.data_interceptari}, mai sunt ${timpRamasInterceptari} zile pana la expirarea masurii`}
        </p>
        {!isAc &&
          !dosar.isControlJudiciar &&
          !dosar.isSechestru &&
          !dosar.isArest &&
          dosar.admitere_contestatie != 1 && (
            <menu className={classes.actions}>
              <Link
                style={{ color: "lightcoral", backgroundColor: "white" }}
                to="edit"
              >
                Soluționare
              </Link>
            </menu>
          )}
      </div>
    </article>
  );
};

export default DosarItem;
