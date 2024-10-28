import { useState } from "react";
import classes from "./SolutiiList.module.css"
const ArestatiList = ({ arestati }) => {
    const [arestIsChecked, setArestIsChecked] = useState(true);
    const [cjIsChecked, setCjIsChecked] = useState(false);
    const [anArestare, setAnArestare] = useState("2024");

    let year = (new Date()).getFullYear();
    let yearArray = []
    for (let j = 0; j < 4; j++) {
        yearArray.push(year - j);
    }

    let arestatiFiltrate = arestati;

    const getCondition = (isArest, isCj) => {
        let condition = false;

        if (isArest && arestIsChecked) {
            condition = condition || isArest;
        }

        if (isCj && cjIsChecked) {
            condition = condition || isCj;
        }
        return condition;
    };


    arestatiFiltrate = arestati.filter((tip) => {
        let condition = getCondition(
            tip.nume.includes("arest"),
            tip.nume.includes("judiciar"),
        );

        return condition;
    });

    arestatiFiltrate = arestatiFiltrate.filter((arestare) => {
        if (anArestare === "") {

            return true;
        } else {
            return arestare.data.includes(anArestare);
        }
    });


    const onChangeTipInput = (event) => {
        console.log(event.target.value);
        if (event.target.value === "control") {
            setCjIsChecked(!cjIsChecked);
        }

        if (event.target.value === "arest") {
            setArestIsChecked(!arestIsChecked);
        }
    }

    const onChangeAnInput = (event) => {
        setAnArestare(event.target.value);
    }

    let i = 0;
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "120%" }}>
            <div className={classes.sort}>
                <select
                    style={{
                        height: "30px",
                        marginTop: "20px",
                        marginLeft: "-100px",
                        width: "150px",
                    }}
                    defaultValue={2024}
                    type="text"
                    placeholder="an"
                    onChange={onChangeAnInput}
                >
                    {yearArray.map(year => <option>{year}</option>)}
                </select>
                <div className={classes.checkbox}>
                    <div className={classes.ul}>
                        <div className={classes.li}>
                        </div>
                        <div className={classes.li}>
                            <input
                                checked={cjIsChecked}
                                type="checkbox"
                                id="control"
                                value="control"
                                onChange={onChangeTipInput}
                            ></input>
                            <label style={{ marginLeft: "-200px" }}>Control judiciar</label>
                        </div>
                        <div className={classes.li}>
                            <input
                                checked={arestIsChecked}
                                id="arest"
                                value="arest"
                                type="checkbox"
                                onChange={onChangeTipInput}
                            ></input>
                            <label style={{ marginLeft: "-200px" }}>Arest</label>
                        </div>
                        <div className={classes.li}>
                        </div>
                        <div className={classes.li}>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.table}>
                <div style={{ color: "black" }}><b> Total: {arestatiFiltrate.length}</b></div>
                <div className={classes.th}>
                    <div className={classes.td}>nr. crt.</div>
                    <div className={classes.td}>nume</div>
                    <div className={classes.td}>nr. dos.</div>
                    <div className={classes.td}>data</div>
                    <div className={classes.td}>stare</div>
                </div>
                {arestatiFiltrate.map((arestat) => {
                    i = i + 1;
                    return (
                        <div className={classes.tr}>
                            <div className={classes.td}>{i}</div>
                            <div className={classes.td}>{arestat.nume_parte}</div>
                            <div className={classes.td}>{arestat.numar_dosar}</div>
                            <div className={classes.td}>{arestat.data}</div>
                            <div className={classes.td}>{arestat.nume}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ArestatiList;