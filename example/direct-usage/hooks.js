import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const useDimensions = (type = 'window') => {
  const [screenData, setScreenData] = useState(Dimensions.get(type));

  useEffect(() => {
    const onChange = result => {
      setScreenData(result[type]);
    };

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  });

  return {
    ...screenData,
    isLandscape: screenData.width > screenData.height,
  };
};
