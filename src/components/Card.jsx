import React from "react";

const Card = ({ data }) => {

  if (!data || data.length === 0) {
    return <p style={{ textAlign: "center" }}>No News Found</p>;
  }

  return (
    <div className="cardContainer">
      {data.map((curItem, index) => {
        if (!curItem.urlToImage || !curItem.url) {
          return null;
        }

        return (
          <div className="card" key={curItem.url}>
            <img
              src={curItem.urlToImage}
              alt={curItem.title}
              width="100%"
              height="auto"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
            <div className="content">
              <a
                className="title"
                href={curItem.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read full article: ${curItem.title}`}
              >
                {curItem.title}
              </a>

              <p>{curItem.description || "No description available."}</p>

              <a
                className="readMoreBtn"
                href={curItem.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read more about: ${curItem.title}`}
              >
                Read More
                <span className="sr-only"> about {curItem.title}</span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;