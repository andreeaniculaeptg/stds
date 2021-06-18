import React from 'react';

const ConfigDataContextInitializer = {
    baseUrl: 'http://localhost:9000'
}
const ConfigDataContext = React.createContext(ConfigDataContextInitializer);
export default ConfigDataContext;
