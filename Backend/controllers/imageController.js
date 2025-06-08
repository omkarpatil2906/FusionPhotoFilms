
const { ObjectId } = require('mongodb');
const multer = require('multer');
const sharp = require('sharp');
const { client } = require('../config/db');

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });
// const uploadImage = async (req, res) => {
//     const { name, category } = req.body;
//     const file = req.file;

//     if (!file) {
//         return res.status(400).json({ message: 'No file uploaded' });
//     }
//     try {
//         const fullSizeBuffer = await sharp(file.buffer)
//             .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
//             .jpeg({ quality: 80 })
//             .toBuffer();



//         const fullSizeBase64 = fullSizeBuffer.toString('base64');
//         const db = client.db("fusionFilm");
//         const collection = db.collection(category);

//         const newImage = {
//             name,
//             src: `data:image/jpeg;base64,${fullSizeBase64}`,
//             uploadedAt: new Date()
//         };

//         const result = await collection.insertOne(newImage);

//         // MongoDB automatically generates _id
//         newImage._id = result.insertedId;

//         res.status(201).json({ message: 'Image uploaded successfully', image: newImage });
//     } catch (error) {
//         console.error("Error uploading image:", error);
//         res.status(500).json({ message: "Error uploading image", error: error.message });
//     }
// };


const uploadImage = async (req, res) => {
    const { name, category } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }

    try {
        const db = client.db("fusionFilm");
        const collection = db.collection(category);
        const uploadedImages = [];
        
        // Process each file
        for (const file of files) {
            // Process the image with sharp
            const fullSizeBuffer = await sharp(file.buffer)
                .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
                .jpeg({ quality: 80 })
                .toBuffer();
                
            const fullSizeBase64 = fullSizeBuffer.toString('base64');
            
            const newImage = {
                name: name, // You might want to include the original filename or index
                src: `data:image/jpeg;base64,${fullSizeBase64}`,
                uploadedAt: new Date()
            };
            
            // Insert the image into MongoDB
            const result = await collection.insertOne(newImage);
            
            // Add the inserted ID to the image object
            newImage._id = result.insertedId;
            uploadedImages.push(newImage);
        }
        
        res.status(201).json({ 
            message: `Images uploaded successfully`, 
            images: uploadedImages 
        });
    } catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).json({ message: "Error uploading images", error: error.message });
    }
};


const getCategories = async (req, res) => {
    try {
        const db = client.db("fusionFilm");
        const collections = await db.listCollections().toArray();
        
        // Map of collection names to user-friendly labels
        const labelMap = {
            'frontImg': 'Front Page',
            'weddingImg': 'Wedding',
            'brideImg': 'Bride',
            'groomImg': 'Groom',
            'pre-weddingImg': 'Pre-Wedding',
            'haldiImg': 'Haldi',
            'engagementImg': 'Engagement',
            'mehndiImage': 'Mehndi',
            'mekeupImg': 'Makeup',
            'maternityImg': 'Maternity'
        };
      
        const categories = collections
            .filter(col => Object.keys(labelMap).includes(col.name))
            .map(col => ({
                id: col.name,
                label: labelMap[col.name],
                value: col.name
            }));

        // Log categories
        if (categories.length === 0) {
            console.log("No matching categories found.");
            return res.status(404).json({ message: "No categories found" });
        }
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error.message);
        res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
};

const getFrontImages = async (req, res) => {
    const collectionName = 'frontImg';
    try {
        const db = client.db("fusionFilm");
        const collection = db.collection(collectionName);

        const images = await collection.find({}).toArray();
        console.log("Images fetched from database:", images);
        res.json(images);
    } catch (error) {
        console.error("Error fetching images:", error.message);
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
};

const getWeddingImages = async (req, res) => {
    const collectionName = 'weddingImg';
    try {
        const db = client.db("fusionFilm");
        const collection = db.collection(collectionName)

        const images = await collection.find({}).toArray();
        console.log("Images fetched from database:", images);
        res.json(images);

    } catch (error) {
        console.error("Error fetching images:", error.message);
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
}

const getBrideImages = async (req, res) => {
    const collectionName = 'brideImg';
    try {
        const db = client.db("fusionFilm");
        const collection = db.collection(collectionName)

        const images = await collection.find({}).toArray();
        console.log("Images fetched from database:", images);
        res.json(images);
    } catch (error) {
        console.error("Error fetching images:", error.message);
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
}

const getGroomImages = async (req, res) => {
    const collectionName = 'groomImg';
    try {
        const db = client.db("fusionFilm");
        const collection = db.collection(collectionName)

        const images = await collection.find({}).toArray();
        console.log("Images fetched from database:", images);
        res.json(images);
    } catch (error) {
        console.error("Error fetching images:", error.message);
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
}

const getPreWeddingImages = async (req, res) => {
    const collectionName = 'pre-weddingImg';
    try {
        const db = client.db("fusionFilm");
        const collection = db.collection(collectionName)

        const images = await collection.find({}).toArray();
        console.log("Images fetched from database:", images);
        res.json(images);
    } catch (error) {
        console.error("Error fetching images:", error.message);
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
}

const getHaldiImage = async (req, res) => {
    const collectionName = 'haldiImg';
    try {
        const db = client.db("fusionFilm");
        const collection = db.collection(collectionName)

        const images = await collection.find({}).toArray();
        console.log("Images Fetch from database", images);
        res.json(images)
    } catch (error) {
        console.error("Error fetching images", error.message);
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
}

const getEngagementImage = async (req, res) => {
    const collectionName = 'engagementImg'
    try {
        const db = client.db("fusionFilm");
        const collection = db.collection(collectionName);

        const images = await collection.find({}).toArray();
        console.log("Images fetch from database", images);
        res.json(images)
    } catch {
        console.error("Error fetching images", error.message);
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
}

const getMehndiImage = async (req, res) => {
    const collectionName = 'mehndiImage'
    try {
        const db = client.db("fusionFilm");
        const collection = db.collection(collectionName);   

        const images = await collection.find({}).toArray();
        console.log("Images fetch from database", images);
        res.json(images)
    } catch {
        console.error("Error fetching images", error.message);
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
}

const getMekeupImage = async (req, res) => {
    const collectionName = 'mekeupImg'
    try {
        const db = client.db("fusionFilm");
        const collection = db.collection(collectionName);

        const images = await collection.find({}).toArray();
        console.log("Images fetch from database", images);
        res.json(images);
    } catch {
        console.error("Error fetching images", error.message);
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
}

const getMaternity = async(req, res) =>{
    const collectionName='maternityImg';
    try {
        const db = client.db("fusionFilm");
        const collection = db.collection(collectionName);

        const images = await collection.find({}).toArray();
        console.log("Images fetch from database", images);
        res.json(images);
    } catch {
        console.error("Error fetching images", error.message);
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
}

// const getAllImages = async (req, res) => {
//     try {
//         const db = client.db("fusionFilm");
//         const frontImages = await db.collection('frontImg').find({}, { projection: { _id: 1, name: 1, src: 1 } }).toArray();
//         const weddingImages = await db.collection('weddingImg').find({}, { projection: { _id: 1, name: 1, src: 1 } }).toArray();
//         const brideImages = await db.collection('brideImg').find({}, { projection: { _id: 1, name: 1, src: 1 } }).toArray();
//         const groomImages = await db.collection('groomImg').find({}, { projection: { _id: 1, name: 1, src: 1 } }).toArray();
//         const preWeddingImages = await db.collection('pre-weddingImg').find({}, { projection: { _id: 1, name: 1, src: 1 } }).toArray();
//         const haldiImage = await db.collection('haldiImg').find({}, { projection: { _id: 1, name: 1, src: 1 } }).toArray();
//         const engagementImage = await db.collection('engagementImg').find({}, { projection: { _id: 1, name: 1, src: 1 } }).toArray();
//         const mehndiImage = await db.collection('mehndiImage').find({}, { projection: { _id: 1, name: 1, src: 1 } }).toArray();
//         const mekeupImage = await db.collection('mekeupImg').find({}, { projection: { _id: 1, name: 1, src: 1 } }).toArray();
//         const maternityImage = await db.collection('maternityImg').find({},  { projection: { _id: 1, name: 1, src: 1 } }).toArray();
//         // const 


//         const allImages = [
//             ...frontImages.map(img => ({ id: img._id.toString(), name: img.name, category: 'frontImg', imageLink: img.src })),
//             ...weddingImages.map(img => ({ id: img._id.toString(), name: img.name, category: 'weddingImg', imageLink: img.src })),
//             ...brideImages.map(img => ({ id: img._id.toString(), name: img.name, category: 'brideImg', imageLink: img.src })),
//             ...groomImages.map(img => ({ id: img._id.toString(), name: img.name, category: 'groomImg', imageLink: img.src })),
//             ...preWeddingImages.map(img => ({ id: img._id.toString(), name: img.name, category: 'pre-weddingImg', imageLink: img.src })),
//             ...haldiImage.map(img => ({ id: img._id.toString(), name: img.name, category: 'haldiImg', imageLink: img.src })),
//             ...engagementImage.map(img => ({ id: img._id.toString(), name: img.name, category: 'engagementImg', imageLink: img.src })),
//             ...mehndiImage.map(img => ({ id: img._id.toString(), name: img.name, category: 'mehndiImage', imageLink: img.src })),
//             ...mekeupImage.map(img => ({ id: img._id.toString(), name: img.name, category: 'mekeupImg', imageLink: img.src })),
//             ...maternityImage.map(img => ({ id: img._id.toString(), name: img.name, category: 'maternityImg', imageLink: img.src })),
//         ];

//         allImages.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

//         res.json(allImages);
//     } catch (error) {
//         console.error("Error fetching images:", error.message);
//         res.status(500).json({ message: "Error fetching images", error: error.message });
//     }
// };

// Add an API for deleting an image


const getAllImages = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const db = client.db("fusionFilm");

        if (!categoryId) {
            return res.status(400).json({ 
                message: "Category ID is required",
                images: [] 
            });
        }

       
       
        // Fetch images for the specified category
        const images = await db.collection(categoryId)
            .find({}, { projection: { _id: 1, name: 1, src: 1 } })
            .toArray();

        const formattedImages = images.map(img => ({
            id: img._id.toString(),
            name: img.name,
            category: categoryId,
            imageLink: img.src
        }));

        // Return empty array if no images found in category
        if (formattedImages.length === 0) {
            return res.json({
                message: `No images found in category: ${categoryId}`,
                images: []
            });
        }

        res.json({
            message: "Images retrieved successfully",
            images: formattedImages
        });

    } catch (error) {
        console.error("Error fetching images:", error.message);
        res.status(500).json({ 
            message: "Error fetching images", 
            error: error.message,
            images: []
        });
    }
};


const deleteImage = async (req, res) => {
    const { id, category } = req.body;

    if (!id || !category) {
        return res.status(400).json({ message: "ID and category are required" });
    }

    try {
        const db = client.db("fusionFilm");
        const collection = db.collection(category);

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ message: "Error deleting image", error: error.message });
    }
};


// Add an API for updating an image
const updateImage = async (req, res) => {
    console.log("Received update request:", req.body);
    console.log("Received file:", req.file);

    const { id, name, category } = req.body;
    const image = req.file;

    if (!id || !name || !category) {
        return res.status(400).json({ message: "ID, name, and category are required for updating" });
    }

    try {
        const db = client.db("fusionFilm");
        const collection = db.collection(category);

        const updateData = { name };

        if (image) {
            const base64Image = image.buffer.toString('base64');
            updateData.src = `data:${image.mimetype};base64,${base64Image}`;
            updateData.thumb = `data:${image.mimetype};base64,${base64Image}`;
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.status(200).json({ message: 'Image updated successfully' });
    } catch (error) {
        console.error("Error updating image:", error);
        if (error instanceof TypeError && error.message.includes('ObjectId')) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        res.status(500).json({ message: "Error updating image", error: error.message });
    }
};


const getGalleryImages = async (req, res) => {
    try {
        const db = client.db("fusionFilm");
        const collection = db.collection("galleryContent");

        const images = await collection.find({}).toArray();
        console.log("Images fetched from Gallery collection:", images);
        res.json(images);
    } catch (error) {
        console.error("Error fetching Gallery images:", error.message);
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
};

const getOtherImages = async (req, res) => {
    try {
        const db = client.db("fusionFilm");
        const collection = db.collection("otherImages");

        const images = await collection.find({}).toArray();
        console.log("Images fetched from Gallery collection:", images);
        res.json(images);
    } catch (error) {
        console.error("Error fetching Gallery images:", error.message);
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
};




module.exports = {
    getFrontImages,
    getWeddingImages,
    getBrideImages,
    getPreWeddingImages,
    getGroomImages,
    uploadImage,
    getMehndiImage,
    getMekeupImage,
    upload,
    getCategories,
    getAllImages,
    getMaternity,
    updateImage,
    deleteImage,
    getGalleryImages,
    getOtherImages,
    getHaldiImage,
    getEngagementImage,
};
