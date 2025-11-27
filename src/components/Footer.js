import React from 'react';
import './Footer.css';
import { scrollToSection } from '../utils/scroll.ts';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
     <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <span className="logo-it">IT</span>
                <span className="logo-viec">viec</span>
              </div>
              <p>Nền tảng tuyển dụng IT hàng đầu Việt Nam</p>
            </div>
            <div className="footer-col">
              <h4>Dành cho Nhà tuyển dụng</h4>
              <ul>
                <li><a href="#post-job" onClick={(e) => { e.preventDefault(); scrollToSection('post-job'); }}>Đăng tin tuyển dụng</a></li>
                <li><a href="#search-cv" onClick={(e) => { e.preventDefault(); scrollToSection('search-cv'); }}>Tìm kiếm ứng viên</a></li>
                <li><a href="/pricing">Bảng giá</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Dành cho Ứng viên</h4>
              <ul>
                <li><a href="#jobs" onClick={(e) => { e.preventDefault(); scrollToSection('jobs'); }}>Tìm việc làm</a></li>
                <li><a href="#companies" onClick={(e) => { e.preventDefault(); scrollToSection('companies'); }}>Công ty IT</a></li>
                <li><a href="#blog" onClick={(e) => { e.preventDefault(); scrollToSection('blog'); }}>Blog</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Liên hệ</h4>
              <ul>
                <li>Email: contact@itviec.com</li>
                <li>Hotline: 1900 xxxx</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 ITviec. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;