const Stoc = ({ stoc }) => {
  console.log(stoc);
  if(stoc.length > 0)
  return (
   <>
      <div style={{ display: "flex", justifyContent: "flex-start"}}>
      <p
          style={{
            backgroundColor: "red",
            width: "250px",
            margin: "20px",
            padding: "10px",
          }}
        >
          <b>Stoc: {stoc[0].in_lucru}{" "}</b> <br/>
          <b>evidenta activa: {stoc[0].dosareInEvidentaActiva}{" "}</b> <br/>
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
      </div>
    </>
  );

  else {
    return <></>
  }
};
export default Stoc;
