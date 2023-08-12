import { useState } from "react"
import { useDispatch } from "react-redux";
import { addCategory } from '../../slices/categorySlice'

const AddCategoryForm = () => {
    const [cate_name_value, setCateName] = useState('');
    const [cate_desc_value, setCateDesc] = useState('');
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        if (e.target.name === 'cate_name') {
            setCateName(e.target.value);
        } else if (e.target.name === 'cate_desc') {
            setCateDesc(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCategory = {
            cate_name: cate_name_value,
            cate_desc: cate_desc_value,
        };
        dispatch(addCategory(newCategory));
        setCateName('');
        setCateDesc('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="cate_name" placeholder="Nhập tên danh mục" value={cate_name_value} onChange={handleInputChange} />
            <input type="text" name="cate_desc" placeholder="Nhập mô tả danh mục" value={cate_desc_value} onChange={handleInputChange} />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddCategoryForm;