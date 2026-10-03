import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateFolderForm } from './components/CreateFolderForm';
import { FolderList } from './components/FolderList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateFolderForm />} />
        <Route path="/folders" element={<FolderList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;