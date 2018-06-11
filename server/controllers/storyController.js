const mongoose = require("mongoose");
const Story = mongoose.model("Story");
// const User = mongoose.model('User');
// const multer = require('multer');
// const jimp = require('jimp');
// const uuid = require('uuid');

// const multerOptions = {
//   storage: multer.memoryStorage(),
//   fileFilter(req, file, next) {
//     const isPhoto = file.mimetype.startsWith('image/');
//     if (isPhoto) {
//       next(null, true);
//     } else {
//       next({ message: "That filetype isn't allowed!" }, false);
//     }
//   }
// };

exports.homePage = (req, res) => {
  res.render("index");
};

exports.addStory = (req, res) => {
  res.render("editStory", { title: "Add Story" });
};

// exports.upload = multer(multerOptions).single('photo');

// exports.resize = async (req, res, next) => {
//   // check if there is no new file to resize
//   if (!req.file) {
//     next(); // skip to the next middleware
//     return;
//   }
//   const extension = req.file.mimetype.split('/')[1];
//   req.body.photo = `${uuid.v4()}.${extension}`;
//   // now we resize
//   const photo = await jimp.read(req.file.buffer);
//   await photo.resize(800, jimp.AUTO);
//   await photo.write(`./public/uploads/${req.body.photo}`);
//   // once we have written photo to file system, keep going!
//   next();
// };

exports.createStory = async (req, res) => {
  const story = await new Story(req.body).save();
  req.flash("success", "Successfully Created Story.");
  res.redirect("/");
  // res.redirect(`/story/${story.storyId}`);
};

// exports.getStores = async (req, res) => {
//   const page = req.params.page || 1;
//   const limit = 4;
//   const skip = page * limit - limit;

//   // Query database for list of all stores
//   const storesPromise = Store.find()
//     .skip(skip)
//     .limit(limit)
//     .sort({ created: 'desc' });

//   const countPromise = Store.count();

//   const [stores, count] = await Promise.all([storesPromise, countPromise]);
//   const pages = Math.ceil(count / limit);
//   if (!stores.length && skip) {
//     req.flash(
//       'info',
//       `Hey you asked for page ${page}. But that doesn't exist so I put you on page ${pages}`
//     );
//     res.redirect(`/stores/page/${pages}`);
//     return;
//   }
//   res.render('stores', { title: 'Stores', stores, page, pages, count });
// };

// const confirmOwner = (store, user) => {
//   if (!store.author.equals(user._id)) {
//     throw Error('You must own a store in order to edit it!');
//   }
// };

// exports.editStore = async (req, res) => {
//   // find the store given the id
//   const store = await Store.findOne({ _id: req.params.id });

//   // confirm they are the owner of the store
//   confirmOwner(store, req.user);

//   // render out the edit form so the user can update their store
//   res.render('editStore', { title: 'Edit Store', store });
// };

// exports.updateStore = async (req, res) => {
//   // set the location data to be a Point
//   req.body.location.type = 'Point';
//   // find and update the store
//   const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
//     new: true, // return new store instead of old one
//     runValidators: true
//   }).exec();
//   req.flash(
//     'success',
//     `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store</a>`
//   );
//   // redirect them to the store and tell them it worked
//   res.redirect(`/stores/${store._id}/edit`);
// };

// exports.getStoreBySlug = async (req, res, next) => {
//   // query db for single store info
//   const store = await Store.findOne({ slug: req.params.slug }).populate(
//     'author reviews'
//   );
//   if (!store) {
//     return next();
//   }
//   // render this
//   res.render('store', { title: store.name, store });
// };

// exports.getStoresByTag = async (req, res) => {
//   const tag = req.params.tag;
//   const tagQuery = tag || { $exists: true };
//   const tagsPromise = Store.getTagsList();
//   const storesPromise = Store.find({ tags: tagQuery });
//   const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);

//   res.render('tags', { tags, title: 'Tags', tag, stores });
// };

// exports.searchStores = async (req, res) => {
//   const stores = await Store.find(
//     {
//       $text: {
//         $search: req.query.q
//       }
//     },
//     {
//       score: { $meta: 'textScore' }
//     }
//   ).sort({
//     score: { $meta: 'textScore' }
//   });
//   res.json(stores);
// };

// exports.mapStores = async (req, res) => {
//   const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
//   const q = {
//     location: {
//       $near: {
//         $geometry: {
//           type: 'Point',
//           coordinates
//         },
//         $maxDistance: 10000 // 10km
//       }
//     }
//   };

//   const stores = await Store.find(q)
//     .select('slug name description location photo')
//     .limit(10);
//   res.json(stores);
// };

// exports.mapPage = (req, res) => {
//   res.render('map', { title: 'Map' });
// };

// exports.heartStore = async (req, res) => {
//   const hearts = req.user.hearts.map(obj => obj.toString());
//   const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
//   const user = await User.findOneAndUpdate(
//     req.user._id,
//     { [operator]: { hearts: req.params.id } },
//     { new: true }
//   );
//   res.json(user);
// };

// exports.getStoresByHearts = async (req, res) => {
//   // query database for user's hearted stores
//   const stores = await Store.find({
//     _id: { $in: req.user.hearts }
//   });
//   res.render('hearts', { title: 'Hearted Stores', stores });
// };

// exports.getTopStores = async (req, res) => {
//   const stores = await Store.getTopStores();
//   res.render('topStores', { stores, title: 'Top Stores!' });
// };