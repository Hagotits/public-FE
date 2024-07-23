import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

const ArticleImage = ({ article }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (article?.images?.length > 0) {
      let images = [];

      article.images.map((imageName) => {
        return images.push({
          original: `http://localhost:4000/${imageName}`,
          thumbnail: `http://localhost:4000/${imageName}`,
        });
      });
      setImages(images);
    }
  }, [article]);

  return <ImageGallery items={images} />;
};

export default ArticleImage;
