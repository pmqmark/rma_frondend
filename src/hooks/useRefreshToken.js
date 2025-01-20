import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios-folder/axios';
import { setAccessToken, setRefreshToken } from '../redux/slices/TokenReducer';
import { useSession } from 'next-auth/react';

const useRefreshToken = () => {
    // const dispatch = useDispatch();
    // const refreshToken = useSelector((state)=> state.token.refreshToken)
    const { data: session, status } = useSession();
    const refreshToken = session?.user?.refreshToken;

    const refresh = async () => {
        const response = await axios.post('/api/auth/refresh-token', {
            refreshToken: refreshToken
        });

        // dispatch(setAccessToken(response?.data?.accessToken));
        // dispatch(setRefreshToken(response?.data?.refreshToken));

        return response?.data?.accessToken;
    }
    return refresh;
};

export default useRefreshToken;