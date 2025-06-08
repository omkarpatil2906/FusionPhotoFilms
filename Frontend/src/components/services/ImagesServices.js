import { imagesApi } from "../../http-common"


export const getAllCategory = async () => {
    return await imagesApi.get(`/images/categories`)
}

export const ImageUploadApi = async (formData) => {
    return await imagesApi.post(`/images/uploadImage`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const ImageUpdateApi = async (formData) => {
    return await imagesApi.put(`/images/allImages`, formData)
}

export const getAllImgData = async (id) => {
    return await imagesApi.get(`/images/allImages/${id}`)
}

export const deleteImgData = async (id, category) => {
    return await imagesApi.delete(`/images/allImages`, { data: { id, category } })
}

export const FrontPageImg = async () => {
    return await imagesApi.get(`/images/frontImg`,)
}

export const BrideImg = async () => {
    return await imagesApi.get(`/images/brideImg`,)
}

export const GroomImg = async () => {
    return await imagesApi.get(`/images/groomImg`,)
}


export const WeddingImg = async () => {
    return await imagesApi.get(`/images/wedImg`,)
}

export const PreWeddingImg = async () => {
    return await imagesApi.get(`/images/preWeddingImg`,)
}

export const HaldiImages = async () => {
    return await imagesApi.get(`/images/haldiImg`,)
}

export const EngagementImg = async () =>{
    return await imagesApi.get(`/images/engagementImg`)
}

export const mehndiImg = async () =>{
    return await imagesApi.get(`/images/mehndiImage`)
}


export const MekeupImg = async () =>{
    return await imagesApi.get(`/images/mekeupImg`)
}

export const MaternityImg = async () =>{
    return await imagesApi.get(`/images/maternity`)
}


export const getGalleryData = async () =>{
    return await imagesApi.get(`/images/galleryContent`)
}


export const getOtherImages = async () =>{
    return await imagesApi.get(`/images/otherImg`)
}






