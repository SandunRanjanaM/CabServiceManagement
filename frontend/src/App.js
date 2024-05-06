import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddPackage from './components/AddPackage';
import CabEditForm from './components/UpdatePackage/CabEditForm';
import CabTable from './components/UpdatePackage/CabTable';
import Header from './components/Header';
import ViewForm from './components/ViewForm';
import PackageCounts from './components/PackageCounts';
import UploadFile from './components/UploadFile';
import UploadedImagesPage from './components/UploadedImagesPage';
import UploadForm from './components/UploadForm';
 // Import the new component

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/add" element={<AddPackage />} />
        <Route path="/home" element={<CabTable />} />
        <Route path="/edit/:id" element={<CabEditForm />} />
        <Route path="/delete/:id" element={<CabEditForm />} />
        <Route path="/view" element={<ViewForm />} />
        <Route path="/select" element={<PackageCounts/>} />
        <Route path="/upload" element={<UploadFile/>} />
        <Route path="/uploaded-images" element={<UploadedImagesPage/>} />
        <Route path="/form" element={<UploadForm/>} />


       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
