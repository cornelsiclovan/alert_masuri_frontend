import { useState } from "react";

const CalculTermenPage = () => {
  const [dateValue, setDateValue] = useState("");
  const [numDays, setNumDays] = useState(0);
  const [dataFinal, setDataFinal] = useState("");
  const [dataFinalP, setDataFinalP] = useState("");

  const onSelectDateHandler = (event) => {
    console.log(event.target.value);
    setDateValue(event.target.value);
  };

  const onChangeNumDays = (event) => {
    setNumDays(event.target.value);
  };

  

  const caluleazaData = (event) => {
    event.preventDefault();

    const finalTimeInMillies = +numDays * 24 * 60 * 60 * 1000;
    const finalTimeInMilliesP = (+numDays+1) * 24 * 60 * 60 * 1000;

    const finalDateInMillies = new Date(dateValue).getTime() + finalTimeInMillies;
    const finalDateInMilliesP = new Date(dateValue).getTime() + finalTimeInMilliesP;

    setDataFinal(new Date(finalDateInMillies))
    setDataFinalP(new Date(finalDateInMilliesP))


}



  return (
    <div style={{margin: "auto", width: "50%", padding: "10px"}}>
      Termen de la data de{" "}
      <input
        type="date"
        name="date"
        value={dateValue}
        onChange={onSelectDateHandler}
      ></input>{" "}
      pentru numarul de zile{" "}
      <input type="number" numDays={numDays} onChange={onChangeNumDays}></input>
      <button style={{ backgroundColor: "lightgreen", padding: "2px" }} onClick={caluleazaData}>
        Calculeaza
      </button>
      <br/>
       <b>procesual:</b> {dataFinal !== "" && dataFinal.toString().split(" ")[0] + " " +  dataFinal.toString().split(" ")[1] + " " +  dataFinal.toString().split(" ")[2] + " " +  dataFinal.toString().split(" ")[3] + " " +  "23:59"}
       <br/>
       <b>procedural:</b> {dataFinalP !== "" && dataFinalP.toString().split(" ")[0] + " " +  dataFinalP.toString().split(" ")[1] + " " +  dataFinalP.toString().split(" ")[2] + " " +  dataFinalP.toString().split(" ")[3] + " " +  "23:59"}
    </div>
  );
};

export default CalculTermenPage;
