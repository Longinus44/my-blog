import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/Context/authcontext';
import Newsdetails from './components/Article/newsdetails';
import SignIn from './components/Auth/signin';
import SignUp from './components/Auth/signup';
import ArticleList from './components/Article/articlelist';
import ArticlePage from './components/Article/articlepage';
import Header from './components/Layout/header';
import Footer from './components/Layout/footer';
import LatestNews from './components/News/latestnewsold';
import { NewsArticleProvider } from './components/Context/newscontext';
import HomePage from './components/News/homepage';

const App = () => {
  return (
    <AuthProvider>
      <NewsArticleProvider>
        <Router>
        <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
            <Route path="/news" element={<LatestNews />} />
            <Route path="/news/:url" element={<Newsdetails />} />
          </Routes>
          <Footer />
        </Router>
      </NewsArticleProvider>
    </AuthProvider>
  );
};

export default App;
