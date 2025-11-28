import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Loader } from 'lucide-react';
import { postJob } from '../services/employerService';
import EmployerLayout from '../components/EmployerLayout';
import '../styles/PostJob.css';

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [postedJobId, setPostedJobId] = useState(null);
  const [postedJobTitle, setPostedJobTitle] = useState('');
  const [promoteOption, setPromoteOption] = useState('featured');
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    tags: [], // Map to job_category (in table)
    minSalary: '',
    maxSalary: '',
    contractType: '',
    experience: '',
    jobType: '',
    vacancies: '',
    expirationDate: '',
    jobLevel: '',
    city: '', // Map to Location (max 30 chars)
    jobDescription: '', // Map to JD (max 500 chars)
    skills: [] // Map to require table
  });

  const [currentTag, setCurrentTag] = useState('');

  // Predefined options - Dựa trên schema database
  // Số năm kinh nghiệm (0-10+)
  const experienceLevels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];
  
  // JobType trong DB: Onsite, Remote, Hybrid
  const jobTypes = [
    { value: 'Onsite', label: 'Tại văn phòng' },
    { value: 'Remote', label: 'Làm việc từ xa' },
    { value: 'Hybrid', label: 'Kết hợp' }
  ];
  
  // Level trong DB: Intern, Fresher, Junior, Middle, Senior, Manager, Leader
  const jobLevels = [
    { value: 'Intern', label: 'Thực tập sinh' },
    { value: 'Fresher', label: 'Mới ra trường' },
    { value: 'Junior', label: 'Nhân viên' },
    { value: 'Middle', label: 'Nhân viên chính' },
    { value: 'Senior', label: 'Nhân viên cao cấp' },
    { value: 'Manager', label: 'Quản lý' },
    { value: 'Leader', label: 'Trưởng nhóm' }
  ];
  
  // ContractType trong DB: Fulltime, Parttime, Freelance, Internship
  const contractTypes = [
    { value: 'Fulltime', label: 'Toàn thời gian' },
    { value: 'Parttime', label: 'Bán thời gian' },
    { value: 'Freelance', label: 'Tự do' },
    { value: 'Internship', label: 'Thực tập' }
  ];

  // Các thành phố lớn tại Việt Nam
  const cities = [
    'Hà Nội',
    'TP. Hồ Chí Minh',
    'Đà Nẵng',
    'Hải Phòng',
    'Cần Thơ',
    'Biên Hòa',
    'Nha Trang',
    'Huế',
    'Vũng Tàu',
    'Quy Nhơn',
    'Khác'
  ];

  // Kỹ năng phổ biến cho ngành IT - map to skill table
  // Schema: skill table có SkillName (max 20 chars), Description
  const skillsList = [
    'JavaScript',
    'TypeScript',
    'React',
    'Vue.js',
    'Angular',
    'Node.js',
    'Java',
    'Python',
    'C#',
    'PHP',
    'SQL',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
    'Git',
    'Figma',
    'Adobe XD'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(currentTag.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, currentTag.trim()]
        }));
      }
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    
    // Validate độ dài theo schema
    if (formData.jobTitle.length > 20) {
      setError('Tên công việc không được quá 20 ký tự!');
      return;
    }
    
    if (formData.jobDescription.length > 500) {
      setError('Mô tả công việc không được quá 500 ký tự!');
      return;
    }
    
    if (formData.city.length > 30) {
      setError('Tên địa điểm không được quá 30 ký tự!');
      return;
    }
    
    // Validate lương
    const minSal = parseInt(formData.minSalary);
    const maxSal = parseInt(formData.maxSalary);
    
    if (minSal <= 0) {
      setError('Lương tối thiểu phải lớn hơn 0!');
      return;
    }
    
    if (maxSal <= minSal) {
      setError('Lương tối đa phải lớn hơn lương tối thiểu!');
      return;
    }
    
    // Validate ngày
    const today = new Date();
    const expireDate = new Date(formData.expirationDate);
    
    if (expireDate <= today) {
      setError('Ngày hết hạn phải sau ngày hôm nay!');
      return;
    }
    
    // Validate số lượng
    const quantity = parseInt(formData.vacancies);
    if (quantity < 1) {
      setError('Số lượng tuyển phải ít nhất là 1!');
      return;
    }
    
    try {
      setLoading(true);
      
      // Get employerId from localStorage
      const employerId = localStorage.getItem('employerId') || '1'; // Default to 1 for testing
      // TODO: Uncomment this when authentication is implemented
      if (!employerId) {
        setError('Vui lòng đăng nhập để đăng tin tuyển dụng!');
        setLoading(false);
        return;
      }
      
      // Transform data theo schema database
      // Schema: job table - JobName (max 20), JD (max 500), JobType, ContractType, Level,
      // Quantity (>=1), SalaryFrom (>0), SalaryTo (>SalaryFrom), RequiredExpYear, 
      // Location (max 30), PostDate, ExpireDate (>PostDate), JobStatus, EmployerID
      const jobData = {
        JobName: formData.jobTitle,
        JD: formData.jobDescription,
        JobType: formData.jobType,
        ContractType: formData.contractType,
        Level: formData.jobLevel,
        Quantity: quantity,
        SalaryFrom: minSal,
        SalaryTo: maxSal,
        RequiredExpYear: parseInt(formData.experience),
        Location: formData.city,
        PostDate: new Date().toISOString().split('T')[0],
        ExpireDate: formData.expirationDate,
        JobStatus: 'Active',
        NumberOfApplicant: 0,
        EmployerID: parseInt(employerId),
        
        // Relations - will be handled separately in backend
        categories: formData.tags, // Insert into 'in' table (JobID, JCName)
        skills: formData.skills // Insert into 'require' table (JobID, SkillName)
      };
      
      console.log('Sending job data:', jobData);
      
      // Call API (fallback to localStorage if API not available)
      try {
        const response = await postJob(jobData);
        
        if (response.success || response.data) {
          const newJobId = response.data?.JobID || response.jobId || Date.now();
          
          // Lưu job vào localStorage để có thể xem qua API/fallback
          const savedJobs = JSON.parse(localStorage.getItem('postedJobs') || '[]');
          const newJob = {
            ...jobData,
            JobID: newJobId,
            PostDate: new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString()
          };
          savedJobs.push(newJob);
          localStorage.setItem('postedJobs', JSON.stringify(savedJobs));
          
          // Hiển thị modal success
          setPostedJobId(newJobId);
          setPostedJobTitle(formData.jobTitle);
          setShowSuccessModal(true);
        } else {
          setError(response.message || 'Có lỗi xảy ra khi đăng tin!');
        }
      } catch (apiError) {
        // Fallback: Lưu vào localStorage khi API chưa có
        console.log('API not available, saving to localStorage:', apiError);
        
        const newJobId = Date.now();
        const savedJobs = JSON.parse(localStorage.getItem('postedJobs') || '[]');
        const newJob = {
          ...jobData,
          JobID: newJobId,
          PostDate: new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString()
        };
        savedJobs.push(newJob);
        localStorage.setItem('postedJobs', JSON.stringify(savedJobs));
        
        // Hiển thị modal success
        setPostedJobId(newJobId);
        setPostedJobTitle(formData.jobTitle);
        setShowSuccessModal(true);
      }
      
    } catch (error) {
      console.error('Error posting job:', error);
      setError(error.message || 'Không thể kết nối đến server. Vui lòng thử lại sau!');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Reset form
    setFormData({
      jobTitle: '',
      tags: [],
      minSalary: '',
      maxSalary: '',
      contractType: '',
      experience: '',
      jobType: '',
      vacancies: '',
      expirationDate: '',
      jobLevel: '',
      city: '',
      jobDescription: '',
      skills: []
    });
  };

  const handleViewJobs = () => {
    navigate('/employer/my-jobs');
  };

  const handlePromoteJob = () => {
    // Logic để promote job (tính năng premium)
    console.log('Promoting job with option:', promoteOption);
    alert(`Tin "${postedJobTitle}" đã được nâng cấp với tùy chọn: ${promoteOption === 'featured' ? 'Nổi bật' : 'Làm nổi bật'}`);
    handleCloseModal();
    navigate('/employer/my-jobs');
  };

  return (
    <EmployerLayout>
      <div className="post-job-container">
        <div className="post-job-header">
          <h1>Đăng tin tuyển dụng</h1>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="success-message">
            <span>✓</span> {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <span>✕</span> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="post-job-form">
        {/* Job Title */}
        <div className="form-section">
          <div className="form-group">
            <label>Tên công việc *</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Ví dụ: Frontend Dev, UI/UX Designer (tối đa 20 ký tự)"
              required
              maxLength={20}
            />
            <p className="help-text">JobName tối đa 20 ký tự</p>
          </div>

          {/* Tags - Map to job_category */}
          <div className="form-group">
            <label>Danh mục công việc</label>
            <div className="tags-container">
              <div className="tags-list">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="tag-remove"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={handleAddTag}
                placeholder="Thêm danh mục và nhấn Enter (vd: Development, Design, Marketing)"
              />
            </div>
            <p className="help-text">Ví dụ: Development, Design, Marketing, IT & Software</p>
          </div>
        </div>

        {/* Salary */}
        <div className="form-section">
          <h3>Mức lương (VNĐ/tháng)</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Lương tối thiểu *</label>
              <input
                type="number"
                name="minSalary"
                value={formData.minSalary}
                onChange={handleInputChange}
                placeholder="Ví dụ: 10000000 (10 triệu)"
                required
              />
            </div>
            <div className="form-group">
              <label>Lương tối đa *</label>
              <input
                type="number"
                name="maxSalary"
                value={formData.maxSalary}
                onChange={handleInputChange}
                placeholder="Ví dụ: 20000000 (20 triệu)"
                required
              />
            </div>
          </div>
          <p className="help-text">Nhập mức lương bằng VNĐ/tháng (ví dụ: 15000000 cho 15 triệu).</p>
        </div>

        {/* Advanced Information */}
        <div className="form-section">
          <h3>Thông tin chi tiết</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Loại hợp đồng *</label>
              <select
                name="contractType"
                value={formData.contractType}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Chọn loại hợp đồng --</option>
                {contractTypes.map((type, index) => (
                  <option key={index} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Số năm kinh nghiệm *</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Chọn kinh nghiệm --</option>
                {experienceLevels.map((level, index) => (
                  <option key={index} value={level}>{level} năm</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Hình thức làm việc *</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Chọn hình thức --</option>
                {jobTypes.map((type, index) => (
                  <option key={index} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Số lượng tuyển *</label>
              <input
                type="number"
                name="vacancies"
                value={formData.vacancies}
                onChange={handleInputChange}
                placeholder="Ví dụ: 2"
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label>Ngày hết hạn *</label>
              <input
                type="date"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="form-group">
              <label>Cấp bậc *</label>
              <select
                name="jobLevel"
                value={formData.jobLevel}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Chọn cấp bậc --</option>
                {jobLevels.map((level, index) => (
                  <option key={index} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="form-section">
          <h3>Địa điểm làm việc</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Địa điểm *</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Chọn địa điểm --</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
              <p className="help-text">Tối đa 30 ký tự</p>
            </div>
          </div>
        </div>

        {/* Job Skills */}
        <div className="form-section">
          <h3>Kỹ năng yêu cầu</h3>
          <p className="help-text">Chọn các kỹ năng cần thiết cho vị trí này</p>
          <div className="benefits-grid">
            {skillsList.map((skill, index) => (
              <label key={index} className="benefit-checkbox">
                <input
                  type="checkbox"
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Description */}
        <div className="form-section">
          <h3>Mô tả công việc *</h3>
          <div className="form-group">
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              placeholder="Mô tả chi tiết về công việc, yêu cầu, quyền lợi... (tối đa 500 ký tự)"
              rows="10"
              required
              maxLength={500}
            />
            <p className="help-text">JD (Job Description) phải tối đa 500 ký tự theo schema. Hiện tại: {formData.jobDescription.length}/500</p>
            <div className="editor-toolbar">
              <button type="button" title="Bold"><strong>B</strong></button>
              <button type="button" title="Italic"><em>I</em></button>
              <button type="button" title="Underline"><u>U</u></button>
              <button type="button" title="Link">🔗</button>
              <button type="button" title="Bullet List">•</button>
              <button type="button" title="Numbered List">1.</button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size={18} className="spinner" />
                Đang đăng tin...
              </>
            ) : (
              <>
                Đăng tin ngay →
              </>
            )}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal-overlay" onClick={handleCloseModal}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              <X size={24} />
            </button>

            {/* Success Header */}
            <div className="modal-header">
              <div className="success-icon">🎉</div>
              <h2>Chúc mừng! Tin tuyển dụng đã được đăng thành công!</h2>
              <p className="modal-subtitle">Bạn có thể quản lý tin đăng của mình trong phần Tin đã đăng</p>
              <button className="view-jobs-btn" onClick={handleViewJobs}>
                Xem tin đã đăng →
              </button>
            </div>

            {/* Promote Section */}
            <div className="promote-section">
              <h3>Nâng cấp tin: {postedJobTitle}</h3>
              <p className="promote-description">
                Nâng cấp tin tuyển dụng để tăng khả năng tiếp cận ứng viên. Chọn gói phù hợp với nhu cầu của bạn.
              </p>

              <div className="promote-options">
                {/* Featured Option */}
                <div 
                  className={`promote-card ${promoteOption === 'featured' ? 'selected' : ''}`}
                  onClick={() => setPromoteOption('featured')}
                >
                  <div className="promote-card-header">
                    <input 
                      type="radio" 
                      name="promote" 
                      checked={promoteOption === 'featured'}
                      onChange={() => setPromoteOption('featured')}
                    />
                    <h4>Tin nổi bật</h4>
                  </div>
                  <div className="promote-preview">
                    <div className="preview-badge featured">LUÔN Ở ĐẦU TRANG</div>
                  </div>
                  <p className="promote-description-text">
                    Tin tuyển dụng của bạn sẽ luôn hiển thị ở vị trí đầu tiên trong kết quả tìm kiếm.
                  </p>
                </div>

                {/* Highlight Option */}
                <div 
                  className={`promote-card ${promoteOption === 'highlight' ? 'selected' : ''}`}
                  onClick={() => setPromoteOption('highlight')}
                >
                  <div className="promote-card-header">
                    <input 
                      type="radio" 
                      name="promote" 
                      checked={promoteOption === 'highlight'}
                      onChange={() => setPromoteOption('highlight')}
                    />
                    <h4>Làm nổi bật</h4>
                  </div>
                  <div className="promote-preview">
                    <div className="preview-badge highlight">TÔ MÀU NỔI BẬT</div>
                  </div>
                  <p className="promote-description-text">
                    Tin tuyển dụng của bạn sẽ được tô màu nổi bật để thu hút sự chú ý của ứng viên.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="modal-actions">
                <button className="skip-btn" onClick={handleCloseModal}>
                  Bỏ qua
                </button>
                <button className="promote-btn" onClick={handlePromoteJob}>
                  NÂNG CẤP TIN →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </EmployerLayout>
  );
};

export default PostJob;
