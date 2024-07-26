import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

const ArticleImage = ({ article }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (article?.images?.length > 0) {
      let images = [];

      article.images.map((imageName) => {
        return images.push({
          original: `${process.env.SERVER_URL}/${imageName}`,
          thumbnail: `${process.env.SERVER_URL}/${imageName}`,
        });
      });
      setImages(images);
    }
  }, [article]);

  return <ImageGallery items={images} />;
};
export default ArticleImage;
