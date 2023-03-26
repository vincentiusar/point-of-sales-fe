import React from 'react'
import Loading from './Loading';

function LoadingModal() {
    return (
        <>
            <div className="fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto flex flex-col items-center">
                <div className="w-full h-full max-w-2xl">
                    <div className="bg-white rounded-lg shadow">
                        <div className="flex flex-col items-center p-6 space-y-6">
                            <Loading /> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default LoadingModal;