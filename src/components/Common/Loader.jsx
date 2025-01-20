'use client'
import React from "react";
import { FallingLines, Oval } from "react-loader-spinner";

const LoaderData = () => {
  return (
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
  );
};

export default LoaderData;
