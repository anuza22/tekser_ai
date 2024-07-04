import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useCallback } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Imagetag = ({ image, removeImage, cropCoordinate }) => {
  const [crop, setCrop] = useState({});
  const [disableCrop, setDisableCrop] = useState(false);
  const [imgWidth, setImgWidth] = useState(176);
  const [imgHeight, setImgHeight] = useState(176);

  const onImageLoad = useCallback((e) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    setImgWidth(width);
    setImgHeight(height);
    setDisableCrop(width === height);
    const newCrop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 100,
        },
        1 / 1,
        width,
        height
      ),
      width,
      height
    );
    setCrop(newCrop);
  }, []);

  const onCropChange = useCallback((crop, percentCrop) => {
    setCrop(percentCrop);
  }, []);

  const handleRemove = () => {
    removeImage(image);
  };

  useEffect(() => {
    cropCoordinate(crop);
  }, [crop, cropCoordinate]);

  return (
    <div className="file-item mx-3 my-3 relative">
      <button
        className="absolute bg-primary-600 text-white p-1 z-10 rounded top-2.5 right-2.5"
        onClick={handleRemove}
      >
        <XMarkIcon width="12" height="12" />
      </button>
      {disableCrop ? (
        <img
          alt={`img - ${image.id}`}
          src={image.src}
          className="file-img rounded-xl w-52 h-52 xs:w-auto xs:h-40 md:w-auto md:h-52 lg:w-auto lg:h-[236px]"
          onLoad={onImageLoad}
        />
      ) : (
        <div className="xs:w-40 xs:h-40 w-52 h-52 md:w-52 md:h-52 lg:w-[236px] lg:h-[236px] flex justify-center items-center">
          <ReactCrop crop={crop} onChange={onCropChange} aspect={1} locked>
            <img
              alt={`img - ${image.id}`}
              src={image.src}
              className={`file-img rounded-xl ${
                imgHeight > imgWidth
                  ? "w-auto h-52 xs:h-40 md:h-52 lg:h-[236px]"
                  : "h-auto w-52 xs:w-40 md:w-52 lg:w-[236px]"
              }`}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>
      )}
    </div>
  );
};

const ImageGrid = ({ images, remove, crops }) => {
  const renderImage = (image) => {
    const handleRemove = (file) => {
      remove(file);
    };

    const handleCrop = (crop) => {
      const data = {
        id: image.id,
        crop: crop,
        image: image,
      };
      crops(data);
    };

    return (
      <Imagetag
        image={image}
        key={`${image.id}-image`}
        removeImage={handleRemove}
        cropCoordinate={handleCrop}
      />
    );
  };

  return <div className="image-grid">{images.map(renderImage)}</div>;
};

export default ImageGrid;
