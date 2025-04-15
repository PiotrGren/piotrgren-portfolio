import {Routes, Route} from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Certificates from './pages/Certificates'
import CertificateDetail from './pages/CertificatesDetail'
import Education from './pages/Education'
import Thesis from './pages/Thesis'
import NotFound from './pages/NotFound'
//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <Routes>
      {/* Strony z layoutem */}
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/certificates/:id" element={<CertificateDetail />} />
        <Route path="/education" element={<Education />} />
        <Route path="/education/thesis" element={<Thesis />} />
      </Route>

      {/* 404 - bez layoutu */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
