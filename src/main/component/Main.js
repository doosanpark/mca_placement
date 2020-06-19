import React, {useState, useEffect} from 'react';
import "../css/Main.css"
import axios from 'axios';
import {Link} from "react-router-dom";


function Main() {
    const [memberList, setMemberList] = useState([]);
    const [memberName, setMemberName] = useState("");
    const [inputData, setInputData] = useState();

    function getMemberFromServer() {
        axios.get('http://localhost:3001/getmembers')
            .then(function (response) {
                setMemberList(response.data);
            }).catch(function (error) {
                console.log("getmember error", error);
        });
    }

    useEffect(() => {
            getMemberFromServer();
        }, []
    )
    
    function deleteMember(id) {
        /*console.log("id", id)*/
        axios.delete('http://localhost:3001/delete_member', {data: {id: id}})
            .then(function (response) {
                console.log(response.data);
                if (response.data === "Delete Succeed") {
                    getMemberFromServer();
                }
            });
    }

    function getMemberList() {
        console.log("memberList", memberList);
        return (
            memberList.map((data) =>
                <div className={"Main__MemberList"}>
                    <div style={{width: "100px"}}>{data.NAME}</div>
                    <div>
                        <button onClick={e => {
                            deleteMember(data.ID)
                        }}>X
                        </button>
                    </div>
                </div>
            )
        )
    }

    function enrollMember() {

        axios.put('http://localhost:3001/setnewmember', {
            name: memberName
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data === "Input Succeed") {
                    getMemberFromServer();
                    setInputData("");
                    setInputData(undefined);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className={"Content"}>
            <div>
                <input id={"Main__Enroll-Member"} value={inputData} onChange={e => {
                    setMemberName(e.target.value)
                }}/>
                <button id={"Main__Enroll-Btn"} onClick={enrollMember}> 등록</button>
            </div>
            <div>
                {
                    getMemberList()
                }
            </div>
            <Link to={"/place"}>
                <button className={"Main__Float_btn"}> 자리배치로 궈궈</button>
            </Link>
        </div>
    )
}

export default Main;