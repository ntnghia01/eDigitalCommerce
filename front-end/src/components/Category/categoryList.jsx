import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, fetchCategories, searchCategories, setSelectedCategoryId } from '../../slices/categorySlice'
import { useNavigate } from 'react-router-dom';

function CategoryList () {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const isLoading = useSelector((state) => state.categories.isLoading);
  const error = useSelector((state) => state.categories.error);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  console.log(categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId))
      .then(() => {
        console.log('Category deleted successfully');
        // thuc hien cac thao tac sau khi xoa thanh cong
      })
      .catch((error) => {
        console.log('Failed to delete category:', error);
        // xu ly loi neu can thiet
      });
  };

  const handleEdit = (categoryId) => {
    dispatch(setSelectedCategoryId(categoryId));
    navigate(`/edit/${categoryId}`);
  };

  const handleSearch = () => {
    dispatch(searchCategories(searchTerm))
      .then(() => {
        console.log('Categories search successfully');
      })
      .catch((error) => {
        console.log('Categories search failed', error);
      });
  }
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Categories</h2>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {categories.map((category) => (
          <li key={category.cate_id}>
            {category.cate_name} - {category.cate_desc}
            <button onClick={() => handleDelete(category.cate_id)}>Delete</button>
            <button onClick={() => handleEdit(category.cate_id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
