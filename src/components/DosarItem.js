import { Link, json, redirect, useSubmit } from "react-router-dom";


import classes from "./DosarItem.module.css";
import { useEffect, useState } from "react";
import { getAuthToken } from "../util/auth";


const BASE_URL = process.env.REACT_APP_BASE_URL;

const DosarItem = ({ dosar, isAc, isAn }) => {
  const submit = useSubmit();
  const [dateNow, setDate] = useState(Date.now());
  const [vreauAdresa, setVreauAdresa] = useState(false);
  const [indrumatorForm, setIndrumatorForm] = useState(false);
  const [activitatiToShow, setActivitatiToShow] = useState([]);
  const [timeNotaDeIndrumare, setTimeNotaDeIndrumare] = useState();
  const [notaDeIndrumare, setNotaDeIndrumare] = useState();
  const [notaTypeSelected, setNotaTypeSelected] = useState();
  const [notaSelected, setNotaSelected] = useState();
  const [taskTypes, setTaskTypes] = useState();
  const [runOnStart, setRunOnStart] = useState(true);
  const [taskOptions, setTasksOptions] = useState();
  const [taskSelected, setTaskSelected] = useState();
  const [notaTask, setNotaTask] = useState();
  const [tasks, setTasks] = useState();
  const [taskStatusModification, setTaskStatusModification] = useState(1);
  const [indrumatoarePeDosar, setIndrumatoarePeDosar] = useState();

  const [showActivitateForm, setShowActivitateForm] = useState(false);

  let activitati = [];

  console.log(isAn);

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



  useEffect(() => {
    const fetchIndrumator = async () => {
      
      let url = BASE_URL + `/indrumator/${dosar.id_dosar}`;
      let token = getAuthToken();
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });


      let resData = await response.json();

      if (Object.keys(resData).length === 0) {

        setNotaDeIndrumare(null);
      }

      if (resData.message === 'error') {

        document.getElementById("dataIndrumare").value = null;
        setNotaDeIndrumare();
      } else {
        console.log(resData);
        setNotaDeIndrumare(resData);
      }

    }

    const fetchIndrumatoarePentruDosar = async () => {
      let url = BASE_URL + `/indrumator/dosar/${dosar.id_dosar}`;
      let token = getAuthToken();
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      let resData = await response.json();
      console.log(resData)
      setIndrumatoarePeDosar(resData);
    }

    const fetchTaskTypes = async () => {
      let url = BASE_URL + "/type";
      let token = getAuthToken();
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });

      let resData = await response.json();

      setTaskTypes(resData);
    }

    const fetchTasks = async () => {

      let url = BASE_URL + `/task?typeId=${notaTypeSelected}`;
      let token = getAuthToken();
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const resData = await response.json();
      setTasksOptions(resData);
    }

    
    fetchIndrumator();
    fetchTaskTypes();
    fetchIndrumatoarePentruDosar();

    if (notaTypeSelected) {
      fetchTasks();
    }


  }, [notaTypeSelected, dosar, taskStatusModification])


  const addActivitate = async () => {
    const token = getAuthToken();
    let url = BASE_URL + `/indrumator/${notaDeIndrumare.id}/task`;

    if (!notaDeIndrumare.termen) { alert("Va rugam selectati un termen inainte") }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        id_task: taskSelected,
        nota: notaTask || "",
      }),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    setNotaTypeSelected();
    setTaskSelected();
    document.getElementById("taskTypeSelect").selectedIndex = 0;


    // let activitate = {
    //   id_dosar: id_dosar,
    // }
    // activitati = activitatiToShow;

    // activitati.push(activitate);
    // setActivitatiToShow([...activitati])
  }

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

          if (nume_infractiune != "") {
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

    genereazaAdresa("sice_complex");


  }

  const genAdrSiceSimplu = () => {

    genereazaAdresa("sice_simplu");
  }

  const finalizeazaNotaIndrumare = async () => {

    const token = getAuthToken();
    const url = BASE_URL + `/indrumator/finalizeaza/${notaDeIndrumare.id}`
    let response = await fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + token,
      }
    });
    const resData = await response.json();
    
    document.getElementById("dataIndrumare").value = null;
    setNotaDeIndrumare();
    setIndrumatoarePeDosar(resData);
    
  }

  const genereazaNotaIndrumare = async () => {
    const token = getAuthToken();
    const url = BASE_URL + `/genereaza-documente/note_indrumare`;
    let urlFile = BASE_URL + "/file";


    let response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        nume_procuror: dosar.numeProcuror,
        numar_dosar: dosar.numar,
        termen: notaDeIndrumare.termen,
        notaDeIndrumare: notaDeIndrumare
      })
    })

    let numarDosarFormatat =
      dosar.numar.split("/")[0] +
      "-" +
      dosar.numar.split("/")[1] +
      "-" +
      dosar.numar.split("/")[2] +
      "-" +
      dosar.numar.split("/")[3]

    if (response.status === 200) {
      await fetch(BASE_URL + "/stats?operation=nota_indrumare", {
        method: "POST",
        headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + token,
      },
        body: JSON.stringify({})
      })
      
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

        numarDosarFormatat = "indrumator " + numarDosarFormatat

        saveAs(newFile, numarDosarFormatat + ".docx");
      });
      const myFileData = await response.json();
      const myFileName = myFileData.filename;
      //saveAs(responseFileRequest, _);
    }
    return redirect("/");
  }

  const onTimeSelect = async (event) => {
    let url = BASE_URL + "/indrumator";
    let token = getAuthToken();

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        id_dosar: dosar.id_dosar,
        termen: event.target.value
      }),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    setTaskStatusModification(taskStatusModification + 1)
  }

  if (notaDeIndrumare !== null && notaDeIndrumare !== "undefined" && notaDeIndrumare !== undefined) {


    document.getElementById("dataIndrumare").value = notaDeIndrumare.termen;
  }

  const changeActivitateStatus = async (id_activitate, status) => {
    const token = getAuthToken();

    if (status === 0) {
      status = 1
    } else if (status === 1) {
      status = 0
    }

    console.log(status, id_activitate)
    const url = BASE_URL + `/indrumator/${id_activitate}`;
    const response = await fetch(url, {
      method: "put",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: status })
    })

    setTaskStatusModification(taskStatusModification + 1)
  }

  const onDeleteTaskAction = async (id) => {
    const token = getAuthToken();
    const url = BASE_URL + `/indrumator/${id}`;

    const response = await fetch(url, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + token,
      }
    });

    setTaskStatusModification(taskStatusModification + 1);
  }

  const handleChangeNota = async (id_nota) => {
    const token = getAuthToken();
    const url =  BASE_URL + `/indrumator/refacere_nota_finalizata/${id_nota}`
    let response = await fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + token,
      }
    });
    
    setTaskStatusModification(taskStatusModification + 1);
    document.getElementById("notaFinalizata").selectedIndex = 0;
  }

  return (
    <div>
      {

        <article
          className={classes.dosar}
          style={{ backgroundColor: "darkgrey", borderRadius: "10px" }}
        >
          <div style={{ padding: "10px" }}>
            <h2>Selecteaza o nota de indrumare finalizata:
              <select style={{ fontSize: '18px', padding: '2px' }} id="notaFinalizata" onChange={(event) => { handleChangeNota(event.target.value) }} >
                <option>Selecteaza..</option>
                {
                  indrumatoarePeDosar && indrumatoarePeDosar.map(indrumator =>
                    <option value={indrumator.id}>{indrumator.termen}</option>
                  )
                }
              </select>
            </h2>
            <h2>
              Nota de îndrumare: {" "}
              <button onClick={() => { setShowActivitateForm(!showActivitateForm) }} style={{ backgroundColor: "white", fontSize: "20px", padding: "5px", border: "none" }}>

                + activitate

              </button>
              {"  "} termen: <input style={{ fontSize: '20px' }} onChange={onTimeSelect} type="date" id="dataIndrumare"></input>
            </h2>
            {
              showActivitateForm &&
              <>
                <div>


                </div>
                <select style={{ fontSize: '20px', padding: '5px' }} id="taskTypeSelect" onChange={(event) => { setNotaTypeSelected(event.target.value) }} name="tip_activitate" value={notaTypeSelected}>
                  <option style={{ padding: "5px", fontSize: "15px" }}>Selecteaza ..</option>
                  {taskTypes && taskTypes.map(taskType => {
                    return <option style={{ padding: "5px", fontSize: "15px" }} value={taskType.id}>{taskType.nume}</option>
                  })
                  }
                </select>
                {
                  notaTypeSelected &&
                  <>
                    <select style={{ fontSize: '20px', padding: '5px' }} onChange={(event) => { setTaskSelected(event.target.value) }} name="activitate" value={taskSelected}>
                      <option style={{ padding: "5px", fontSize: "15px" }}>Selecteaza ..</option>
                      {taskOptions && taskOptions.map(taskOption =>
                        <option style={{ padding: "5px", fontSize: "15px" }} value={taskOption.id}>{taskOption.nume}</option>
                      )}
                    </select>
                    <input type="text" style={{ fontSize: '20px', padding: '5px' }} size="50" onChange={(event) => setNotaTask(event.target.value)}></input>
                  </>
                }

                {notaDeIndrumare && notaDeIndrumare.termen && <button
                  onClick={() => addActivitate(dosar.id_dosar)}
                  style={{ marginLeft: "10px", fontSize: "20px", backgroundColor: "white", padding: "5px", border: "none" }}
                >
                  Adauga
                </button>}

              </>
            }
            <h2>Activitati</h2>
            <div style={{ textAlign: "left", marginLeft: "36%", fontSize: "20px", width: "400px" }}>
              <ul style={{ display: "flex", flexDirection: "column", marginLeft: "auto" }}>
                {notaDeIndrumare && notaDeIndrumare.tasks && notaDeIndrumare.tasks.map(activitate => {
                  return <li style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                    <button style={{ background: "red", color: "white", border: "none" }} onClick={() => { onDeleteTaskAction(activitate.id) }}>delete</button>
                    <b>{activitate.task_type + " " + activitate.task_name + " " + activitate.nota}</b>
                    <input type="checkbox" style={{ width: "20px", height: "20px" }} onClick={() => {
                      changeActivitateStatus(activitate.id, activitate.status);
                    }} checked={activitate.status === 1 ? "checked" : ""}
                    />
                  </li>
                })}
                {
                  notaDeIndrumare && notaDeIndrumare.tasks && notaDeIndrumare.tasks.length > 0 &&
                  <div>
                    <button style={{ backgroundColor: "white", paddingTop: "5px", paddingBottom: "5px" }} onClick={genereazaNotaIndrumare}>Genereaza document</button>
                    <button style={{ backgroundColor: "white", paddingTop: "5px", paddingBottom: "5px" }} onClick={finalizeazaNotaIndrumare}>Finalizeaza nota</button>
                  </div>
                }

              </ul>
            </div>
          </div>
        </article>
      }
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
              <td>{dosar.autor_necunoscut===0 && dosar.data_primei_sesizari.split("T")[0]}</td>
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
          {(!isAc || !isAn) &&
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
          {(!isAc || !isAn) && (
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

          {(!isAc || !isAn) &&
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
                {vreauAdresa &&
                  <menu className={classes.actions}>
                    <button style={{ backgroundColor: "black" }} onClick={genAdrSiceSimplu}>sice simplu</button>
                    <button style={{ backgroundColor: "black" }} onClick={genAdrSiceComplex}>sice complex</button>
                  </menu>}
              </>
            )}
        </div>



      </article>
    </div>
  );
};

export default DosarItem;
