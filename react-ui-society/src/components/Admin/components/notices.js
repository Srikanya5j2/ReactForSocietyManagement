import React, { useState } from 'react';
import axios from 'axios';

function AddNotice(){
  const [noticeData, setNoticeData] = useState({
    content: '',
    date: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8085/notices/addNotices', noticeData);
      console.log('Notice added successfully:', response.data);
      
      setNoticeData({ content: '', date: '' });
    } catch (error) {
      console.error('Error adding notice:', error.response?.data || 'Something went wrong');
      
    }
  };

  return (
    <div className="container mt-4">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Notice</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">Content:</label>
                <textarea
                  className="form-control"
                  id="content"
                  value={noticeData.content}
                  onChange={(e) => setNoticeData({ ...noticeData, content: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={noticeData.date}
                  onChange={(e) => setNoticeData({ ...noticeData, date: e.target.value })}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Add Notice</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AddNotice;
