import React from 'react';
import ViewForm from './ViewForm';
import SelectedPackagesTable from './SelectedPackagesTable';
import useSelectionLogic from './SelectionLogic/';

const MainComponent = () => {
    const { selectedPackages, handleSelect } = useSelectionLogic();

    return (
        <div>
            <ViewForm handleSelect={handleSelect} />
            <SelectedPackagesTable selectedPackages={selectedPackages} />
        </div>
    );
};

export default MainComponent;
