import React from 'react';
import FlipMove from 'react-flip-move';
import { useState } from 'react';

const Testimonials = () => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <>
    <h1 className='text-5xl pt-20 text-center bg-black text-yellow-500'>Testimonials</h1>
    <div className={`testimonials-container ${flipped ? 'flipped' : ''} grid grid-cols-3 p-20 gap-10 place-items-center bg-black text-yellow-500` }>
      <div className="card" onClick={handleFlip}>
        <div className="card-inner">
          <div className="card-front">
            <h2>Aarav Patel</h2>
          </div>
          <div className="card-back">
            <h2>"As a streetwear fanatic, I'm always on the lookout for fresh styles. This brand not only delivers on the latest trends but adds its own flair. Street cred just went up a notch!"</h2>
          </div>
        </div>
      </div>
      <div className="card" onClick={handleFlip}>
        <div className="card-inner">
          <div className="card-front">
            <h2>Mason Nguyen</h2>
          </div>
          <div className="card-back">
            <h2>"Unleash your street edge with this brand! From bold graphics to comfortable fits, they've nailed the streetwear game. My go-to for urban chic vibes."</h2>
          </div>
        </div>
      </div>
      <div className="card" onClick={handleFlip}>
        <div className="card-inner">
          <div className="card-front">
            <h2>Sasha Rodriguez</h2>
          </div>
          <div className="card-back">
            <h2>"Dope designs, top-notch quality! This streetwear brand understands the art of street fashion. Each piece tells a story, and I love being part of that narrative."</h2>
          </div>
        </div>
      </div>
      <div className="card" onClick={handleFlip}>
        <div className="card-inner">
          <div className="card-front">
            <h2>Avery Martinez</h2>
          </div>
          <div className="card-back">
            <h2>"This streetwear brand is a game-changer! The unique designs and attention to urban style make every piece a statement. Proud to rock these street-savvy threads!"</h2>
          </div>
        </div>
      </div>
      <div className="card" onClick={handleFlip}>
        <div className="card-inner">
          <div className="card-front">
            <h2>Jordan Cruz</h2>
          </div>
          <div className="card-back">
            <h2>"Streetwear enthusiasts, you need to check this brand out! The quality is unmatched, and the street vibes are on point. My wardrobe has never looked this fresh!"</h2>
          </div>
        </div>
      </div>
      <div className="card" onClick={handleFlip}>
        <div className="card-inner">
          <div className="card-front">
            <h2>Skylar Williams</h2>
          </div>
          <div className="card-back">
            <h2>"Being a fashion enthusiast, I can't get enough of this streetwear brand. The fusion of global trends with a touch of desi swag is just what I've been looking for. Aarav-approved coolness – highly recommended!"</h2>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};


export default Testimonials;

