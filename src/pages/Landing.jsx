import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode';
import { Login } from '../components';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function Landing() {

    const [qr, setQr] = useState({});
    const [modal, setModal] = useState(false);

    useEffect(() => {

        const handleQR = async () => {
            try {
                const res = await QRCode.toDataURL('http://localhost:3000/auth?table_id=1&restaurant_id=1&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3Jlc3RhdXJhbnQvMS90cmFuc2FjdGlvbi9hZGQiLCJpYXQiOjE2NzkzMDUzOTQsImV4cCI6MTY3OTM0MTM5NCwibmJmIjoxNjc5MzA1Mzk0LCJqdGkiOiJxUFdWSHo0WWIyZWNneWpGIiwic3ViIjoiNCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.LXVZPwJq4Vvt1Av-J1jTXfBEnwW47epHAdVIrA1j5UE')
                setQr(res);
            } catch (err) {
                console.log(err);
            }
        }

        handleQR();
        
        return () => {}
    }, []);

    const handleOpenModal = () => {
        setModal(true);
    }

    // const handleTest = async () => {
    //     const res = await axios.get('http://localhost:8000/api/test');
    //     console.log(res.data);
    //     const data = await (jwt_decode(res.data));
    //     console.log(data);
    // }

    return (
        <>
            <div>
                <h1>Welcome</h1>
                <button onClick={handleOpenModal}>Login</button>
                <img src={qr}></img>
            </div>
            {modal ? 
                (
                    <Login setModal={setModal} />
                ) :
                null
            }

            {/* <button onClick={handleTest}>test</button> */}
        </>
    )
}

export default Landing;