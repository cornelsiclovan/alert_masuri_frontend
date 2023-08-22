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

const BASE_URL = process.env.REACT_APP_BASE_URL;

const DosarForm = ({ method, dosar, procurori }) => {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const userId = getUserId();

  const [showSolutionType, setShowSolutionType] = useState(false);

  const [isClasare, setIsClasare] = useState(false);
  const [isRechizitoriu, setIsRechizitoriu] = useState(false);

  let helper = false;

  if (dosar) {
    helper = dosar.este_solutionat;
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
    
    if(showSolutionType) {
      setIsClasare(false);
    }
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
    }

    if (event.target.value === "RECHIZITORIU") {
      setIsRechizitoriu(true);
      setIsClasare(false);
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
          <label htmlFor="este_solutionat" style={{ width: "20%" }}>
            {" "}
            Solutie finala
          </label>
          <select
            id="tip_solutie"
            name="tip_solutie"
            onChange={onSelectTipSolutie}
          >
            <option key="rech" value="RECHIZITORIU">
              RECHIZITORIU
            </option>
            <option key="rup" value="RUP">
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

      {/* {dosar && isClasare && (
        <>
          <li style={{ listStyle: "none" }}> Litere </li>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="a" style={{ width: "10%" }}>
                {" "}
                a{" "}
              </label>
              <input type="checkbox" id="a" name="a" value="a" />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="b" style={{ width: "10%" }}>
                {" "}
                b{" "}
              </label>
              <input type="checkbox" id="b" name="b" value="b" />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="c" style={{ width: "10%" }}>
                {" "}
                c{" "}
              </label>
              <input type="checkbox" id="c" name="c" />
            </li>
            <li style={{ listStyle: "none" }}>
              <label htmlFor="d" style={{ width: "10%" }}>
                {" "}
                d{" "}
              </label>
              <input type="checkbox" id="d" name="d" />
            </li>
          </div>
        </>
      )}

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
          <select id="tip_solutie_propusa" name="tip_solutie_propusa">
            <option
              key={dosar.tip_solutie_propusa}
              value={dosar.tip_solutie_propusa}
            >
              {dosar.tip_solutie_propusa}
            </option>
            <option key="rtup" value="RTUP">
              RTUP
            </option>
            <option key="rup" value="RUP">
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
            <option key="rup" value="RUP">
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
          <select id="procurorId" type="select" name="procurorId" required>
            <option key="" value={dosar ? dosar.procurorId : ""}>
              {dosar ? procurorDosar[0].name : ""}
            </option>
            {procuroriRest.map((procuror) => (
              <option key={procuror.id} value={procuror.id}>
                {procuror.name}
              </option>
            ))}
          </select>
        </p>
      )}
      {isProcuror === "true" && (
        <p>
          <label htmlFor="procuror">Procuror </label>
          <select id="procurorId" type="select" name="procurorId" required>
            {procurori.map((procuror) => {
              if (procuror.id + "" === userId) {
                return (
                  <option key={procuror.id} value={procuror.id}>
                    {procuror.name}
                  </option>
                );
              }
            })}
          </select>
        </p>
      )}
      <p>
        <label htmlFor="data_dosar">Data intrate la procuror</label>
        <input
          id="data_dosar"
          type="date"
          name="data_dosar"
          defaultValue={dosar ? dosar.data : ""}
        />
      </p>
      <p>
        <label htmlFor="data_arest">Data Termen Arest</label>
        <input
          id="data_arest"
          type="date"
          name="data_arest"
          defaultValue={dosar ? dosar.data_arest : ""}
        />
      </p>
      <p>
        <label htmlFor="data_cj">Data Termen Control Judiciar</label>
        <input
          id="data_cj"
          type="date"
          name="data_cj"
          defaultValue={dosar ? dosar.data_cj : ""}
        />
      </p>
      <p>
        <label htmlFor="data_sechestru">Data Termen Sechestru</label>
        <input
          id="data_sechestru"
          type="date"
          name="data_sechestru"
          defaultValue={dosar ? dosar.data_sechestru : ""}
        />
      </p>
      <p>
        <label htmlFor="data_interceptari">Data Termen Interceptari</label>
        <input
          id="data_interceptari"
          type="date"
          name="data_interceptari"
          defaultValue={dosar ? dosar.data_interceptari : ""}
        />
      </p>
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

  const dosarData = {
    numar: data.get("numar_dosar"),
    data: data.get("data_dosar") || null,
    data_arest: data.get("data_arest") || null,
    data_cj: data.get("data_cj") || null,
    data_sechestru: data.get("data_sechestru") || null,
    procurorId: data.get("procurorId"),
    data_interceptari: data.get("data_interceptari") || null,
    este_solutionat: data.get("este_solutionat"),
    tip_solutie: data.get("tip_solutie"),
    tip_solutie_propusa: data.get("tip_solutie_propusa"),
  };

  let url = BASE_URL + "/dosar";

  if (method === "PATCH") {
    const dosarId = params.dosarId;
    url = url + "/" + dosarId;
  }

  const token = getAuthToken();

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "Application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(dosarData),
  });

  if (response.statis === 422) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Nu am putut salva dosarul!" },
      { status: response.status }
    );
  }

  return redirect("/dosare");
};
