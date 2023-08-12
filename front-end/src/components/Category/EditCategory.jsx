import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchCategory, updateCategory } from '../../slices/categorySlice'

const EditCategory = ({  }) => {

    const dispatch = useDispatch();
    const initialCategoryId = useSelector((state) => state.categories.selectedCategoryId);
    const category = useSelector((state) => state.categories.categories.find((cat) => cat.cate_id === initialCategoryId));
    const [updatedCategory, setUpdatedCategory] = useState(null);

    useEffect(() => {
      dispatch(fetchCategory(initialCategoryId));
    }, [dispatch, initialCategoryId]);

    useEffect(() => {
      setUpdatedCategory(category || {});
    //   console.log(updatedCategory);
    }, [category]);
    
    const handleInputChange = (e) => {
        setUpdatedCategory({ ...updatedCategory, [e.target.name]: e.target.value });
    };

    const handleUpdateCategory = () => {
        dispatch(updateCategory({ categoryId: initialCategoryId, categoryData: updatedCategory }))
            .then(() => {
                dispatch(fetchCategories());
                console.log('Category updated successfully');
            })
            .catch((error) => {
                console.log('Category update failed', error);
            });
    }

    return (
        <div>
            <h2>Edit Category</h2>
            <input type="text" name="cate_name" value={updatedCategory?.cate_name || "" } onChange={handleInputChange} />
            <input type="text" name="cate_desc" value={updatedCategory?.cate_desc || '' } onChange={handleInputChange} />
            <button onClick={handleUpdateCategory}>Update</button>
        </div>
    );
};

export default EditCategory;