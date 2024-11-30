import React from 'react';
import axios from 'axios';

const CSVImport = () => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios.post('http://localhost:4000/api/projects/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(response => alert('Projects imported successfully'))
      .catch(error => alert('Error importing CSV:', error));
    }
  };

  const handleExport = () => {
    axios.get('http://localhost:4000/api/projects/export', { responseType: 'blob' })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'projects.csv';
        link.click();
      })
      .catch(error => alert('Error exporting CSV:', error));
  };

  return (
    <div className="my-5">
      <h3>CSV Import/Export</h3>
      <button className="btn btn-info" onClick={handleExport}>Export Projects</button>
      <input type="file" className="mt-3" onChange={handleFileChange} />
    </div>
  );
};

export default CSVImport;
