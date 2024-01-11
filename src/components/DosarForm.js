import {
  Form,
  redirect,
  json,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import classes from "./DosarForm.module.css";
import { getAuthToken, getIsProcuror, getUserId } from "../util/auth";
import { useState } from "react";
import { saveAs } from "file-saver";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// const LITERE_CLASARI_CU_TEXT = [
//   "lit. a C. proc. pen., întrucât fapta nu exista", // 0
//   "lit. b teza I C. proc. pen., întrucât fapta nu este prevăzută de legea penală", // 1
//   "lit. b teza II C. proc. pen., întrucât fapta nu a fost săvârșită cu vinovăția prevăzută de lege", // 2
//   "lit. c C. proc. pen., întrucât nu există probe că o persoană a săvârșit infracțiunea", // 3
//   "lit. d C. proc. pen., întrucât este incidentă o cauză justificativă", // 4
//   "lit. d C. proc. pen., întrucât este incidentă o cauză de neimputabilitate", // 5
//   "lit. e, C. proc. pen., întrucât lipsește plângerea prealabilă", // 6
//   "lit. f C. proc. pen., întrucât a intervenit decesul", // 7
//   "lit. f C. proc. pen., întrucât a intervenit prescripția răspunderii penale", // 8
//   "lit. g teza I C. proc. pen., întrucât a intervenit retragerea plângerii prealabile", // 9
//   "lit. g teza II C. proc. pen., întrucât a intervenit împăcarea părților", // 10
//   "lit. h C. proc. pen., întrucât există o cauză de nepedepsire", // 11
//   "lit. i C. proc. pen., întrucât există autoritate de lucru judecat", // 12
// ];

// let LITERE_CLASARI = [];

// LITERE_CLASARI_CU_TEXT.forEach((litera_articol) => {
//   LITERE_CLASARI.push(
//     litera_articol.split(",")[0] + ", " + litera_articol.split(",")[1]
//   );
// });

const DosarForm = ({ method, dosar, procurori }) => {
  let parti_vatamate = [];
  let autori_fapta = [];
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const userId = getUserId();

  const [showSolutionType, setShowSolutionType] = useState(false);

  let isRechi = false;
  let isClas = false;
  let isRen  = false

  if(dosar.tip_solutie_propusa.includes("TERMINARE")) {
    isRechi = true
  }

  if(dosar.tip_solutie_propusa === "CLASARE") {
    isClas = true;
  }

  if(dosar.tip_solutie_propusa.includes("R.")) {
    isRen = true;
  }

  const [isClasare, setIsClasare] = useState(isClas);
  const [isRechizitoriu, setIsRechizitoriu] = useState(isRechi);
  const [isRup, setIsRup] = useState(isRen);

  let helper = false;

  if (dosar) {
    helper = dosar.este_solutionat;
  }

  let firstParte = true;
  let firstAutor = true;

  if (dosar && dosar.parte) {

    dosar.parte.map((p) => {
      if (firstParte && p.ordine === "2") {
        parti_vatamate += p.nume;
        firstParte = false;
      } else if (!firstParte && p.ordine === "2") {
        parti_vatamate += ", " + p.nume;
      } else if (firstAutor && p.ordine === "1") {
        autori_fapta += p.nume;
        firstAutor = false;
      } else if (!firstAutor && p.ordine === "1") {
        autori_fapta += ", " + p.nume;
      }
    });
  }

  let fapte = [];
  let fapteString = "";

  if (dosar && dosar.fapta) {
    dosar.fapta.map((f) => {
      fapte.push(f);
    });

    fapteString = fapte[fapte.length - 1].nume_temei;

    if(fapte[fapte.length - 1].nume_temei.includes("229")) {
      fapteString = "";

      fapteString = fapteString + " " + "Art. 228" + ", " + fapte[fapte.length-1].nume_temei.split("NCP")[0] + "C. pen.";
    }
  }

 
  

  const [isSolutionat, setIsSolutionat] = useState(helper);

  const isSubmitting = navigation.state === "submitting";

  let procurorDosar = "";
  let procuroriRest = procurori;

  const isProcuror = getIsProcuror();

  if (dosar) {
    procurorDosar = procurori.filter(
      (procuror) => procuror.id === dosar.procurorId
    );
    procuroriRest = procurori.filter(
      (procuror) => procuror.id !== dosar.procurorId
    );
  }

  const handleCheck = () => {
    if (!isClasare && !isSolutionat) setIsClasare(true);
    setShowSolutionType(!showSolutionType);

    setIsSolutionat(!isSolutionat);
  };

  const cancelHandler = () => {
    navigate("..");
  };

  const onSelectTipSolutie = (event) => {
    console.log(isClasare);
    if (event.target.value === "CLASARE") {
      setIsClasare(true);
      setIsRechizitoriu(false);
      setIsRup(false);
    }

    if (event.target.value === "RUP") {
      setIsRechizitoriu(false);
      setIsClasare(false);
      setIsRup(true);
    }

    if (event.target.value === "RECHIZITORIU") {
      setIsRechizitoriu(true);
      setIsClasare(false);
      setIsRup(false);
    }
  };

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {dosar && (
        <p style={{ display: "flex" }}>
          <label htmlFor="este_solutionat" style={{ width: "10%" }}>
            {" "}
            Dosar solutionat
          </label>
          <input
            type="checkbox"
            id="este_solutionat"
            name="este_solutionat"
            value={isSolutionat}
            checked={isSolutionat}
            onChange={handleCheck}
          />
        </p>
      )}

      {dosar && showSolutionType && (
        <p style={{ display: "flex" }}>
          <label htmlFor="tip_solutie" style={{ width: "20%" }}>
            {" "}
            Solutie finala
          </label>
          <select
            id="tip_solutie"
            name="tip_solutie"
            onChange={onSelectTipSolutie}
          >
            <option key="clasare" value="CLASARE">
              CLASARE
            </option>
            <option key="rech" value="RECHIZITORIU" selected={isRechi}>
              RECHIZITORIU
            </option>
            <option key="rup" value="RUP" selected={isRen}>
              RUP
            </option>

            <option key="clasare_motivata" value="CLASARE">
              CLASARE MOTIVATA
            </option>
            <option key="declinare" value="DECLINARE">
              DECLINARE
            </option>
          </select>
        </p>
      )}

      {dosar && showSolutionType && (
        <p style={{ display: "flex" }}>
          <label htmlFor="data_solutie_propusa" style={{ width: "20%" }}>
            {" "}
            Data propunerii solutiei
          </label>
          <input
            type="text"
            value={dosar.data_solutie_reala + "  (an/luna/zi)"}
            name="data_solutie_propusa"
          />
        </p>
      )}

      {dosar && isClasare && isSolutionat && (
        <>
          <li style={{ listStyle: "none" }}> Litere </li>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="a" style={{}}>
                {" "}
                a{" "}
              </label>
              <input
                type="checkbox"
                id="a"
                name="litera_articol_id"
                value={0}
              />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="bt1" style={{}}>
                {" "}
                b teza I{" "}
              </label>
              <input
                type="checkbox"
                id="bt1"
                name="litera_articol_id"
                value={1}
              />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="bt2" style={{}}>
                {" "}
                b teza II{" "}
              </label>
              <input
                type="checkbox"
                id="bt2"
                name="litera_articol_id"
                value={2}
              />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="c" style={{}}>
                {" "}
                c{" "}
              </label>
              <input
                type="checkbox"
                id="c"
                name="litera_articol_id"
                value={3}
              />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="djust" style={{}}>
                {" "}
                d just{" "}
              </label>
              <input
                type="checkbox"
                id="djust"
                name="litera_articol_id"
                value={4}
              />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="dneimput" style={{}}>
                {" "}
                d neimput{" "}
              </label>
              <input
                type="checkbox"
                id="dnimput"
                name="litera_articol_id"
                value={5}
              />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="e" style={{}}>
                {" "}
                e{" "}
              </label>
              <input
                type="checkbox"
                id="e"
                name="litera_articol_id"
                value={6}
              />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="fdeces" style={{}}>
                {" "}
                f deces{" "}
              </label>
              <input
                type="checkbox"
                id="fdeces"
                name="litera_articol_id"
                value={7}
              />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="fprescr" style={{}}>
                {" "}
                f prescr{" "}
              </label>
              <input
                type="checkbox"
                id="fprescr"
                name="litera_articol_id"
                value={8}
              />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="gt1" style={{}}>
                {" "}
                g tI{" "}
              </label>
              <input
                type="checkbox"
                id="gt1"
                name="litera_articol_id"
                value={9}
              />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="gt2" style={{}}>
                {" "}
                g tII{" "}
              </label>
              <input
                type="checkbox"
                id="gt2"
                name="litera_articol_id"
                value={10}
              />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="h" style={{}}>
                {" "}
                h{" "}
              </label>
              <input
                type="checkbox"
                id="h"
                name="litera_articol_id"
                value={11}
              />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="i" style={{}}>
                {" "}
                i{" "}
              </label>
              <input
                type="checkbox"
                id="i"
                name="litera_articol_id"
                value={12}
              />
            </li>
          </div>
        </>
      )}
      {/*
      {dosar && isClasare && (
        <p style={{ display: "flex" }}>
          <label htmlFor="art_46" style={{ width: "10%" }}>
            {" "}
            Art. 46
          </label>
          <input type="checkbox" id="art_46" name="art_46" />
        </p>
      )}
        
      {dosar && isClasare && (
          <p style={{ display: "flex" }}>
            <label style={{width: "20%"}}>Infractiune </label>
            <select>
              <option>test</option>
            </select>
          </p>
      )}

      {dosar && isClasare && (
        <p style={{ display: "flex" }}>
          <label htmlFor="persoane_comunicare" style={{ width: "20%" }}>
            {" "}
            Persoane comunicare
          </label>
          <textarea

            rows="4"
            id="persoane_comunicare"
            name="persoane_comunicare"
            placeholder="introduceti persoanele cu ca text ca si cum le introduceti in ordonanta"
          />
        </p>
      )} */}

      {dosar && (
        <p style={{ display: "flex" }}>
          <label htmlFor="tip_solutie_propusa" style={{ width: "20%" }}>
            {" "}
            Solutie propusa
          </label>
          <input
            id="tip_solutie_propusa"
            type="text"
            name="tip_solutie_propusa"
            defaultValue={dosar.tip_solutie_propusa}
          />
        </p>
      )}

      {/* la parte dosar ordine = 2 este parte vatamata
      la parte dosar ordine = 1 este faptuitor/suspect/inculpat */}

      {dosar && (
        <p style={{ display: "flex" }}>
          <label htmlFor="parti-vatamate" style={{ width: "20%" }}>
            {" "}
            Persoane vatamate
          </label>
          <input
            type="text"
            name="parti_vatamate"
            id="parti-vatamate"
            value={parti_vatamate}
          />
        </p>
      )}

      {dosar && (isRup || isRechizitoriu) &&(
        <p style={{ display: "flex" }}>
          <label htmlFor="autorul-faptei" style={{ width: "20%" }}>
            {" "}
            Autorul faptei
          </label>
          <input
            type="text"
            name="autorul-faptei"
            id="autorul-faptei"
            value={autori_fapta}
          />
        </p>
      )}

      {dosar && fapteString && (
        <p style={{ display: "flex" }}>
          <label htmlFor="fapta" style={{ width: "20%" }}>
            {" "}
            Fapte
          </label>
          <input
            type="text"
            name="fapta"
            id="fapta"
            value={
             fapteString
            }
          />
        </p>
      )}

    {dosar && isRup &&(
        <p style={{ display: "flex" }}>
          <label htmlFor="litera_infr" style={{ width: "20%" }}>
            {" "}
            Litera Infractiune
          </label>
          <input
          style={{width:"5%"}}
            type="text"
            name="litera_infr"
            id="litera_infr"
          />
        </p>
      )}      

      {dosar && (
        <p style={{ display: "flex" }}>
          <label htmlFor="pedeapsa" style={{ width: "20%" }}>
            {" "}
            Pedeapsa
          </label>
          <input
            type="text"
            name="pedeapsa"
            id="pedeapsa"
            value={dosar.pedeapsa}
          />
        </p>
      )}

      {dosar && ( isRup || isRechizitoriu) && (
        <p style={{ display: "flex" }}>
          <label htmlFor="starea_de_fapt" style={{ width: "20%" }}>
            {" "}
            Starea de fapt
          </label>
          <textarea
            type="text"
            name="starea_de_fapt"
            id="starea_de_fapt"
            value={fapte[0] && fapte[0].situatie}
          />
        </p>
      )}

      {!dosar && (
        <p style={{ display: "flex" }}>
          <label htmlFor="tip_solutie_propusa" style={{ width: "20%" }}>
            {" "}
            Solutie propusa
          </label>
          <select id="tip_solutie_propusa" name="tip_solutie_propusa">
            <option key="rtup" value="RTUP">
              RTUP
            </option>
            <option key="RUP" value="RUP">
              RUP
            </option>
            <option key="clasare" value="CLASARE">
              CLASARE
            </option>
            <option key="declinare" value="DECLINARE">
              DECLINARE
            </option>
          </select>
        </p>
      )}
      <p>
        <label htmlFor="numar_dosar">Numar Dosar</label>
        <input
          id="numar_dosar"
          type="text"
          name="numar_dosar"
          required
          defaultValue={dosar ? dosar.numar : ""}
        />
      </p>
      {isProcuror === "false" && (
        <p>
          <label htmlFor="procuror">Procuror </label>
          <select id="procurorId" type="select" name="nume_procuror">
            <option key="" value={dosar ? procurorDosar[0].name : ""}>
              {dosar ? procurorDosar[0].name : ""}
            </option>
            {procuroriRest.map((procuror) => (
              <option key={procuror.id} value={procuror.name}>
                {procuror.name}
              </option>
            ))}
          </select>
        </p>
      )}
      {isProcuror === "true" && (
        <p>
          <label htmlFor="procuror">Procuror </label>
          <select id="procurorId" type="select" name="nume_procuror" required>
            {procurori.map((procuror) => {
              if (procuror.id + "" === userId) {
                return (
                  <option key={procuror.id} value={procuror.name}>
                    {procuror.name}
                  </option>
                );
              }
            })}
          </select>
        </p>
      )}

      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Se salveaza" : "Salveaza"}
        </button>
      </div>
    </Form>
  );
};

export default DosarForm;

export const action = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData();

  if (
    data.get("litera_articol_id") === null &&
    data.get("tip-solutie") === "CLASARE"
  ) {
    window.alert("selectati cel putin o litera pentru articol");
    return redirect(".");
  }

  console.log(data.get("nume_procuror"));

  const dosarData = {
    este_solutionat: data.get("este_solutionat"),
    numar_dosar: data.get("numar_dosar"),
    tip_solutie: data.get("tip_solutie"),
    litera_articol_id: data.get("litera_articol_id") || "-",
    data_solutie_propusa: data.get("data_solutie_propusa") || null,
    nume_procuror: data.get("nume_procuror"),
    parti_vatamate: data.get("parti_vatamate") || null,
    fapta: data.get("fapta"),
    autorul_faptei: data.get("autorul-faptei") || null,
    situatie: data.get("starea_de_fapt") || null,
    pedeapsa: data.get("pedeapsa") || null,
    litera: data.get("litera_infr") || null
  };

  console.log(dosarData);

  let url = BASE_URL + "/genereaza-documente";
  let urlFile = BASE_URL + "/file";

  if (data.get("tip_solutie") === "CLASARE") {
    url += "/clasare-insusita";
  }

  if (data.get("tip_solutie") === "RUP") {
    url += "/rup";
  }

  if(data.get("tip_solutie") === "RECHIZITORIU") {
    url += "/rech";
  }

  console.log(url);

  // if (method === "PATCH") {
  //   const dosarId = params.dosarId;
  //   url = url + "/" + dosarId;
  // }

  const token = getAuthToken();

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "Application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(dosarData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Nu am putut salva dosarul!" },
      { status: response.status }
    );
  }

  let numarDosarFormatat =
    data.get("numar_dosar").split("/")[0] +
    "-" +
    data.get("numar_dosar").split("/")[1] +
    "-" +
    data.get("numar_dosar").split("/")[2];

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
      console.log(newFile);
      saveAs(newFile, numarDosarFormatat + ".docx");
    });
    const myFileData = await response.json();
    const myFileName = myFileData.filename;
    //saveAs(responseFileRequest, _);
  }

  return redirect("/");
};
