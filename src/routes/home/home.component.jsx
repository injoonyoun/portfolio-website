import React, { useEffect, useRef } from "react";
import { Outlet, Link } from 'react-router-dom';
import './home.css'; 
import none from '../../assets/img/default.jpg'
import ceramic from '../../assets/img/ceramic.jpg'
import crochet from '../../assets/img/crochet.jpg'

const works = [
    {id: 1, name: 'CERAMICS', image: ceramic},
    {id: 2, name: 'PROJECT', image: crochet},
    {id: 3, name: 'CAWI TOOLKIT', image: none}
];

const Square = ({ work, index }) => {

    const indexRef = useRef(index); 

    useEffect(() => {
        const handleClick = () => {
            console.log(`Work element ${indexRef.current} clicked`);
        };

        const squareElement = document.getElementById(`work-${indexRef.current}`);
        if (squareElement) {
            squareElement.addEventListener('click', handleClick);
        }

        return () => {
            if (squareElement) {
                squareElement.removeEventListener('click', handleClick);
            }
        };
    }, []);
    
    return (
        <div className="work" id={`work-${index}`}>
            <Link className="work-links" to={`/works/${work.id}`}>
                <img className="work-img" src={work.image} alt={work.name} />
                <h3>{work.name}</h3>
                <p>{work.description}</p>
            </Link>
        </div>
    );
};

const Carousel = () => {
    const carouselRef = useRef(null);
    const loopedWorks = [...works, ...works, ...works];

    useEffect(() => {
        const handleInitialScroll = () => {
            const scrollWidth = carouselRef.current.scrollWidth;
            const containerWidth = carouselRef.current.clientWidth;
            const initialScrollPosition = (scrollWidth - containerWidth) / 2;
            carouselRef.current.scrollLeft = initialScrollPosition;
        };

        const handleScroll = () => {
            const containerWidth = carouselRef.current.clientWidth;
            const scrollLeft = carouselRef.current.scrollLeft;
            const scrollRight = carouselRef.current.scrollWidth - containerWidth - scrollLeft;
            const scrollWidth = carouselRef.current.scrollWidth;
    
            if (scrollLeft <= 0) {
                carouselRef.current.scrollLeft = scrollWidth / 3;
            }else if (scrollRight <= 0) {
                carouselRef.current.scrollLeft = (scrollWidth - containerWidth) / 4;
            }
        };

        handleInitialScroll();
        carouselRef.current.addEventListener("scroll", handleScroll);
        
        return () => {
            carouselRef.current.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleVerticalScroll = (event) => {
            if (carouselRef.current) {
                const deltaY = event.deltaY;
                carouselRef.current.scrollLeft += deltaY;
                // event.preventDefault(); // prevent vertical scrolling
            }
        };

        document.addEventListener('wheel', handleVerticalScroll);
        return () => {
            document.removeEventListener('wheel', handleVerticalScroll);
        };
    }, []);

    const handleScroll = (event) => {
        const isHorizontalScroll = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      
        if (isHorizontalScroll) {
          event.preventDefault();
          // event.stopPropagation(); // stop the event from further propagation
        }
      };
      
      document.addEventListener('wheel', handleScroll, { passive: false });

    return (
        <div className="carousel" ref={carouselRef}>
            {loopedWorks.map((work, index) => (
                <Square key={index} work={work} index={index} />
            ))}
        </div>
    );
};;


const Home = () => {
    return (
        <section className="page">
            <section className="content">
                <Carousel works={works} />
            </section>
            <section className="title">
                <h1 className="main-title">YOON IN JOON</h1>
                <div className="categories">
                    <p>WEB DEVELOPMENT</p>
                    <p>FASHION</p>
                    <p>ART</p>
                </div>
            </section>
        </section>
    );
  
}
export default Home; 