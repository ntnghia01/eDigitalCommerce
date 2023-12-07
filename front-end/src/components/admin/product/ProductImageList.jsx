import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchImageByProductID } from '../../../slices/imageSlice';

export default function StandardImageList(props) {
  const {proId} = props;

  console.log("Check");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchImageByProductID(proId));
  },[dispatch]);
  const images = useSelector((state) => state.image.images);

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {images.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`http://localhost:9004/api/product/images/${item.image}`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

// const itemData = [
//   {
//     img: 'https://cdn.tgdd.vn/Products/Images/42/289663/Kit/iphone-14-note.jpg',
//     title: 'Breakfast',
//   },
//   {
//     img: 'https://cdn.tgdd.vn/Products/Images/42/289663/iphone-14-xanh-4.jpg',
//     title: 'Burger',
//   },
//   {
//     img: 'https://cdn.tgdd.vn/Products/Images/42/289663/iphone-14-xanh-9.jpg',
//     title: 'Camera',
//   },
// ];
