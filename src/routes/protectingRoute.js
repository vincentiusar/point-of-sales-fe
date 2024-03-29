import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteUser } from '../redux/sliceUser';
import { deleteTransaction } from '../redux/sliceTransaction';
import { deleteOrder } from '../redux/sliceOrder';

function ProtectingRoute(props) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.users.token);
    const { restaurant, table_id } = useSelector((state) => state.transaction.transaction);
    const { id: restaurant_id } = restaurant;
    
    const dispatch = useDispatch();

    const api_url = process.env.REACT_APP_API_URL;
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user};

    useEffect(() => {
        const handleGetFood = async () => {
            try {
                await axios.get(api_url + `/restaurant/${restaurant_id}/table/${table_id}/transaction`, { headers } );
            } catch (err) {
                dispatch(deleteUser()); 
                dispatch(deleteTransaction());
                dispatch(deleteOrder());
                console.log(err);

                navigate('/');
            }
        }
        
        handleGetFood();

        return () => {}
    }, [user])
    return props.children;
}

export default ProtectingRoute