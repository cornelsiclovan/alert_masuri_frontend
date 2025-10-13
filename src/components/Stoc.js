import { useEffect, useState } from "react";
import { getAuthToken } from "../util/auth";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Stoc = ({ stoc }) => {
  const [utilizariLunare, setUtilizariLunare] = useState(0)
  const [utilizariTotale, setUtilizariTotale] = useState(0)
  const [solutii, setSolutii] = useState(0)
  const [note_indrumare, setNoteIndrumare] = useState(0)


  useEffect(() => {
    const fetchStats = async () => {
      let url = BASE_URL + "/stats";
      let token = getAuthToken();

      const response = await fetch(url, {
        method: "get",
        headers: {
          Authorization: "Bearer " + token
        },
      });

      const data = await response.json();

      setUtilizariLunare(data.accesari_lunare);
      setUtilizariTotale(data.accesari_total);
      setNoteIndrumare(data.note_indrumare);
      setSolutii(data.solutii);
    }
    fetchStats()
  }, [])


  if (stoc.length > 0)
    return (
      <>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <p
            style={{
              backgroundColor: "red",
              width: "250px",
              margin: "20px",
              padding: "10px",
            }}
          >
            <b>Stoc: {stoc[0].in_lucru}{" "}</b> <br />
            <b>evidenta activa: {stoc[0].dosareInEvidentaActiva}{" "}</b> <br />
            <b>evidenta pasiva: {stoc[0].dosareInEvidentaPasiva}{" "}</b>
          </p>
          <p
            style={{
              backgroundColor: "orange",
              width: "250px",
              margin: "20px",
              padding: "10px",
            }}
          >
            <b>Inregistrate anul curent: {stoc[0].inregistrate_an_curent}{" "}</b>
          </p>
          <p
            style={{
              backgroundColor: "green",
              width: "250px",
              margin: "20px",
              padding: "10px",
            }}
          >
            {" "}
            <b>Solutionate anul curent: {stoc[0].solutionate_an_curent}{" "}</b>
          </p>
          <p
            style={{
              backgroundColor: "#4267B2",
              width: "250px",
              margin: "20px",
              padding: "10px",
            }}
          >
            {" "}
            <b>Operativitate solutionare dos. an curent: {((stoc[0].solutionate_an_curent * 100) / (+stoc[0].in_lucru + +stoc[0].solutionate_an_curent)).toFixed(2)
            }%{" "}</b>
          </p>
          <p
            style={{
              backgroundColor: "#4267B2",
              width: "250px",
              margin: "20px",
              padding: "10px",
              marginLeft: "auto"
            }}
          >
            {" "}
            <b> Statistici: </b>
            <ul>
              <li> Utilizari lunare: {utilizariLunare}</li>
              <li> Utilizari totale: {utilizariTotale}</li>
              <li> Nr. solutii: {solutii}</li>
              <li> Nr. note indrumare: {note_indrumare}</li>
            </ul>

          </p>

        </div>
      </>
    );

  else {
    return <></>
  }
};
export default Stoc;
