import React, {useEffect} from 'react';
import {axiosInstance} from '../network';
import {NETWORK_URLS} from '../constants/networkUrls';

const Tesla = () => {
  useEffect(() => {
    axiosInstance.post(NETWORK_URLS.TESLA_ENDPOINT).then(data => {
      console.log(data.data);
    });
  }, []);
  return <></>;
};

export default Tesla;
