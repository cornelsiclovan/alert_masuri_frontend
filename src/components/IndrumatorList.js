import { Link } from "react-router-dom";
import classes from "./DosareList.module.css";
const IndrumatorList = (indrumatoare) => {
    console.log(indrumatoare.indrumatoare)
    return <>
        <div className={classes.group}>
            <div className={classes.items}>
                <div style={{ display: "flex" }}>
                    <ul className={classes.list}>
                        {

                            indrumatoare && indrumatoare.indrumatoare.map((indrumator) =>
                                <div>
                                    <li className={classes.item}>
                                        <Link to={`/dosare/${indrumator.dosar_id}`}>
                                            <div className={classes.content}>
                                                <h3>
                                                    {indrumator.dosar} - <small>{indrumator.procuror}</small>{" "}
                                                    <br />

                                                </h3>
                                                <h4>
                                                    {indrumator.tasks.map(task => 
                                                        <div>
                                                            {task.task_type} {task.task_name} <input type="checkbox" checked={task.status===1? true : false}/>
                                                            
                                                        </div>    
                                                    )}
                                                    {indrumator.termen}
                                                </h4>
                                            </div>
                                        </Link>
                                    </li>
                                </div>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    </>
}

export default IndrumatorList;