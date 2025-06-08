import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import UploadImageModal from './UploadImageModal';
import { deleteImgData, getAllCategory, getAllImgData } from '../../services/ImagesServices';
import CommonBackDrop from '../../../common/CommonBackDrop/CommonBackDrop'
import LoadingSpinner from "../../../common/loadingspinner/loadingSpinner"
import DropdownField from '../../../common/formField/DropdownField';
import { useForm } from 'react-hook-form';
import CommonButton from '../../../common/commonButton/CommonButton';




function UploadImage() {
    const { control, watch, setValue } = useForm({

    });
    let watchCategoryId = watch("category")
    const [open, setOpen] = useState(false);
    const [imagesDataList, setImgesDataList] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editRow, setEditRow] = useState(null);
    const [openBackdrop, setOpenbackdrop] = useState(false)
    const [spinner, setSpinner] = useState(false);
    const [categories, setCategories] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEdit(false);
        setEditRow(null);
    };

    const getCategory = () => {
        getAllCategory()
            .then((res) => {
                let defaultValue = res.data.find((val) => val.label === "Bride")
                console.log("defaultValue",defaultValue);
                setValue("category", defaultValue)
                setCategories(res.data)
            })
            .catch((error) => error);
    }


    const getImages = () => {
        setSpinner(true)
        getAllImgData(watchCategoryId?.id)
            .then(response => {
                console.log(response, "imagesDataList.length > 0");
                setImgesDataList(response.data.images);
                setSpinner(false)

            })
            .catch(error => {
                console.log(error);
                setSpinner(false)

            });
    };

    useEffect(() => {
        if (watchCategoryId) {
            getImages();
        }
    }, [watchCategoryId])

    useEffect(() => {
        getCategory();
    }, []);

    const deleteImage = (id, category) => {
        deleteImgData(id, category)
            .then(response => {
                alert(response.data.message);
                getImages();
            })
            .catch(error => {
                console.error("Failed to delete the image:", error);
                alert("Failed to delete the image.");
            });
    };



    return (
        <div className='p-6'>
            <div className='grid grid-cols-4 gap-2 justify-between'>
                <div className='w-full'>
                    <DropdownField
                        control={control}
                        name="category"
                        placeholder="Category"
                        searchIcon={true}
                        dataArray={categories}
                    />
                </div>

                <div>
                    <CommonButton
                        type={"button"}
                        searchIcon={true}
                        className="bg-[#073763]  text-white"
                        onClick={() => getImages()}
                    />
                </div>
                <div className='col-start-4 flex justify-end -w-full'>
                    <button className='bg-[#073763] px-6 text-sm p-2 text-white font-montserrat rounded-md' onClick={handleOpen}>Add Images</button>
                </div>
            </div>

            {
                spinner && (
                    <div className='grid justify-center items-center h-96'>
                        <LoadingSpinner />
                    </div>
                )
            }

            {
                imagesDataList.length > 0 && !spinner ? (
                    <div className='grid mt-12 lg:grid-cols-4 gap-2'>
                        {imagesDataList.map((data, index) => (
                            <div key={index} className='grid grid-cols-2 gap-2 border p-2 shadow rounded-sm'>
                                <img src={data.imageLink} alt={data.src} className='h-32 w-32 object-cover' />

                                <div className='flex flex-col justify-between'>
                                    <div className=''>
                                        <h1 className='font-montserrat text-sm '> Name : <span className='font-bold font-raleway'>{data.name}</span> </h1>
                                        <h1 className='font-montserrat text-sm'> Category : <span className='font-bold font-raleway'>{data.category}</span> </h1>
                                    </div>

                                    <div className='grid grid-cols-2 gap-2'>
                                        <button
                                            className='bg-blue-500 text-white font-montserrat text-sm rounded-md'
                                            onClick={() => {
                                                setEditRow({
                                                    id: data.id,
                                                    name: data.name,
                                                    category: { label: data.category, value: data.category },
                                                    imageLink: data.imageLink,
                                                });
                                                setEdit(true);
                                                setOpen(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='bg-red-500 text-white font-montserrat text-sm rounded-md'
                                            onClick={() => deleteImage(data.id, data.category)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                ) :
                    (
                        <>
                            {
                                !spinner && (
                                    <div className='flex justify-center h-96 items-center font-semibold'>
                                        No Record Found <span className='animate-pulse'>...</span>
                                    </div>
                                )
                            }
                        </>
                    )
            }



            {
                open && (
                    <UploadImageModal
                        open={open}
                        handleClose={handleClose}
                        edit={edit}
                        editRow={editRow}
                        getImages={getImages}
                        setOpenbackdrop={setOpenbackdrop}
                        categories={categories}
                    />

                )
            }


            {openBackdrop && (<CommonBackDrop openBackdrop={openBackdrop} />)}


        </div>
    )
}

export default UploadImage
