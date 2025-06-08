import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from '../../../common/formField/InputField';
import DropdownField from '../../../common/formField/DropdownField';
import { Box, Modal } from '@mui/material';
import { ImageUpdateApi, ImageUploadApi } from '../../services/ImagesServices';
import { errorAlert, successAlert } from '../../../common/toast/CustomTosat';
import { CloseModalIcon } from '../../../common/asset/socialMediaIcon';
import UploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import CommonButton from '../../../common/commonButton/CommonButton';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    border: 'none'
};

// Maximum number of images allowed
const MAX_IMAGES = 6;

function UploadImageModal({ open, handleClose, edit, setOpenbackdrop, editRow, getImages, categories }) {
    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        category: yup.object().shape({
            label: yup.string().required("Category is required"),
            value: yup.string().required()
        }).required("Category is required"),
    });

    const defaulValues = {
        name: 'Fusion Film',
        category: null,
    };

    const { register, control, reset, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: defaulValues
    });

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).map(file => ({
                file,
                showImg: URL.createObjectURL(file),
            }));
            const combinedFiles = [...selectedFiles, ...newFiles];
            if (combinedFiles.length > MAX_IMAGES) {
                const keptFiles = combinedFiles.slice(0, MAX_IMAGES);
                combinedFiles.slice(MAX_IMAGES).forEach(item => URL.revokeObjectURL(item.showImg));
                alert(`Maximum ${MAX_IMAGES} images are allowed. Only the first ${MAX_IMAGES} have been selected.`);

                setSelectedFiles(keptFiles);
            } else {
                setSelectedFiles(combinedFiles);
            }
        }
    };

    const removeImage = (indexToRemove) => {
        setSelectedFiles(prev => {
            const updatedFiles = prev.filter((_, index) => index !== indexToRemove);
            return updatedFiles;
        });
    };

    const onSubmit = (data) => {
        if (!edit && selectedFiles.length === 0) {
            alert("Please select at least one image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category', data.category.value);

        selectedFiles.forEach(({ file }) => {
            formData.append('image', file);
        });

        const apiCall = edit ? ImageUpdateApi : ImageUploadApi;

        setOpenbackdrop(true);
        apiCall(formData)
            .then(response => {
                successAlert(response.message);
                reset(defaulValues);
                handleClose();
                setOpenbackdrop(false);
                getImages();
                setSelectedFiles([]);
            })
            .catch(err => {
                errorAlert(err.message);
                setOpenbackdrop(false);
            });
    };

    const handleReplaceImage = () => {
        setSelectedFiles([]);
    };

    useEffect(() => {
        if (editRow) {
            reset({
                name: editRow.name,
                category: { label: editRow.category.label, value: editRow.category.value },
            });
            setSelectedFiles([]);
        }
    }, [editRow, reset]);

    // useEffect(() => {
    //     return () => {
    //         // Clean up object URLs when component unmounts
    //         selectedFiles.forEach(item => URL.revokeObjectURL(item.showImg));
    //     };
    // }, [selectedFiles]);




    console.log("selectedFilesselectedFiles",selectedFiles);
    

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            
        >
            <Box sx={style} className="rounded-md">
                <div className='space-y-6'>
                    <div className='flex justify-between items-center '>
                        <h1 className="text-xl font-bold font-raleway">
                            {edit ? "Edit Image" : "Upload Images"}
                        </h1>
                        <button onClick={handleClose}><CloseModalIcon /></button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <InputField
                            control={control}
                            name="name"
                            label="Name"
                            error={errors?.name}
                        />
                        <DropdownField
                            control={control}
                            name="category"
                            placeholder="Category"
                            dataArray={categories}
                            error={errors?.category}
                        />

                        <div>
                            {edit && editRow ? (
                                <div>
                                    <img src={editRow.imageLink} alt="Preview" className="mb-2 w-full h-32 object-cover" />
                                    <button
                                        type="button"
                                        className="w-full p-2 bg-gray-300 text-black font-bold rounded mb-2"
                                        onClick={handleReplaceImage}
                                    >
                                        Replace Image
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    {/* Hidden File Input */}
                                    <input
                                        type="file"
                                        id="upload"
                                        hidden
                                        {...register("file")}
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />

                                    {/* Custom Upload Button */}
                                    <label
                                        htmlFor="upload"
                                        className="flex items-center justify-center gap-2 py-2 px-4 bg-[#1c7e80] text-white font-semibold rounded shadow-md cursor-pointer transition hover:bg-[#166a6b] active:scale-95"
                                    >
                                        <UploadIcon />
                                        <span>Choose Images</span>
                                    </label>



                                    <div className="mt-4 grid grid-cols-3 gap-2 h-[250px] border-customColor rounded overflow-y-auto border p-2">
                                        {selectedFiles.map((imgObj, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={imgObj.showImg}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-28 object-cover rounded"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute top-0 right-0 transition"
                                                    onClick={() => removeImage(index)}
                                                >
                                                    <CancelIcon fontSize="small" className="text-red-500" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='flex justify-center gap-2'>
                            <CommonButton
                                type={"button"}
                                className={"border border-customRed text-customRed"}
                                label={"Reset"}
                                onClick={() => {
                                    reset(defaulValues);
                                    setSelectedFiles([]);
                                }}
                            />
                            <CommonButton
                                type={"submit"}
                                className={"bg-customGreen text-white"}
                                label={edit ? "Update" : "Upload"}
                            />
                        </div>

                    </form>
                </div>
            </Box>
        </Modal>
    );
}

export default UploadImageModal;