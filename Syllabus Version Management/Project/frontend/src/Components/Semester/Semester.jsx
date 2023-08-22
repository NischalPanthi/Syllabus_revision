import React, {useRef} from "react";
import { Link } from "react-router-dom";
import "./Semester.scss";
import {useDownloadExcel} from "react-export-table-to-excel"

const Semester = ({ semester, number }) => {
  const tableRef=useRef(null);
  const {onDownload} =useDownloadExcel({
    currentTableRef:tableRef.current,
    filename:"User",
    sheet:"User"
  })
  return (
    <div className="semester">
      <div className="semesterContainer">
        <h2>Semester {number}</h2>
        <table>
        <tr>
          <th>#</th>
          <th>Subjects</th>
          <th>Code</th>
        </tr>
        </table>
        <div className="subjectContainer">
          {semester.map((sub,index) => {
            return (
              <Link
                to={`/subjects/${sub.subjectCode}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="item">
                 {/* <img src={`/subject-image/${sub?.imgString}`} alt="" />*/}
                 <table>
        <tr>
          <td>{index+1}</td>
          <td><b>{sub.name}</b></td>
          <td><b>{sub.subjectCode}</b></td>
        </tr>
        </table> 
                  {/*<p>
                    <b>Subject</b> : {sub?.name}
                  </p>
                  <p>
                    <b>Subject Code</b> : {sub?.subjectCode}
            </p>*/}
                </div>
              </Link>
              
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Semester;
// style={{ textDecoration: "none", color: "black" }}
// target="_blank"
// href={`http://localhost:4000/subject-pdf/${sub.syllabus}`}
// key={sub?._id}
