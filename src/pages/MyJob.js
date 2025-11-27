import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Calendar, Eye, Trash2, Edit, Users } from 'lucide-react';
import EmployerLayout from '../components/EmployerLayout';
import '../styles/MyJob.css';

const MyJob = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // all, active, expired

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    setLoading(true);
    try {
      // Get current employer ID
      const currentEmployerId = parseInt(localStorage.getItem('employerId') || '1');
      
      // Load jobs from localStorage
      const allJobs = JSON.parse(localStorage.getItem('postedJobs') || '[]');
      
      console.log('All jobs:', allJobs);
      console.log('Current employer ID:', currentEmployerId);
      
      // Filter jobs by current employer only
      const employerJobs = allJobs.filter(job => {
        console.log(`Job ${job.JobID} - EmployerID: ${job.EmployerID} (type: ${typeof job.EmployerID})`);
        return Number(job.EmployerID) === Number(currentEmployerId);
      });
      
      console.log('Filtered employer jobs:', employerJobs);
      
      setJobs(employerJobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này?')) {
      // Get current employer ID
      const currentEmployerId = parseInt(localStorage.getItem('employerId') || '1');
      
      // Load all jobs
      const allJobs = JSON.parse(localStorage.getItem('postedJobs') || '[]');
      
      // Remove only the job that belongs to current employer
      const updatedJobs = allJobs.filter(job => 
        !(job.JobID === jobId && Number(job.EmployerID) === Number(currentEmployerId))
      );
      
      localStorage.setItem('postedJobs', JSON.stringify(updatedJobs));
      
      // Update local state
      const updatedEmployerJobs = jobs.filter(job => job.JobID !== jobId);
      setJobs(updatedEmployerJobs);
      
      alert('Đã xóa tin tuyển dụng thành công!');
    }
  };

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleEditJob = (jobId) => {
    // TODO: Implement edit functionality
    alert('Tính năng chỉnh sửa đang được phát triển!');
  };

  // Format VND
  const formatVND = (amount) => {
    if (!amount) return '0';
    const millions = amount / 1000000;
    if (millions >= 1) {
      return `${millions.toFixed(0)} triệu`;
    }
    return `${(amount / 1000).toFixed(0)}k`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Check if job is expired
  const isJobExpired = (expireDate) => {
    if (!expireDate) return false;
    return new Date(expireDate) < new Date();
  };

  // Filter jobs based on active tab
  const filteredJobs = jobs.filter(job => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return !isJobExpired(job.ExpireDate) && job.JobStatus === 'Active';
    if (activeTab === 'expired') return isJobExpired(job.ExpireDate) || job.JobStatus === 'Đã đóng';
    return true;
  });

  return (
    <EmployerLayout>
      <div className="my-job-container">
      {/* Header */}
      <div className="my-job-header">
        <div className="header-content">
          <h1>Tin đã đăng</h1>
        </div>
        <button className="btn-post-new" onClick={() => navigate('/employer/post-job')}>
          + Đăng tin mới
        </button>
      </div>

      {/* Tabs */}
      <div className="job-tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Tất cả ({jobs.length})
        </button>
        <button 
          className={`tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Đang hoạt động ({jobs.filter(j => !isJobExpired(j.ExpireDate) && j.JobStatus === 'Active').length})
        </button>
        <button 
          className={`tab ${activeTab === 'expired' ? 'active' : ''}`}
          onClick={() => setActiveTab('expired')}
        >
          Đã hết hạn ({jobs.filter(j => isJobExpired(j.ExpireDate) || j.JobStatus === 'Đã đóng').length})
        </button>
      </div>

      {/* Jobs List */}
      <div className="jobs-list">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Đang tải tin đăng...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="empty-state">
            <Briefcase size={64} color="#d1d5db" />
            <h3>Chưa có tin tuyển dụng nào</h3>
            <p>Bắt đầu đăng tin tuyển dụng đầu tiên của bạn</p>
            <button className="btn-post-first" onClick={() => navigate('/employer/post-job')}>
              Đăng tin ngay
            </button>
          </div>
        ) : (
          filteredJobs.map(job => (
            <div key={job.JobID} className={`job-card ${isJobExpired(job.ExpireDate) ? 'expired' : ''}`}>
              <div className="job-card-header">
                <div className="job-title-section">
                  <h3 className="job-title">{job.JobName}</h3>
                  <div className="job-meta">
                    <span className="meta-item">
                      <MapPin size={16} />
                      {job.Location}
                    </span>
                    <span className="meta-item">
                      <DollarSign size={16} />
                      {formatVND(job.SalaryFrom)} - {formatVND(job.SalaryTo)} VNĐ
                    </span>
                    <span className="meta-item">
                      <Calendar size={16} />
                      Hết hạn: {formatDate(job.ExpireDate)}
                    </span>
                  </div>
                </div>
                <div className="job-badges">
                  <span className={`badge ${job.JobType?.toLowerCase()}`}>
                    {job.JobType === 'Onsite' ? 'Tại văn phòng' : 
                     job.JobType === 'Remote' ? 'Từ xa' : 
                     job.JobType === 'Hybrid' ? 'Kết hợp' : job.JobType}
                  </span>
                  <span className={`badge ${job.ContractType?.toLowerCase()}`}>
                    {job.ContractType === 'Fulltime' ? 'Toàn thời gian' :
                     job.ContractType === 'Parttime' ? 'Bán thời gian' :
                     job.ContractType === 'Internship' ? 'Thực tập' : 
                     job.ContractType === 'Freelance' ? 'Tự do' : job.ContractType}
                  </span>
                  {isJobExpired(job.ExpireDate) && (
                    <span className="badge expired-badge">Đã hết hạn</span>
                  )}
                </div>
              </div>

              <div className="job-card-body">
                <p className="job-description">{job.JD}</p>
                
                <div className="job-stats">
                  <div className="stat-item">
                    <Users size={18} />
                    <span>{job.NumberOfApplicant || 0} ứng viên</span>
                  </div>
                  <div className="stat-item">
                    <Briefcase size={18} />
                    <span>Cấp bậc: {job.Level}</span>
                  </div>
                  <div className="stat-item">
                    <Calendar size={18} />
                    <span>Đăng: {formatDate(job.PostDate)}</span>
                  </div>
                </div>

                {job.skills && job.skills.length > 0 && (
                  <div className="job-skills">
                    <strong>Kỹ năng:</strong>
                    <div className="skills-list">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="job-card-footer">
                <button className="btn-action view" onClick={() => handleViewJob(job.JobID)}>
                  <Eye size={18} />
                  Xem chi tiết
                </button>
                <button className="btn-action edit" onClick={() => handleEditJob(job.JobID)}>
                  <Edit size={18} />
                  Chỉnh sửa
                </button>
                <button className="btn-action delete" onClick={() => handleDeleteJob(job.JobID)}>
                  <Trash2 size={18} />
                  Xóa
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </EmployerLayout>
  );
};

export default MyJob;
