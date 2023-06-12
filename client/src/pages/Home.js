import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import homeImage from "../assets/home-image.png";
import Modal from "../components/Modal";
import AddProduct from "../components/AddProduct";
import { getPostsByCategories, profileUser } from "../api/service";
import Login from "../components/Login";
import Axios from "axios";
import commentLogo from "../assets/comment.svg";
import upvote from "../assets/upvote.svg";
import commentIcon from "../assets/commentIcon.svg";
import commentSend from "../assets/commentSend.svg";
import EditProduct from "../components/EditProduct";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState();

  let token = localStorage.getItem("token");
  const pageInit = () => {
    profileUser(token).then((req, res) => {
      if (req.data.status !== "failed") {
        setIsUserLoggedIn(true);
        console.log(req.data);
        setLoggedInUserId(req.data.userValidation._id);
      } else {
      }
    });
  };

  useEffect(() => {
    pageInit();
  }, []);

  const [categories, setCategories] = useState();
  const [products, setProducts] = useState([]);
  const [fixedProducts, setFixedProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API_BASE_URL + "/api/products/").then(
      (res) => {
        // console.log(res.data);
        setFixedProducts(res.data);
        setProducts(res.data);
      }
    );
    // .catch((err) => console.log(err));
    pageInit();
  }, []);

  useEffect(() => {
    if (fixedProducts) {
      getByCategory();
      // console.log(categories);
    }
  }, [fixedProducts]);

  const getByCategory = () => {
    if (fixedProducts) {
      const categories = new Set();
      categories.add("All");
      fixedProducts.map(({ category }) => {
        categories.add(category);
      });
      setCategories(categories);
    }
  };

  const handleLike = async (productID) => {
    if (!isUserLoggedIn) {
      alert("Please login to like!");
    } else if (productID) {
      try {
        const response = await Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/products/${productID}/like`,
          null,
          {
            headers: {
              authorization: token,
            },
          }
        );

        const updatedPosts = products.map((post) => {
          if (post._id === productID) {
            return { ...post, likes: response.data.likes };
          }
          return post;
        });

        setProducts(updatedPosts);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();
  const handleCommentButtonClick = (product) => {
    setActiveProduct(product);
    setShowCommentBox(!showCommentBox);
  };

  const handleAddComment = async () => {
    // console.log(activeProduct._id);
    // const comment = event.target.comment.value;
    // setComments([...comments, comment]);
    if (!isUserLoggedIn) {
      alert("Please login to comment!");
    } else if (comment) {
      try {
        const response = await Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/products/${activeProduct._id}/comments`,
          { comment },
          {
            headers: {
              authorization: token,
            },
          }
        );
        setComment("");
        // console.log(response.data);

        // Update the comments state with the new comment
        setComments([...comments, response.data.comment.content]);
        window.location.reload();
      } catch (error) {
        console.error(error);
        setComment("");
      }
    } else {
      alert("All fields are mandatory!");
    }
  };
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    // if(currentCategory === ""){}
    Axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/sort`, {
      headers: {
        authorization: token,
      },
      params: {
        sortBy: sortBy,
        category: currentCategory, // Pass the sortBy value as a query parameter
      },
    })
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
    pageInit();
  }, [sortBy]); // Add sortBy as a dependency

  // Function to handle sorting change
  const handleSortingChange = (event) => {
    setSortBy(event.target.value);
  };
  const [currentCategory, setCurrentCategory] = useState("");

  // Function to handle category change
  const handleCategoryChange = (category) => {
    // console.log(category);
    setCurrentCategory(category);
  };

  useEffect(() => {
    if (currentCategory === "All") {
      Axios.get(process.env.REACT_APP_API_BASE_URL + "/api/products/")
        .then((res) => {
          // console.log(res.data);
          setProducts(res.data);
        })
        .catch((err) => console.log(err));
    } else if (currentCategory !== "") {
      getPostsByCategories(currentCategory)
        .then((res) => {
          // console.log(res.data);
          setProducts(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [currentCategory]);

  const [edit, setEdit] = useState(false);

  const handleEditProduct = (product) => {
    setActiveProduct(product);
    setEdit(true);
    toggleModal();
  };

  return (
    <>
      <Header />
      <div className="flex md:flex-row flex-col">
        <img
          src={homeImage}
          alt="Home"
          className="sm:ml-16 w-full lg:w-1/3 md:w-1/3"
        ></img>
        <div className="flex flex-col md:mx-32 mx-4 sm:2">
          <p className="md:text-4xl sm:text-3xl text-2xl font-bold lg:mt-48 md:mt-24 items-center">
            Add your products and give your valuable feedback
          </p>
          <p className="mt-2 px-2 sm:mt-4 lg:px-12 md:px-2">
            Easily give your feedback in a matter of minutes. Access your
            audience on all platforms. Observe result manually in real time
          </p>
        </div>
      </div>
      <div className="flex md:flex-row flex-col mb-12">
        <div className="flex flex-col sm:w-1/4">
          <div className="sm:ml-12 w-0 h-0 sm:w-4/5 sm:h-28 bg-bluePrimary sm:rounded-lg my-4">
            <p className="text-white text-3xl my-4">Feedback</p>
            <p className="text-white">Apply filter</p>
          </div>
          <div className="sm:invisible text-start text-xl text-greyPrimary sm:mb-0 sm:h-0 mb-4 ml-6">
            Filters:
          </div>
          <div className="mx-4 sm:mx-0 sm:ml-12 sm:w-4/5 sm:h-autosm:mb-0 mb-4 sm:pr-5 sm:pl-2 sm:p-2 bg-white sm:border sm:border-greyPrimary sm:grid sm:grid-cols-2 sm:gap-2 grid grid-cols-4 gap-2 sm:shadow-4xl sm:rounded-lg">
            {categories &&
              Array.from(categories).map((category) => (
                <p
                  className={`cursor-pointer text-bluePrimary my-1 w-min min-w-full bg-greyLight flex flex-col justify-center h-10 rounded-2xl ${
                    currentCategory === category
                      ? "bg-[#36416A] text-white"
                      : ""
                  }`}
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col sm:w-2/3 sm:h-1/2 sm:mt-4">
          <div className="flex flex-row justify-between mx-4 sm:mx-0 border border-[#36416A] rounded-lg">
            <div className="flex flex-row justify-center px-2 m-2">
              <div className="flex flex-row text-black font-bold mt-2">
                <span>{products && products.length}</span>&nbsp;
                <span> suggestions</span>
              </div>
              <div className="ml-2 text-greyPrimary mb-2">
                <div className="relative inline-block h-8 sm:w-5/6 w-3/4">
                  <select
                    value={sortBy}
                    onChange={handleSortingChange}
                    className="block appearance-none w-full bg-bluePrimary border-[#161b22] border-2 pl-2 text-white py-2 px-1 pr-8 rounded-md leading-tight focus:outline-none "
                  >
                    <option value="">Sort by</option>
                    <option value="likes">Upvotes (Asc)</option>
                    <option value="likesR">Upvotes (Desc)</option>
                    <option value="comments">Comments (Asc)</option>
                    <option value="commentsR">Comments (Desc)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 mt-2 flex items-center pr-2 text-white">
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex flex-row bg-bluePrimary text-white cursor-pointer px-4 sm:py-2 py-8 h-8 sm:h-10 pt-1.5 m-2 rounded-lg"
              onClick={() => {
                setEdit(false);
                toggleModal();
              }}
            >
              <span className="h-full">+</span>&nbsp;
              <span> Add</span>
              <span className="sm:inline hidden"> Product</span>
            </div>
          </div>
          {products &&
            products.map((product) => {
              const isOwner = product.owner_id === loggedInUserId;
              return (
                <div className="flex flex-col mt-4 bg-greyLighter sm:mx-0 mx-4 ">
                  <div className="flex flex-row justify-between rounded-md pb-4">
                    <div className="flex flex-row">
                      <img
                        src={product.logoUrl}
                        alt={"Logo"}
                        className="sm:ml-4 ml-2 mt-4 mb-10 sm:h-16 sm:w-16 w-12 h-12 inline rounded-full object-cover"
                      />
                      <div className="flex flex-col sm:ml-6 ml-2 items-start">
                        <p className="mt-3 text-xl font-semibold">
                          {product.name}
                        </p>
                        <p className="mt-1 text-sm ">{product.description}</p>
                        <div className="flex flex-row mt-3">
                          <span className="text-sm bg-[#C0CEFF] py-1 px-4 rounded-xl text-bluePrimary ">
                            {product.category}
                          </span>
                          <div
                            className={`flex flex-row cursor-pointer `}
                            onClick={() => handleCommentButtonClick(product)}
                          >
                            <img
                              src={commentLogo}
                              alt={"Comment"}
                              className="ml-6 w-5"
                            />
                            <span className="text-[#ABABAB] ml-2 sm:inline hidden">
                              Comment
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row">
                      {isOwner && (
                        <div className="flex flex-col justify-end sm:mb-3 mr-4">
                          <p
                            className="bg-bluePrimary text-white rounded-lg sm:px-2 px-4 py-1 cursor-pointer"
                            onClick={() => handleEditProduct(product)}
                          >
                            Edit
                            <span className="sm:inline hidden"> Product</span>
                          </p>
                        </div>
                      )}
                      <div className="flex flex-col mr-2">
                        <span
                          onClick={() => handleLike(product._id)}
                          className="flex flex-col cursor-pointer justify-center mr-4 mt-4 px-1 py-2 rounded-xl bg-[#C7CBD6]"
                        >
                          <img src={upvote} alt="upvote" className="w-4 mx-1" />
                          <span>{product.likes.length}</span>
                        </span>
                        <span
                          className="flex flex-row cursor-pointer justify-center mr-4 mt-3"
                          onClick={() => handleCommentButtonClick(product)}
                        >
                          <span>{product.comments.length}</span>
                          <img
                            src={commentIcon}
                            alt="upvote"
                            className="w-4 mx-1"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  {showCommentBox &&
                    activeProduct &&
                    activeProduct._id === product._id && (
                      <>
                        <div className="flex items-center">
                          <div className="relative flex items-center w-full sm:mx-12 mx-4">
                            <input
                              type="text"
                              name="comment"
                              className="w-full pl-4 pr-10 sm:h-12 h-10 rounded-3xl border-[#C7CBD6] border"
                              placeholder="Enter your comment"
                              onChange={(e) => setComment(e.target.value)}
                            />
                            <img
                              onClick={handleAddComment}
                              src={commentSend}
                              alt="Send"
                              className="absolute sm:w-7 w-5 right-2 cursor-pointer"
                            />
                          </div>
                        </div>
                        <div className="comments-section">
                          <ul className="list-disc pl-12 max-h-24 mr-8 my-4 overflow-y-auto">
                            {product.comments.map((comment, index) => (
                              <li
                                className="text-start text-bluePrimary"
                                key={index}
                              >
                                {comment.content}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                </div>
              );
            })}
        </div>
        {/* <Modal isOpen={isEditOpen} toggleModal={toggleEditModal}></Modal> */}
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          {isUserLoggedIn ? (
            edit ? (
              <EditProduct toggleModal={toggleModal} product={activeProduct} />
            ) : (
              <AddProduct toggleModal={toggleModal} />
            )
          ) : (
            <Login setIsUserLoggedIn={setIsUserLoggedIn} />
          )}
        </Modal>
      </div>
    </>
  );
};

export default Home;
