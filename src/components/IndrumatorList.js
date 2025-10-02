import { Link } from "react-router-dom";
import classes from "./DosareList.module.css";
import { useState } from "react";
const IndrumatorList = (indrumatoare) => {
     const [dateNow, setDate] = useState(Date.now());
    return <>
        <div className={classes.group}>
            <div className={classes.items}>
                <div style={{ display: "flex" }}>
                    
                    <ul className={classes.list}>
                        <h1>Note nefinalizate</h1>
                        {

                            indrumatoare && indrumatoare.indrumatoare.map((indrumator) => {
                                const timpRamasTermen = Math.floor(
                                    (new Date(indrumator.termen).getTime() - dateNow) /
                                    (1000 * 3600 * 24)
                                )

                                let codAlerta = 3;
                                if (timpRamasTermen < 30 && timpRamasTermen > 15)
                                    codAlerta = 2;
                                else if (timpRamasTermen < 15)
                                    codAlerta = 1


                                return <div>
                                    <li className={classes.item}>
                                        <Link to={`/dosare/${indrumator.dosar_id}`}>
                                            <div className={classes.content} style={{backgroundColor: codAlerta != 3 ? (codAlerta === 2 ? "orange" : "red"): ""  }}>
                                                <h3 >
                                                    {indrumator.dosar} - <small>{indrumator.procuror}</small>{" "}
                                                    <br />

                                                </h3>
                                                <h4>
                                                    {indrumator.tasks.map(task =>
                                                        <div >
                                                            {task.task_type} {task.task_name} <input type="checkbox" checked={task.status === 1 ? true : false} />

                                                        </div>
                                                    )}
                                                    {indrumator.termen}
                                                </h4>
                                            </div>
                                        </Link>
                                    </li>
                                </div>
                            })
                        }
                    </ul>
                    
                </div>
            </div>
        </div>
    </>
}

export default IndrumatorList;