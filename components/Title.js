import React from 'react';

export default ({title, url}) => (
  <h3>
    <style jsx>{`
      .btnLink {
        margin-left: 10px;
        box-shadow: none;
      }
    `}</style>
    {title || url}
    <a className="btn btn-light btn-sm btnLink" href={url}>
      <i className="fa fa-link" />
    </a>
  </h3>
);
