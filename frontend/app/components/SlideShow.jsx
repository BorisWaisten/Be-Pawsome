import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'; // Importa los estilos de la biblioteca

const SlideShow = ({images}) => {
 

  return (
    <div className="slide-container w80 m-0">
      <Slide className="each-slide flex items-center justify-center h-64 bg-cover bg-center" images={images}>
        {images.map((each, index) => (
          <div key={index} className="each-slide">
            <div style={{ 'backgroundImage': `url(${each})` }}>
              {/* Contenido adicional para cada diapositiva si es necesario */}
              
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default SlideShow;
