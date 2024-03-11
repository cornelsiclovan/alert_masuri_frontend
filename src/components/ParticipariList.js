import { useState } from "react";
import classes from "./SolutiiList.module.css";

const ParticipariList = ({ participari }) => {
  console.log(participari);

  let i = 0;
  return (
    <>
    
      <div className={classes.sort}></div>

      <div className={classes.table}>
        <div className={classes.th}>
          <div className={classes.td}>NR. CRT.</div>
          <div className={classes.td}>PROCUROR</div>
          <div className={classes.td}>NR. PARTICIP. SEDINTE</div>
          <div className={classes.td}>
            NR. PARTICIP. CAUZE <br />
          </div>
          <div className={classes.td}>NR. HOT. VERIFICATE</div>
          <div className={classes.td}>
            NR. PARTICIP. SEDINTE <br /> COPIL
          </div>
          <div className={classes.td}>
            NR. PARTICIP. CAUZE <br /> COPIL
          </div>
          <div className={classes.td}>
            NR. HOT. VERIFICATE <br /> COPIL
          </div>
          <div className={classes.td}>AN</div>
          <div className={classes.td}>LUNA</div>
        </div>
        {participari.map((part) => {
          i = i + 1;

          return (
            <div className={classes.tr}>
              <div className={classes.td}>{i}</div>
              <div className={classes.td}>{part.numeProcuror}</div>
              <div className={classes.td}>{part.nr_part_sed}</div>
              <div className={classes.td}>{part.nr_part_cauze}</div>
              <div className={classes.td}>{part.nr_hot_vf}</div>
              <div className={classes.td}>{part.nr_part_sed_copil}</div>
              <div className={classes.td}>{part.nr_part_copil}</div>
              <div className={classes.td}>{part.nr_hot_vf_copil}</div>
              <div className={classes.td}>{part.an}</div>
              <div className={classes.td}>{part.luna}</div>
            </div>
          );
        })}
        <div className={classes.th}>
          <div className={classes.td}>TOTAL PARTICIPARI</div>
          <div className={classes.td}></div>
          <div className={classes.td}>{}</div>
          <div className={classes.td}>{}</div>
          <div className={classes.td}>{}</div>
          <div className={classes.td}>{}</div>
          <div className={classes.td}>{}</div>
        </div>
      </div>
    </>
  );
};

export default ParticipariList;
