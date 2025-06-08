const express = require('express');
const router = express.Router();
const {
    getFrontImages,
    getWeddingImages,
    getBrideImages,
    upload,
    getHaldiImage,
    uploadImage,
    getCategories,
    getPreWeddingImages,
    getAllImages,
    getEngagementImage,
    getMekeupImage,
    getMaternity,
    getMehndiImage,
    getOtherImages,
    getGalleryImages,
    updateImage,
    deleteImage,
    getGroomImages,
} = require('../controllers/imageController');

router.get('/frontImg', getFrontImages);
router.get('/wedImg', getWeddingImages);
router.get('/brideImg', getBrideImages);
router.get('/groomImg', getGroomImages);
router.get('/preWeddingImg', getPreWeddingImages);
router.get('/haldiImg', getHaldiImage);
router.get('/engagementImg', getEngagementImage);
router.get('/mehndiImage', getMehndiImage);
router.get('/mekeupImg', getMekeupImage);
router.get('/maternity', getMaternity);

router.get('/galleryContent', getGalleryImages);
router.get('/otherImg', getOtherImages);


router.post('/uploadImage', upload.array('image'), uploadImage);
router.get('/categories', getCategories);
router.get('/allImages/:categoryId', getAllImages);
router.put('/allImages', upload.single('image'), updateImage);
router.delete('/allImages', deleteImage);


module.exports = router;
