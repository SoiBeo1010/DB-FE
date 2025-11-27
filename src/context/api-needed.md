1. GET /api/stats - Lấy thống kê tổng quan hệ thống (cho homepage)
```json
[
  {
    "icon": "briefcase",
    "number": "175,324",
    "label": "Live Job"
  },
  {
    "icon": "building",
    "number": "97,354",
    "label": "Companies"
  },
  {
    "icon": "users",
    "number": "3,847,154",
    "label": "Candidates"
  },
  {
    "icon": "file",
    "number": "7,532",
    "label": "New Jobs"
  }
]
```

2. GET /api/categories
```json
[
  {
    "id": 1,
    "icon": "code",
    "name": "Software Engineering",
    "openPositions": 35241
  },
  {
    "id": 2,
    "icon": "layout",
    "name": "Frontend Developer",
    "openPositions": 18273
  },
  {
    "id": 3,
    "icon": "server",
    "name": "Backend Developer",
    "openPositions": 16192
  },
  {
    "id": 4,
    "icon": "smartphone",
    "name": "Mobile Developer",
    "openPositions": 9874
  },
  {
    "id": 5,
    "icon": "gitbranch",
    "name": "DevOps Engineer",
    "openPositions": 8201
  },
  {
    "id": 6,
    "icon": "bug",
    "name": "QA / Tester",
    "openPositions": 7834
  },
  {
    "id": 7,
    "icon": "palette",
    "name": "UI/UX Designer",
    "openPositions": 6923
  },
  {
    "id": 8,
    "icon": "cpu",
    "name": "AI / Machine Learning",
    "openPositions": 3741
  }
]
```

 ## 3.GET /api/companies/top - Lấy danh sách công ty nổi bật (cho homepage) (dùng hàm trong 2.4, cái nào trustscore cao thì xếp vào)
###Success Response (200)
```json
[
  {
    "CompanyID": 1,
    "CompanyName": "FPT Software",
    "Logo": "https://cdn.topcv.vn/100/company_logos/fpt-software-6159c8f08d0a8.jpg",
    "CompanySize": "25,000+ employees",
    "Website": "https://fpt-software.com",
    "Description": "Công ty công nghệ hàng đầu Việt Nam",
    "Industry": "Information Technology & Services",
    "CNationality": "Vietnam",
    "openPositions": 428,
    "rating": 4.8,
  },
  {
    "CompanyID": 2,
    "CompanyName": "VNG Corporation",
    "Logo": "https://cdn.topcv.vn/100/company_logos/vng-corporation-614e5f5e8d0a8.jpg",
    "CompanySize": "3,000 - 5,000 employees",
    "Website": "https://vng.com.vn",
    "Description": "Zalo • Zing • Cloud • Game",
    "Industry": "Internet",
    "CNationality": "Vietnam",
    "openPositions": 312,
    "rating": 4.7,
    }
    ]
    
```

## 4. GET /jobs - Job List Response

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "JobID": 1,
        "JobName": "Trưởng Phòng Kinh Doanh BDS",
        "CompanyName": "CÔNG TY CỔ PHẦN ĐỊA ỐC MAI VIỆT",
        "CompanyLogo": "https://cdn.example.com/logos/mai-viet.png",
        "Location": "Hồ Chí Minh",
        "ContractType": "Fulltime",
        "JobType": "Onsite",
        "Level": "Manager",
        "Salary": "12 - 300 triệu",
        "RequireExpYear": 3,
        "postDate": "2024-11-20T10:30:00Z",
        "expireDate": "2024-12-25T23:59:59Z",
        "NumberOfApplicant": 25,
        "Views": 150,
        "featured": true,
        "urgent": false,
        "JobStatus": "published"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 3,
      "total_jobs": 25,
      "per_page": 9,
      "has_next": true,
      "has_prev": false
    }
  },
  "message": "Jobs retrieved successfully"
}
```

## 5. GET /jobs/{jobId} - Job Details Response

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "JobID": 1,
    "JobName": "Trưởng Phòng Kinh Doanh BDS - (Thu Nhập Không Giới Hạn) Tại Hồ Chí Minh",
    "JD": "Quản lý, đào tạo và theo dõi hiệu quả bán hàng của nhóm...",
    "Location": "Hồ Chí Minh",
    "salaryFrom": 12000000,
    "salaryTo": 300000000,
    "Salary": "12 - 300 triệu",
    "Quantity": 5,
    "RequireExpYear": 3,
    "Level": "Manager",
    "ContractType": "Fulltime",
    "JobType": "Onsite",
    "JobStatus": "published",
    "postDate": "2024-11-20T10:30:00Z",
    "expireDate": "2024-12-25T23:59:59Z",
    "NumberOfApplicant": 87,
    "statistics": [
  {
    "label": "Total Applications",
    "number": "87"
  },
  {
    "label": "Approved Applications",
    "number": "12"
  },
  {
    "label": "Declined Applications",
    "number": "68"
  }
]
    "Views": 1250,
    "featured": true,
    "urgent": false,
    "company": {
      "CompanyID": 1,
      "CompanyName": "CÔNG TY CỔ PHẦN ĐỊA ỐC MAI VIỆT",
      "TaxNumber": "0123456789",
      "Industry": "Real Estate",
      "CompanySize": "201-500",
      "Website": "https://maiviet.com.vn",
      "Nationality": "Vietnam",
      "Logo": "https://cdn.example.com/logos/mai-viet.png",
      "Description": "Công ty Cổ phần Địa ốc Mai Việt...",
      "Address": "123 Nguyễn Huệ, Q1, HCM"
    },
    "categories": [
      {
        "JCName": "Real Estate",
        "Speciality": "Bất động sản và đầu tư"
      }
    ],
    "requiredSkills": [
      {
        "SkillName": "Sales Management",
        "RequiredLevel": "Advanced",
        "IsRequired": true,
        "Description": "Kỹ năng quản lý bán hàng"
      }
    ]
  },
  "message": "Job details retrieved successfully"
}
```

## 6. POST /jobs/{jobId}/favorite - Favorite Job

### Success Response (201)
```json
{
  "success": true,
  "data": {
    "JobID": 1,
    "favorited": true,
    "SaveDate": "2024-11-25T14:30:00Z"
  },
  "message": "Job added to favorites successfully"
}
```

## 7. POST /jobs/{jobId}/apply - Apply for Job

### Request Body
```json
{
  "CoverLetter": "Kính gửi Ban tuyển dụng...",
  "uploadCV": "https://storage.example.com/resumes/user123.pdf"
}
```

### Success Response (201)
```json
{
  "success": true,
  "data": {
    "JobID": 1,
    "UserID": 50,
    "Status": "submitted",
    "applied_at": "2024-11-25T14:30:00Z"
  },
  "message": "Đơn ứng tuyển đã được gửi thành công"
}
```

## 8. GET /jobs/{jobId}/check-status - Check User Status

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "JobID": 1,
    "favorited": true,
    "applied": false,
    "canApply": true,
    "applicationDeadline": "2024-12-25T23:59:59Z"
  },
  "message": "Job status retrieved successfully"
}
```

---

# EMPLOYER DASHBOARD APIs

## 9. GET /api/employer/:employerId/stats - Lấy thống kê dashboard nhà tuyển dụng

### Request
- **Method:** GET
- **URL:** `/api/employer/:employerId/stats`
- **Headers:** 
  - `Authorization: Bearer {token}`

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "openJobs": 589,
    "NumberOfOpenedJob": 589,
    "savedCandidates": 2517,
    "totalFollowers": 2517,
    "totalApplications": 12543,
    "newApplicationsToday": 87,
    "activeJobs": 542,
    "expiredJobs": 47
  },
  "message": "Stats retrieved successfully"
}
```

### SQL Query
```sql
SELECT 
  e.NumberOfOpenedJob,
  COUNT(DISTINCT f.CandidateID) as totalFollowers,
  COUNT(DISTINCT a.CandidateID) as totalApplications,
  SUM(CASE WHEN j.JobStatus = 'Active' AND j.ExpireDate > CURDATE() THEN 1 ELSE 0 END) as activeJobs,
  SUM(CASE WHEN j.JobStatus = 'Expired' OR j.ExpireDate <= CURDATE() THEN 1 ELSE 0 END) as expiredJobs
FROM employer e
LEFT JOIN follow f ON e.ID = f.EmployerID
LEFT JOIN job j ON e.ID = j.EmployerID
LEFT JOIN apply a ON j.JobID = a.JobID
WHERE e.ID = ?
GROUP BY e.ID;
```

## 10. GET /api/employer/:employerId/jobs - Lấy danh sách tin tuyển dụng của nhà tuyển dụng

### Request
- **Method:** GET
- **URL:** `/api/employer/:employerId/jobs?page=1&limit=10&status=all`
- **Headers:** 
  - `Authorization: Bearer {token}`
- **Query Parameters:**
  - `page` (default: 1)
  - `limit` (default: 10)
  - `status` ('active', 'expired', 'all')

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "JobID": 1,
        "JobName": "UI/UX Designer",
        "JobType": "Full Time",
        "ContractType": "Permanent",
        "Level": "Senior",
        "PostDate": "2025-11-01",
        "ExpireDate": "2025-12-24",
        "JobStatus": "Active",
        "NumberOfApplicant": 798,
        "Location": "Hà Nội",
        "SalaryFrom": 15000000,
        "SalaryTo": 25000000,
        "Quantity": 2,
        "RequiredExpYear": 3
      }
    ],
    "pagination": {
      "total": 589,
      "page": 1,
      "totalPages": 59,
      "limit": 10
    }
  },
  "message": "Jobs retrieved successfully"
}
```

### SQL Query
```sql
SELECT 
  j.JobID,
  j.JobName,
  j.JobType,
  j.ContractType,
  j.Level,
  j.PostDate,
  j.ExpireDate,
  j.JobStatus,
  j.NumberOfApplicant,
  j.Location,
  j.SalaryFrom,
  j.SalaryTo,
  j.Quantity,
  j.RequiredExpYear
FROM job j
WHERE j.EmployerID = ?
  AND (? = 'all' OR 
       (? = 'active' AND j.JobStatus = 'Active' AND j.ExpireDate > CURDATE()) OR
       (? = 'expired' AND (j.JobStatus = 'Expired' OR j.ExpireDate <= CURDATE())))
ORDER BY j.PostDate DESC
LIMIT ? OFFSET ?;
```

## 11. GET /api/jobs/:jobId/applications - Lấy danh sách ứng tuyển cho 1 tin

### Request
- **Method:** GET
- **URL:** `/api/jobs/:jobId/applications?page=1&limit=20&status=all`
- **Headers:** 
  - `Authorization: Bearer {token}`
- **Query Parameters:**
  - `page` (default: 1)
  - `limit` (default: 20)
  - `status` ('Dang duyet', 'Duyet', 'Tu choi', 'all')

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "applications": [
      {
        "CandidateID": 1,
        "JobID": 1,
        "upLoadCV": "cv_file.pdf",
        "CoverLetter": "cover_letter.pdf",
        "Status_apply": "Dang duyet",
        "candidate": {
          "FName": "Nguyen",
          "LName": "Van A",
          "Email": "nguyenvana@email.com",
          "Phonenumber": "0123456789",
          "Profile_Picture": "avatar.jpg",
          "Address": "Hà Nội"
        },
        "profile": {
          "YearOfExperience": 3,
          "savedCv": "resume.pdf"
        }
      }
    ],
    "pagination": {
      "total": 798,
      "page": 1,
      "totalPages": 40,
      "limit": 20
    },
    "statistics": {
      "total": 798,
      "pending": 650,
      "approved": 100,
      "rejected": 48
    }
  },
  "message": "Applications retrieved successfully"
}
```

### SQL Query
```sql
SELECT 
  a.CandidateID,
  a.JobID,
  a.upLoadCV,
  a.CoverLetter,
  a.Status_apply,
  u.FName,
  u.LName,
  u.Email,
  u.Phonenumber,
  u.Profile_Picture,
  u.Address,
  p.YearOfExperience,
  p.savedCv
FROM apply a
JOIN candidate c ON a.CandidateID = c.ID
JOIN user u ON c.ID = u.ID
LEFT JOIN profile p ON c.ID = p.CandidateID
WHERE a.JobID = ?
  AND (? = 'all' OR a.Status_apply = ?)
ORDER BY a.CandidateID DESC
LIMIT ? OFFSET ?;
```

## 12. GET /api/employer/:employerId/saved-candidates - Lấy danh sách ứng viên đã lưu

### Request
- **Method:** GET
- **URL:** `/api/employer/:employerId/saved-candidates?page=1&limit=20`
- **Headers:** 
  - `Authorization: Bearer {token}`

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "candidates": [
      {
        "CandidateID": 1,
        "FName": "Nguyen",
        "LName": "Van A",
        "Email": "nguyenvana@email.com",
        "Phonenumber": "0123456789",
        "Profile_Picture": "avatar.jpg",
        "Address": "Hà Nội",
        "profile": {
          "YearOfExperience": 3,
          "savedCv": "resume.pdf"
        }
      }
    ],
    "pagination": {
      "total": 2517,
      "page": 1,
      "totalPages": 126,
      "limit": 20
    }
  },
  "message": "Saved candidates retrieved successfully"
}
```

### SQL Query
```sql
SELECT 
  f.CandidateID,
  u.FName,
  u.LName,
  u.Email,
  u.Phonenumber,
  u.Profile_Picture,
  u.Address,
  p.YearOfExperience,
  p.savedCv
FROM follow f
JOIN candidate c ON f.CandidateID = c.ID
JOIN user u ON c.ID = u.ID
LEFT JOIN profile p ON c.ID = p.CandidateID
WHERE f.EmployerID = ?
ORDER BY f.CandidateID DESC
LIMIT ? OFFSET ?;
```

## 13. POST /api/jobs - Đăng tin tuyển dụng mới

### Request
- **Method:** POST
- **URL:** `/api/jobs`
- **Headers:** 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`

### Request Body
```json
{
  "JobName": "Senior Developer",
  "JD": "Mô tả công việc chi tiết...",
  "JobType": "Full Time",
  "ContractType": "Permanent",
  "Level": "Senior",
  "Quantity": 2,
  "SalaryFrom": 20000000,
  "SalaryTo": 35000000,
  "RequiredExpYear": 3,
  "Location": "Hà Nội",
  "PostDate": "2025-11-27",
  "ExpireDate": "2025-12-27",
  "JobStatus": "Active",
  "EmployerID": 1,
  "categories": ["IT", "Software"],
  "skills": ["JavaScript", "React", "Node.js"]
}
```

### Success Response (201)
```json
{
  "success": true,
  "data": {
    "JobID": 590,
    "JobName": "Senior Developer",
    "JobStatus": "Active",
    "PostDate": "2025-11-27"
  },
  "message": "Job posted successfully"
}
```

### SQL Query
```sql
INSERT INTO job (
  JobName, JD, JobType, ContractType, Level, Quantity,
  SalaryFrom, SalaryTo, RequiredExpYear, Location,
  PostDate, ExpireDate, JobStatus, EmployerID
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- Update employer's NumberOfOpenedJob
UPDATE employer 
SET NumberOfOpenedJob = NumberOfOpenedJob + 1 
WHERE ID = ?;
```

## 14. PATCH /api/jobs/:jobId/status - Cập nhật trạng thái tin tuyển dụng

### Request
- **Method:** PATCH
- **URL:** `/api/jobs/:jobId/status`
- **Headers:** 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`

### Request Body
```json
{
  "JobStatus": "Expired"
}
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "JobID": 1,
    "JobStatus": "Expired",
    "UpdatedAt": "2025-11-27T10:30:00Z"
  },
  "message": "Job status updated successfully"
}
```

### SQL Query
```sql
UPDATE job 
SET JobStatus = ?, 
    ExpireDate = CASE WHEN ? = 'Expired' THEN CURDATE() ELSE ExpireDate END
WHERE JobID = ?;
```

## 15. DELETE /api/jobs/:jobId - Xóa tin tuyển dụng

### Request
- **Method:** DELETE
- **URL:** `/api/jobs/:jobId`
- **Headers:** 
  - `Authorization: Bearer {token}`

### Success Response (200)
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

### SQL Query
```sql
DELETE FROM job WHERE JobID = ?;

-- Update employer's NumberOfOpenedJob
UPDATE employer 
SET NumberOfOpenedJob = NumberOfOpenedJob - 1 
WHERE ID = (SELECT EmployerID FROM job WHERE JobID = ?);
```

## 16. PATCH /api/applications/:jobId/:candidateId/status - Cập nhật trạng thái ứng tuyển

### Request
- **Method:** PATCH
- **URL:** `/api/applications/:jobId/:candidateId/status`
- **Headers:** 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`

### Request Body
```json
{
  "Status_apply": "Duyet"
}
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "JobID": 1,
    "CandidateID": 50,
    "Status_apply": "Duyet",
    "UpdatedAt": "2025-11-27T10:30:00Z"
  },
  "message": "Application status updated successfully"
}
```

### SQL Query
```sql
UPDATE apply 
SET Status_apply = ?
WHERE JobID = ? AND CandidateID = ?;
```

## 17. POST /api/employer/:employerId/follow/:candidateId - Theo dõi ứng viên

### Request
- **Method:** POST
- **URL:** `/api/employer/:employerId/follow/:candidateId`
- **Headers:** 
  - `Authorization: Bearer {token}`

### Success Response (201)
```json
{
  "success": true,
  "data": {
    "EmployerID": 1,
    "CandidateID": 50
  },
  "message": "Candidate followed successfully"
}
```

### SQL Query
```sql
INSERT INTO follow (EmployerID, CandidateID) 
VALUES (?, ?);
```

## 18. DELETE /api/employer/:employerId/follow/:candidateId - Bỏ theo dõi ứng viên

### Request
- **Method:** DELETE
- **URL:** `/api/employer/:employerId/follow/:candidateId`
- **Headers:** 
  - `Authorization: Bearer {token}`

### Success Response (200)
```json
{
  "success": true,
  "message": "Candidate unfollowed successfully"
}
```

### SQL Query
```sql
DELETE FROM follow 
WHERE EmployerID = ? AND CandidateID = ?;
```

## 19. GET /api/employer/:employerId/notifications - Lấy thông báo

### Request
- **Method:** GET
- **URL:** `/api/employer/:employerId/notifications?page=1&limit=10`
- **Headers:** 
  - `Authorization: Bearer {token}`

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "nID": 1,
        "Title": "Ứng tuyển mới",
        "Content": "Có 1 ứng viên mới ứng tuyển vào vị trí UI/UX Designer",
        "Time": "2025-11-27T10:30:00",
        "JobID": 1,
        "CandidateID": 50,
        "isRead": false
      }
    ],
    "pagination": {
      "total": 156,
      "page": 1,
      "totalPages": 16,
      "limit": 10
    },
    "unreadCount": 12
  },
  "message": "Notifications retrieved successfully"
}
```

### SQL Query
```sql
SELECT 
  nID,
  Title,
  Content,
  Time,
  JobID,
  CandidateID
FROM notification
WHERE EmployerID = ?
ORDER BY Time DESC
LIMIT ? OFFSET ?;
```

## 20. GET /api/employer/:employerId - Lấy thông tin employer

### Request
- **Method:** GET
- **URL:** `/api/employer/:employerId`
- **Headers:** 
  - `Authorization: Bearer {token}`

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "employer": {
      "ID": 1,
      "Username": "employer1",
      "Email": "employer@company.com",
      "FName": "Nguyen",
      "LName": "Van A",
      "Phonenumber": "0123456789",
      "Address": "Hà Nội",
      "Profile_Picture": "avatar.jpg",
      "Created_date": "2024-01-15",
      "Bdate": "1990-05-20",
      "PackageName": "Premium",
      "NumberOfOpenedJob": 589,
      "purchaseDate": "2025-01-01"
    },
    "package": {
      "PackageName": "Premium",
      "cost": 5000000,
      "description": "Gói Premium cho doanh nghiệp",
      "time": 365
    }
  },
  "message": "Employer profile retrieved successfully"
}
```

### SQL Query
```sql
SELECT 
  e.ID,
  u.Username,
  u.Email,
  u.FName,
  u.LName,
  u.Phonenumber,
  u.Address,
  u.Profile_Picture,
  u.Created_date,
  u.Bdate,
  e.PackageName,
  e.NumberOfOpenedJob,
  e.purchaseDate,
  p.cost,
  p.desciption as description,
  p.time
FROM employer e
JOIN user u ON e.ID = u.ID
LEFT JOIN package p ON e.PackageName = p.PackageName
WHERE e.ID = ?;
```

## 21. GET /api/employer/:employerId/company - Lấy thông tin công ty

### Request
- **Method:** GET
- **URL:** `/api/employer/:employerId/company`
- **Headers:** 
  - `Authorization: Bearer {token}`

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "CompanyID": 1,
    "CName": "FPT Software",
    "CNationality": "Vietnam",
    "Website": "https://fpt-software.com",
    "Industry": "Information Technology",
    "CompanySize": 5000,
    "Logo": "logo.png",
    "Description": "Công ty công nghệ hàng đầu",
    "TaxNumber": 123456789,
    "EmployerID": 1
  },
  "message": "Company info retrieved successfully"
}
```

### SQL Query
```sql
SELECT 
  CompanyID,
  CName,
  CNationality,
  Website,
  Industry,
  CompanySize,
  Logo,
  Description,
  TaxNumber,
  EmployerID
FROM company
WHERE EmployerID = ?;
```