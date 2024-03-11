import { Form, useSubmit } from "react-router-dom";

import classes from "./SolutiiList.module.css";
import { useState } from "react";
import { getIsAdmin } from "../util/auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const OrdineList = ({ ordine }) => {
  const [numar, setNumar] = useState("");
  const [descriere, setDescriere] = useState("");
  const [editItem, setEditItem] = useState(null);

  const isAdmin = getIsAdmin();

  let i = 0;
  const submit = useSubmit();

  const onDeleteHandler = (id) => {
    submit({ id: id }, { method: "delete" });
  };

  const onStartEditHandler = (numar, descriere, id) => {
    setNumar(numar);
    setDescriere(descriere);
    setEditItem(id);
  };

  const handleSubmit = async (event) => {
    
    setTimeout(function () {
      event.target.form.reset();
      setNumar("");
      setDescriere("");
    }, 1000);
  };

  const onChangeInputHandler = (event) => {
    if (event.target.name === "numar") {
      setNumar(event.target.value);
    }

    if (event.target.name === "descriere") {
      setDescriere(event.target.value);
    }
  };

  return (
    <>
      {isAdmin === "true" && (
        <Form
          method={editItem ? "patch" : "post"}
          encType="multipart/form-data"
          className={classes.form}
        >
          {editItem && <input type="hidden" name="id" value={editItem} />}
          <div style={{ display: "flex" }}>
            <input
              onChange={onChangeInputHandler}
              type="text"
              name="numar"
              value={numar}
              placeholder="numar"
              style={{ width: "450px" }}
              required
            />
            <input
              onChange={onChangeInputHandler}
              type="text"
              name="descriere"
              value={descriere}
              placeholder="descriere"
              style={{ width: "450px" }}
              required
            />
            <input
              id="docs"
              type="file"
              name="docs"
              placeholder="atasament"
              required
            />
            <button
              style={{
                backgroundColor: "orange",
                border: "none",
                color: "white",
                padding: "10px",
              }}
              type="submit"
              onClick={handleSubmit}
            >
              Salveaza
            </button>
          </div>
        </Form>
      )}
      <div className={classes.table}>
        <div className={classes.th}>
          <div className={classes.td}>NR. CRT.</div>
          <div className={classes.td}>NUMAR ORDIN</div>
          <div className={classes.td}>DESCRIERE</div>
          <div className={classes.td}>LINK</div>
          <div className={classes.td}>ACTIONS</div>
        </div>
        {ordine &&
          ordine.map((ordin) => {
            i = i + 1;
            return (
              <div className={classes.tr}>
                <div className={classes.td}>{i}</div>
                <div className={classes.td}>{ordin.numar}</div>{" "}
                <div className={classes.td}> {ordin.descriere} </div>
                <div className={classes.td}>
                  <a href={`${BASE_URL}/${ordin.nume_fisier}`} target="_blank">
                    link
                  </a>
                </div>
                <div className={classes.td}>
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      onDeleteHandler(ordin.id);
                    }}
                  >
                    DELETE
                  </button>
                  <button
                    onClick={() =>
                      onStartEditHandler(ordin.numar, ordin.descriere, ordin.id)
                    }
                  >
                    EDIT
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default OrdineList;
