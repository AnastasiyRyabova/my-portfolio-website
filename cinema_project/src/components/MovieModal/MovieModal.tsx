import React from 'react';
import './MovieModal.css';
import close from '../../image/closebutton.png'

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerUrl: string;
}

const MovieModal: React.FC<MovieModalProps> = ({ isOpen, onClose, trailerUrl }) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='modal-close' onClick={onClose}><img src={close}></img></button>
        {trailerUrl ? (
          <iframe 
            className='modal-trailer' 
            src={trailerUrl} 
            title='Трейлер' 
            frameBorder='0' 
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' 
            allowFullScreen
          />
        ) : (
          <div className='no-trailer'>
            <p>Трейлер недоступен для этого фильма.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
