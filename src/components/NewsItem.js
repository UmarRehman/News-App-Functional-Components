import React from "react";

const NewsItem =(props)=>{
 
    let { title, description, imageUrl, newsUrl, author, date, source } =props;
    return (
      <div className="my-3">
        <div className="card">
          <div
            style={{
              display: "flex",
             
              position: "absolute",
              right: "0",
            }}
          >
            {" "}
            <span
              className="badge rounded-pill bg-danger"
         
            >
              {source}
            </span>
          </div>
          <img
            src={
              !imageUrl
                ? "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRiULU6xp8Ls7qSNmipLUuaC9BMdy_8j_vvz6KfXTpoaRusojsRb0x2hBNdmeZrCwPzuNflBFvgz1a2yrk"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank "
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }


export default NewsItem;
