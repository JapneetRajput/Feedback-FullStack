import auth from "../config/middleware.js";
import Product from "../models/products.js";

export const getProducts = async (req, res, next) => {
  Product.find()
    .sort({ createdAt: "descending" })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      next(err);
    });
};

export const getProductsSort = async (req, res, next) => {
  try {
    const category = req.query.category;
    if (category === "All" || category === "") {
      let products = await Product.find();
      // Sorting based on likes
      if (req.query.sortBy === "likes") {
        products = products.sort((a, b) => a.likes.length - b.likes.length);
      }

      // Sorting based on likes
      if (req.query.sortBy === "likesR") {
        products = products.sort((a, b) => b.likes.length - a.likes.length);
      }

      // Sorting based on comments
      if (req.query.sortBy === "comments") {
        products = products.sort(
          (a, b) => a.comments.length - b.comments.length
        );
      }

      // Sorting based on comments
      if (req.query.sortBy === "commentsR") {
        products = products.sort(
          (a, b) => b.comments.length - a.comments.length
        );
      }
      return res.json({ success: true, products });
    }
    let products = await Product.find({ category: category });

    // Sorting based on likes
    if (req.query.sortBy === "likes") {
      products = products.sort((a, b) => a.likes.length - b.likes.length);
    }

    // Sorting based on likes
    if (req.query.sortBy === "likesR") {
      products = products.sort((a, b) => b.likes.length - a.likes.length);
    }

    // Sorting based on comments
    if (req.query.sortBy === "comments") {
      products = products.sort((a, b) => a.comments.length - b.comments.length);
    }

    // Sorting based on comments
    if (req.query.sortBy === "commentsR") {
      products = products.sort((a, b) => b.comments.length - a.comments.length);
    }

    return res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const addComments = async (req, res, next) => {
  const productId = req.params.productId;
  const { comment } = req.body;
  console.log(comment);

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Create a new comment object
    const newComment = {
      user: req.user._id, // Assuming you have user authentication implemented
      content: comment,
    };

    // Add the new comment to the product's comments array
    product.comments.push(newComment);

    // Save the updated product with the new comment
    await product.save();

    // Return the saved comment
    return res.json({ success: true, comment: newComment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const updateLikes = async (req, res, next) => {
  try {
    console.log(req.params);
    const productId = req.params.id;
    // Find the Product by ID in the database
    const product = await Product.findById(productId);
    const user_id = req.userid;

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const userLikedIndex = product.likes.indexOf(user_id);

    if (userLikedIndex === -1) {
      product.likes.push(user_id);
    } else {
      product.likes.splice(userLikedIndex, 1);
    }

    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const editProduct = async (req, res, next) => {
  const user_id = req.user._id;
  const product_id = req.body.id;
  console.log(product_id);

  try {
    const updatedProduct = {
      name: req.body.name,
      category: req.body.category,
      logoUrl: req.body.logoUrl,
      productUrl: req.body.productUrl,
      description: req.body.description,
      owner_id: user_id,
    };

    Product.findOneAndUpdate(
      { _id: product_id, owner_id: user_id },
      updatedProduct,
      { new: true }
    )
      .then((data) => {
        console.log("Product Updated Successfully...");
        console.log(data);
        res.send(data);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export const saveProduct = async (req, res, next) => {
  const user_id = req.user._id;
  try {
    console.log(req.body);
    Product.create({
      name: req.body.name,
      category: req.body.category,
      logoUrl: req.body.logoUrl,
      productUrl: req.body.productUrl,
      description: req.body.description,
      owner_id: user_id,
    })
      .then((data) => {
        console.log("Uploaded Successfully...");
        console.log(data);
        res.send(data);
      })
      .catch((err) => console.log(err));
    // );
  } catch (err) {
    console.log(err);
  }
};

export const getProduct = (req, res, next) => {
  const product_id = req.params.id;
  //console.log(req.params);
  Product.findById({ _id: product_id })
    .then((product) => {
      //console.log(product);
      if (!product) {
        const error = new Error(
          "Product not found (Why tf is this error being thrown?)"
        );
        error.status = 404;
        throw error;
      }
      res.send(product);
    })
    .catch((err) => {
      next(err);
    });
};

export const deleteProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.findByIdAndDelete(productId)
    .then((product) => {
      if (!product) {
        const error = new Error("Product not found");
        error.status = 404;
        throw error;
      }
      res.json("Product deleted");
    })
    .catch((err) => {
      next(err);
    });
};

export const filterProductsByCategories = (req, res, next) => {
  const category = req.params.category;
  // console.log(category);
  Product.find({
    category: category,
  })
    .sort({ createdAt: "descending" })
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      next(err);
    });
};
export const updateProduct = (req, res, next) => {
  const Id = req.params.id;
  Product.findByIdAndUpdate(Id, req.body, { new: true })
    .then((product) => {
      if (!product) {
        const error = new Error("Product not found");
        error.status = 404;
        throw error;
      }
      res.json(product);
    })
    .catch((err) => {
      next(err);
    });
};
