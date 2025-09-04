import { Link } from 'lucide-react';
import React from 'react';

const Footer = () => {
    return (
       
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <div>
        <a href="/">
            <a  className='text-3xl font-bold'>Edu<span className='text-orange-500'>Mate</span></a>
        </a>
        
     </div>
   
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>
        
    );
};

export default Footer;