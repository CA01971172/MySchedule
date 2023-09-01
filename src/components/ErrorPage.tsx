import React from 'react';

export default function ErrorPage({ errorCode }: { errorCode: string }){
    let errorMessage: string, errorDescription: string;

    switch (errorCode) {
        case 'serviceEnded':
            errorMessage = '申し訳ありません、サービスは終了しました。';
            errorDescription = 'MyScheduleサービスは終了しました。ご利用いただき、ありがとうございました。';
            break;
        case 'maintenance':
            errorMessage = '申し訳ありません、現在メンテナンス中です。';
            errorDescription = 'MyScheduleサービスは一時的にメンテナンス中です。ご不便をおかけして申し訳ありません。';
            break;
        case 'communicationError':
            errorMessage = '申し訳ありません、通信障害が発生しました。';
            errorDescription = 'MyScheduleサービスに通信障害が発生しています。ご不便をおかけして申し訳ありません。';
            break;
        default:
            errorMessage = '申し訳ありません、エラーが発生しました。';
            errorDescription = '現在、MyScheduleサービスは利用できません。';
    }

    return (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '24px', color: '#ff0000', marginBottom: '20px' }}>{errorMessage}</div>
            <div style={{ fontSize: '18px', color: '#333', marginBottom: '40px' }}>{errorDescription}</div>
            <div style={{ fontSize: '16px', color: '#777' }}>
                お問い合わせ先: <a href="mailto:CA01971172@st.kawahara.ac.jp">CA01971172@st.kawahara.ac.jp</a>
            </div>
        </div>
    );
};