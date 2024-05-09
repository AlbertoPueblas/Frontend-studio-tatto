import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Menu.css"

//---------------------------------------------------

export const Menu = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = () => {
    setIndex();
  };

  return (
    <>
        <Carousel fade>
      <Carousel.Item>
        <img src="./src/pages/img/0.webp" className='view0'></img>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="./src/pages/img/3.png"  className='view0'></img>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="./src/pages/img/5.jpg" className='view0'></img>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="./src/pages/img/8.jpeg" className='view0'></img>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="./src/pages/img/9.jpg" className='view0'></img>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="./src/pages/img/4.webp" className='view0'></img>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="./src/pages/img/2.jpg" className='view0'></img>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  );
}

export default Menu;