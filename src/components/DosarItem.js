import { Link, useSubmit } from "react-router-dom";

import classes from "./DosarItem.module.css";
import { useState } from "react";

const DosarItem = ({ dosar }) => {
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

  const alertaArest = timpRamasArest <= 15 ? true : false;
  const alertaSechestru = timpRamasSechestru <= 30 ? true : false;
  const alertaCj = timpRamasCj <= 15 ? true : false;
  const alertaInterceptari = timpRamasInterceptari <= 15 ? true : false;

  return (
    <article
      className={classes.dosar}
      style={{ backgroundColor: "darkgrey", borderRadius: "10px" }}
    >
      <div style={{ padding: "10px" }}>
        <h1>{dosar.numar}</h1>
        <p>Intrare: {dosar.data}</p>
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
        <menu className={classes.actions}>
          <Link
            style={{ color: "lightcoral", backgroundColor: "white" }}
            to="edit"
          >
            Edit
          </Link>
          <button
            onClick={startDeleteHandler}
            style={{ backgroundColor: "white" }}
          >
            Delete
          </button>
        </menu>
      </div>
    </article>
  );
};

export default DosarItem;
