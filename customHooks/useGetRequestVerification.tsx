import { REACT_NATIVE_BACKEND_IP } from "@env";
import axios from "axios";
import { useState } from "react";

function useGetRequestVerification() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [responseData, setResponseData] = useState<any>(null); // 서버 응답 데이터를 저장할 상태

    const getRequestVerification = async (email: string) => {
        try {
            setLoading(true);
            setError(null);
            console.log('Trying to send verification code...');

            // 인증 코드 요청
            console.log(REACT_NATIVE_BACKEND_IP);
            const jsonResponse = await axios.get(`http://${REACT_NATIVE_BACKEND_IP}/api/request_verification/${email}`);

            // 응답 데이터 상태에 저장
            setResponseData(jsonResponse.data);
            return jsonResponse.data; // 응답 데이터를 반환
        } catch (err: any) {
            setError(err.response?.data?.message || '메일 전송에 실패하였습니다.');
            console.error('Error while sending verification code:', err);
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };

    return { getRequestVerification, loading, error, responseData }; // 훅을 사용하는 컴포넌트에서 필요한 값을 반환
}

export default useGetRequestVerification;