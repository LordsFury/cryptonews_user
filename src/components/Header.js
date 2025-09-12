"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';


const Header = () => {

  return (
    <div className='pt-12'>
      <div className="flex flex-col md:flex-row justify-center md:justify-between gap-12 md:gap-6 mb-6 px-6 md:px-20 py-10 bg-gradient-to-r from-blue-800 to-purple-800 text-white shadow-lg">
        <div className="text-center md:text-left">
          <div className='flex items-center gap-2'>
            <div className='block'><FontAwesomeIcon icon={faBookOpen} className="text-4xl" /></div>
            <h1 className="md:text-2xl lg:2xl text-xl font-bold">CRYPTO GLOSSARY</h1>
          </div>
          <h2 className="text-4xl font-bold mt-16 md:mt-24 mb-2">Your Key to Crypto Terms</h2>
          <p className="text-lg opacity-90">Unlock the world of cryptocurrency with simple definitions.</p>
        </div>
        <div className='flex justify-center w-full'>
          <Image
          className="rounded-2xl w-96 h-72 md:w-[50vw] md:h-96 object-cover shadow-md"
          width={400}
          height={400}
          src="/images/img.avif"
          alt="Crypto"
        />
        </div>
      </div>
    </div>
  );
};

export default Header;
