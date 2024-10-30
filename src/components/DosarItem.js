import { Link, json, redirect, useSubmit } from "react-router-dom";

import classes from "./DosarItem.module.css";
import { useState } from "react";
import { getAuthToken } from "../util/auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const DosarItem = ({ dosar, isAc }) => {
  const submit = useSubmit();
  const [dateNow, setDate] = useState(Date.now());
  const [vreauAdresa, setVreauAdresa] = useState(false);

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

  const genereazaAdresa = async (tip_document) => {

    let url = BASE_URL + "/genereaza-documente/adresa";
    let urlFile = BASE_URL + "/file";




    let nume_parte_vatamata = "";
    let nume_invinuit = "";

    let numeString = "";
    {
      dosar &&
        dosar.parte &&
        dosar.parte.map((p, index) => {
          console.log("index")
          
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
          nume_parte_vatamata = numeString;
        })
    }

    console.log(nume_parte_vatamata);
    numeString = "";
    {
      dosar &&
        dosar.parte &&
        dosar.parte.map((p, index) => {
          if (p.ordine === "1") {
            numeString = numeString + p.nume;
          }
          if (
            dosar.parte.length > 0 &&
            index + 1 < dosar.parte.length &&
            p.ordine === "1" &&
            numeString !== ""
          ) {
            numeString = numeString + ", ";
          }

          nume_invinuit = numeString;
        })
    }

    let nume_infractiune = ""
    let separator = "";

    {
      dosar &&
        dosar.fapta &&
        dosar.fapta.map((f) => {
          console.log(f.nume_temei);

          if(nume_infractiune != "") {
            separator = ", "
          }

          nume_infractiune = nume_infractiune + separator + f.nume_temei;

        })
    }

    const document_data = {
      nume_procuror: dosar.numeProcuror,
      numar_dosar: dosar.numar,
      autorul_faptei: nume_invinuit,
      infractiune: nume_infractiune,
      tip_adresa: tip_document,
      parte_vatamata: nume_parte_vatamata
    };

    const token = getAuthToken();

    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(document_data),
    });

    if (response.status === 422) {
      return response;
    }

    if (!response.ok) {
      throw json(
        { message: "Nu am putut salva adresa!" },
        { status: response.status }
      );
    }

    let numarDosarFormatat =
    dosar.numar.split("/")[0] +
    "-" +
    dosar.numar.split("/")[1] +
    "-" +
    dosar.numar.split("/")[2] +
    "-" + 
    dosar.numar.split("/")[3]

    if (response.status === 200) {
      const responseFileRequest = await fetch(
        urlFile + "/" + numarDosarFormatat,
        {
          method: "get",
          headers: {
            "Content-Type": "Application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      responseFileRequest.blob().then((file) => {
        const newFile = new File([file], "test.docx", {
          type: "application/docx",
        });

        numarDosarFormatat = "adresa " + numarDosarFormatat
  
        saveAs(newFile, numarDosarFormatat + ".docx");
      });
      const myFileData = await response.json();
      const myFileName = myFileData.filename;
      //saveAs(responseFileRequest, _);
    }
    return redirect("/");
  }

  const genAdrSiceComplex = () => {
    console.log("sice complex")
    genereazaAdresa("sice_complex");


  }

  const genAdrSiceSimplu = () => {
    console.log("sice simplu")
    genereazaAdresa("sice_simplu");
  }

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
            <td>
              {dosar &&
                dosar.fapta &&
                dosar.fapta.length > 0 &&
                dosar.fapta[0].situatie}
            </td>
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
        {!isAc && (
          <p style={{ backgroundColor: alertaIntrate ? "red" : "" }}>
            {dosar.data &&
              `Intrare: ${dosar.data.split("T")[0]
              }, au trecut ${timpRamasIntrate} zile de la intrare`}
          </p>
        )}
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
            <>
              <menu className={classes.actions}>
                <Link
                  style={{ color: "lightcoral", backgroundColor: "white" }}
                  to="edit"
                >
                  Soluționare
                </Link>
                <button style={{ backgroundColor: "black" }} onClick={() => setVreauAdresa(!vreauAdresa)}>Adresa</button>
              </menu>
              {vreauAdresa && <menu className={classes.actions}>
                <button style={{ backgroundColor: "black" }} onClick={genAdrSiceSimplu}>sice simplu</button>
                <button style={{ backgroundColor: "black" }} onClick={genAdrSiceComplex}>sice complex</button>
              </menu>}
            </>
          )}
      </div>
    </article>
  );
};

export default DosarItem;
