import { Link } from "react-router-dom";
import classes from "./DosareList.module.css";
import { getAuthToken, getIsAdmin, getIsProcuror } from "../util/auth";
import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const IndrumatorList = (indrumatoare) => {
    const [dateNow, setDate] = useState(Date.now());
    const [indrumatoareFinalizate, setIndrumatoareFinalizate] = useState()
    const isAdmin = getIsAdmin();
    const [numeProcuror, setNumeProcuror] = useState("");
    const [searchYear, setSearchYear] = useState("");
    const [searhNrDosar, setSearchNrDosar] = useState("");

    /// adaugare nota de indrumare pentru dosare cu AN
    const [adaugPentruAn, setAdaugPentruAn] = useState(false);
    const [notaDeIndrumare, setNotaDeIndrumare] = useState();
    const [notaTypeSelected, setNotaTypeSelected] = useState();
    const [taskTypes, setTaskTypes] = useState();
    const [taskOptions, setTasksOptions] = useState();
    const [taskSelected, setTaskSelected] = useState();
    const [notaTask, setNotaTask] = useState();
    const [taskStatusModification, setTaskStatusModification] = useState(1);
    const [indrumatoarePeDosar, setIndrumatoarePeDosar] = useState();
    const [showActivitateForm, setShowActivitateForm] = useState(false);
    const [nrDosar, setNrDosar] = useState();
    const [termen, setTermen] = useState();

    /// end adaugare nota de indrumare pentru dosare cu AN

    useEffect(() => {

        const getNote = async () => {
            const token = getAuthToken();
            const isProcuror = getIsProcuror();

            let url = BASE_URL + "/indrumator/finalizate";

            if (isAdmin === "true") {
                url = BASE_URL + "/indrumator/finalizate?isAdmin=1";
            }

            if (isProcuror === "true" && isAdmin === "false") {
                url = BASE_URL + "/indrumator/finalizate?procurorId=1"
            }

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token
                },
            });

            if (!response.ok) {
                throw json(
                    { message: "Could not indrumatoare" },
                    { status: 500 }
                )
            } else {
                const resData = await response.json();

                setIndrumatoareFinalizate(resData);
            }
        }

        if (isAdmin === 'true') {
            getNote()
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

        if (adaugPentruAn)
            fetchTaskTypes();

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

        if (notaTypeSelected) {
            fetchTasks();
        }

    }, [adaugPentruAn, notaTypeSelected])

    const onChangeNrDosarOrProcNameInput = (event) => {
        let hasNumber = /\d/;
        let val = event.target.value;
        console.log(event.target.value)
        if (hasNumber.test(val)) {
            console.log(true)
            setSearchNrDosar(event.target.value);
        } else {
            setNumeProcuror(event.target.value)
        }
    }

    const onChangeYearInput = (event) => {
        setSearchYear(event.target.value)
    }

    let indrumatoareFinalizateFilter = indrumatoareFinalizate && indrumatoareFinalizate.filter((indrumator) => {
        console.log(indrumator.dosar)
        console.log(searhNrDosar)
        return (
            (indrumator.dosar.includes(searhNrDosar) &&
                indrumator.procuror.toLowerCase().includes(numeProcuror.toLowerCase()))
            && (indrumator.dosar.split("/")[3].includes(searchYear))
        );
    })


    const onTimeSelect = (event) => {
        setTermen(event.target.value)
    }

    const onChangeDosarNr = (event) => {
       
        setNrDosar(event.target.value)
    }

    const onClickAddIndrumator = () => {
        
    }

    let i = 0;
    return <>
        <div className={classes.group}>
            <div className={classes.items} style={{ maxWidth: "100rem" }}>
                <div style={{ display: 'flex', width: "100%" }}>
                    {isAdmin === "true" &&
                        <div style={{ marginRight: "100px", color: "black" }}>
                            <input style={{ height: '30px', width: '300px' }} onChange={onChangeNrDosarOrProcNameInput} type="text" placeholder="Nr. dosar/ Nume procuror" />
                            <input style={{ height: '30px', width: '150px' }} onChange={onChangeYearInput} type="text" placeholder="An" />
                            <table className={classes.table}>

                                <tr className={classes.th}>
                                    <td className={classes.td} style={{ textAlign: "left" }}>nr. crt.</td>
                                    <td className={classes.td} style={{ textAlign: "left" }}>Procuror</td>
                                    <td className={classes.td} style={{ textAlign: "left" }}>Dosar</td>
                                    <td className={classes.td} style={{ textAlign: "left" }}>Activitati</td>
                                    <td className={classes.td}>Termen</td>
                                </tr>
                                {indrumatoareFinalizateFilter && indrumatoareFinalizateFilter.map(indrumatorFinalizat => {
                                    i++;
                                    return <tr className={classes.tr}>
                                        <td className={classes.td}>{i}</td>
                                        <td className={classes.td}>{indrumatorFinalizat.procuror}</td>
                                        <td className={classes.td}>{indrumatorFinalizat.dosar}</td>
                                        <td className={classes.td} style={{ width: '400px' }} >
                                            {
                                                indrumatorFinalizat.tasks &&
                                                indrumatorFinalizat.tasks.map(item =>
                                                    <div style={{ textAlign: "left", width: '200px' }}> - {item.task_type} {item.task_name}</div>
                                                )
                                            }
                                        </td>
                                        <td className={classes.td}>{indrumatorFinalizat.termen}</td>
                                    </tr>
                                })}
                            </table>
                        </div>

                    }

                    <ul className={classes.list}>
                        <h1>Note nefinalizate</h1>
                        <button onClick={() => { setAdaugPentruAn(!adaugPentruAn) }}> Adauga pentru AN </button>
                        {
                            adaugPentruAn &&
                            <>
                                <div>
                                    {"  "} termen: <input style={{ fontSize: '20px' }} onChange={onTimeSelect} type="date" id="dataIndrumare"></input>
                                    {"  "}nr dosar: <input onChange={onChangeDosarNr} value={nrDosar}></input> {nrDosar && termen && <button onClick={onClickAddIndrumator}>Add</button>} <br />
                                    <select style={{ fontSize: '20px', padding: '5px' }} id="taskTypeSelect" onChange={(event) => { setNotaTypeSelected(event.target.value) }} name="tip_activitate" value={notaTypeSelected}>
                                        <option style={{ padding: "5px", fontSize: "15px" }}>Selecteaza ..</option>
                                        {taskTypes && taskTypes.map(taskType => {
                                            return <option style={{ padding: "5px", fontSize: "15px" }} value={taskType.id}>{taskType.nume}</option>
                                        })
                                        }
                                    </select>
                                    {notaTypeSelected &&
                                        <>
                                            <select style={{ fontSize: '20px', padding: '5px' }} onChange={(event) => { setTaskSelected(event.target.value) }} name="activitate" value={taskSelected}>
                                                <option style={{ padding: "5px", fontSize: "15px" }}>Selecteaza ..</option>
                                                {taskOptions && taskOptions.map(taskOption =>
                                                    <option style={{ padding: "5px", fontSize: "15px" }} value={taskOption.id}>{taskOption.nume}</option>
                                                )}
                                            </select>
                                            <input type="text" style={{ fontSize: '20px', padding: '5px' }} size="20" onChange={(event) => setNotaTask(event.target.value)}></input>
                                        </>}

    
                                    <br />
                                    {[1, 2, 3].map(number => {
                                        return <ul>number</ul>
                                    })}
                                    <button>Genereaza document</button>  <button>Finalizeaza nota</button>
                                </div>
                            </>

                        }
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
                                            <div className={classes.content} style={{ backgroundColor: codAlerta != 3 ? (codAlerta === 2 ? "orange" : "red") : "" }}>
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