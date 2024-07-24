import React from 'react'

const BannedPage = () => {
    return (
      <div className="min-h-screen bg-red-500 text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">You have more than 3 strikes!</h1>
      </div>
    );
}

export default BannedPage