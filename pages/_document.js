import Document, {Head, Main, NextScript} from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <link rel="stylesheet" href="https://unpkg.com/bootstrap@4.1.1/dist/css/bootstrap.min.css" />
          <link rel="stylesheet" href="https://unpkg.com/bootswatch@4.1.1/dist/materia/bootstrap.min.css" />
          <link rel="stylesheet" href="https://unpkg.com/hint.css@2.5.0/hint.min.css" />
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" />
          <link rel="stylesheet" href="https://unpkg.com/loaders.css@0.1.2/loaders.min.css" />
          <link rel="stylesheet" href="https://unpkg.com/font-awesome@4.7.0/css/font-awesome.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
