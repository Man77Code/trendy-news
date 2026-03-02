import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [allArticles, setAllArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const cache = useRef({});

  const totalPages = Math.ceil(allArticles.length / itemsPerPage);

  const currentPageData = allArticles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getData = async (searchTerm) => {
    if (!API_KEY) {
      setError("API key missing");
      return;
    }

    const term = searchTerm || search;
    if (!term.trim()) return;

    if (cache.current[term]) {
      setAllArticles(cache.current[term]);
      setPage(1);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${term}&pageSize=100&apiKey=${API_KEY}`
      );

      const jsonData = await response.json();

      if (jsonData.status !== "ok") {
        throw new Error(jsonData.message || "Failed to fetch news");
      }

      const articles = (jsonData.articles || []).filter(
        (a) => a.urlToImage && a.url
      );

      cache.current[term] = articles;
      setAllArticles(articles);
      setPage(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      getData(search);
    }, 500);
    return () => clearTimeout(delay);
  }, [search]);

  const handleInput = (e) => setSearch(e.target.value);

  const userInput = (e) => {
    const val = e.target.value;
    setSearch(val);
    getData(val);
  };

  const goToPage = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div>
      <nav role="navigation" aria-label="Main navigation">
        <h1>Trendy News</h1>
        <div className="searchBar" role="search">
          <input
            value={search}
            type="text"
            placeholder="Search News"
            onChange={handleInput}
            aria-label="Search for news"
          />
          <button onClick={() => getData(search)} aria-label="Submit search">
            Search
          </button>
        </div>
      </nav>

      <main id="main-content">
        <p className="head">Stay Updated with TrendyNews</p>

        <div className="categoryBtn" role="group" aria-label="Filter news by category">
          <button onClick={userInput} value="sports">Sports</button>
          <button onClick={userInput} value="politics">Politics</button>
          <button onClick={userInput} value="entertainment">Entertainment</button>
          <button onClick={userInput} value="health">Health</button>
          <button onClick={userInput} value="fitness">Fitness</button>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {loading && <p className="status">Loading news...</p>}
          {error && <p className="status error" role="alert">{error}</p>}
        </div>

        {!loading && !error && <Card data={currentPageData} />}

        {!loading && !error && totalPages > 1 && (
          <nav aria-label="Pagination">
            <div className="pagination">
              <button
                className="paginationBtn"
                disabled={page === 1}
                onClick={() => goToPage(1)}
                aria-label="First page"
              >
                «
              </button>

              <button
                className="paginationBtn"
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
                aria-label="Previous page"
              >
                ‹ Prev
              </button>

              {getPageNumbers().map((p) => (
                <button
                  key={p}
                  className={`paginationBtn ${p === page ? "activePage" : ""}`}
                  onClick={() => goToPage(p)}
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </button>
              ))}

              <button
                className="paginationBtn"
                disabled={page === totalPages}
                onClick={() => goToPage(page + 1)}
                aria-label="Next page"
              >
                Next ›
              </button>

              <button
                className="paginationBtn"
                disabled={page === totalPages}
                onClick={() => goToPage(totalPages)}
                aria-label="Last page"
              >
                »
              </button>
            </div>

            <p className="pageInfo">
              Page {page} of {totalPages} — {allArticles.length} articles found
            </p>
          </nav>
        )}
      </main>
    </div>
  );
};

export default Newsapp;