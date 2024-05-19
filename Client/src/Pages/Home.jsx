import React, { useReducer, useEffect, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getAll,
  getAllByTag,
  getAllTags,
  search,
} from '../services/foodService';
import { useParams } from 'react-router-dom';
import Search from '../Components/Search';
import Tag from '../Components/Tag';
import NotFound from '../Components/NotFound';
// Lazy load the Thumbnail component
const Thumbnail = lazy(() => import('../Components/Thumbnail'));
import Loading from './LoadingPage'; // Make sure this component exists

// Define action types as constants
const FOODS_LOADED = 'FOODS_LOADED';
const TAGS_LOADED = 'TAGS_LOADED';

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case FOODS_LOADED:
      return { ...state, foods: action.payload };
    case TAGS_LOADED:
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm, tag } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // Load tags and foods data
  useEffect(() => {
    getAllTags().then((tags) => dispatch({ type: TAGS_LOADED, payload: tags }));

    const loadFoods = async () => {
      setIsLoading(true);
      const foodsData = tag
        ? await getAllByTag(tag)
        : searchTerm
          ? await search(searchTerm)
          : await getAll();
      dispatch({ type: FOODS_LOADED, payload: foodsData });
      setIsLoading(false);
    };

    loadFoods();
  }, [searchTerm, tag]);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } },
    exit: { opacity: 0, transition: { ease: 'easeInOut' } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <Search />
      <Tag tags={tags} />
      <AnimatePresence>
        {isLoading ? (
          <motion.div key='loading'>
            <Loading />
          </motion.div>
        ) : foods.length === 0 ? (
          <motion.div key='not-found'>
            <NotFound />
          </motion.div>
        ) : (
          // Wrap the Thumbnail component with Suspense and provide a fallback
          <Suspense fallback={<Loading />}>
            <motion.div key='content'>
              <Thumbnail foods={foods} />
            </motion.div>
          </Suspense>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
