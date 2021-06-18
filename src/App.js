import React, { useEffect, useState } from 'react';
import './App.css';
import tmdb from './tmdb';
import MovieRow from './components/MovieRow/MovieRow';
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie';
import Header from './components/Header/Header';

export default function Home() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Get all movies and series from API
      let list = await tmdb.getHomeList();
      setMovieList(list)

      // Get the Featured Movie
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo)
    }
    loadAll();
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    }
  },[])

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

    </div>
  );
}