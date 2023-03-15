import React, { useEffect, useState } from "react";
import { getUID } from "../utils/helpers.js";
import api from "../utils/api";
import { useStore } from "../stores/useStore";

function Image() {
  const backgroundImage = useStore((state) => state.backgroundImage);
  const setBackgroundImage = useStore((state) => state.setBackgroundImage);

  const [loading, setLoading] = useState(false);
  const getImage = () => {
    setLoading(true);
    fetch(api.BACKGROUND_API)
      .then((response) => response.json())
      .then((data) => {
        var item = data[Math.floor(Math.random() * data.length)];

        setBackgroundImage({
          image: item,
          lastUpdated: getUID(),
        });
      })
      .catch((error) => {
        fetch("../data/images.json")
          .then((response) => response.json())
          .then((data) => {
            var item = data[Math.floor(Math.random() * data.length)];
            setBackgroundImage({
              image: item,
              lastUpdated: getUID(),
            });
          });
      });
  };
  const resizeImage = (imageURL) => {
    if (typeof imageURL !== "undefined") {
      return imageURL.replace(/&w=(\d+)/, "&w=2000");
    } else {
      return imageURL;
    }
  };

  useEffect(() => {
    if (
      backgroundImage.lastUpdated == null ||
      backgroundImage.length === 0 ||
      backgroundImage.lastUpdated !== getUID()
    ) {
      getImage();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {Object.keys(backgroundImage).length > 0 && (
        <figure
          className={`app-background ${
            loading ? "app-background--is-loading" : ""
          }`}
        >
          <img
            src={resizeImage(backgroundImage.image.urls.regular)}
            alt=""
            onLoad={() => setLoading(false)}
          />
        </figure>
      )}
    </>
  );
}

export default Image;
