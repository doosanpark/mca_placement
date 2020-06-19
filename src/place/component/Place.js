import React, {useState, useEffect} from 'react';
import "../css/Place.css"
import axios from 'axios';
import {Link} from "react-router-dom";

function Place() {

    const [memberList, setMemberList] = useState([]);

    useEffect(() =>
            getMemberFromServer()
        , [])

    function getMemberFromServer() {
        axios.get('http://localhost:3001/getmembers')
            .then(function (response) {
                setMemberList(response.data.sort());
                console.log("sort", response.data.sort());

            }).catch(function (error) {
            console.log("getmember error", error);
        });
    }

    function getMemberListLeft() {
        console.log("memberList", memberList);
        let i = 0;
        return (
            memberList.map((member) => (
                    i++,

                        i < 18 ?
                            (<div className={"item"}>
                                {member.NAME}
                            </div>) : ("")


                )
            )
        )
    }

    function getMemberListRight() {
        let i = 0;
        return (
            memberList.map((member) => (
                    i++,

                        i >= 18 ?
                            (<div className={"item"}>
                                {member.NAME}
                            </div>) : ("")


                )
            )
        )
    }


    return (
        <div className={"Place"} style={{width: "100%"}}>
            <div className={"Place__Head"}>
                <div style={{fontSize: "18px"}}></div>
                <div className={"Place__Head-title"}>두근두근 설레는 자리배치</div>
                <div className={"Place__Head-Temperature"} style={{fontSize: "18px"}}>체온체크 plz..</div>
            </div>
            <div style={{width: "300px", height: "40px", margin: "20px", border: "1px solid black"}}>
                칠판
            </div>
            <div className={"Place__Body"}>
                <div className={"Place__Body-left"}>
                    {getMemberListLeft()}
                </div>

                <div className={"Place__Body-right"}>
                    {getMemberListRight()}
                </div>

            </div>
        </div>
    )
}


export default Place;